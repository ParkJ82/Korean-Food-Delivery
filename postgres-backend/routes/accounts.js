import express from "express";
import authorization from "../middleware/authorization.js";
import pool from "../foods.js";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middleware/validInfo.js";
import bcrypt from "bcrypt";

const accountRoutes = express.Router();


// Gets corresponding name from token input
// Parameters: req: {user: token retrieved from authorization}
// Return: corresponding name
accountRoutes.post("/getname", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT name FROM accounts WHERE account_id = $1",
            [req.user]
        )

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


// Gets corresponding login_id from account_id input
// Parameters: req: {user: account_id retrieved from authorization}
// Return: corresponding account_id
accountRoutes.post("/getid", authorization, async (req, res) => {
    try {
        const id = await pool.query(
            "SELECT login_id FROM accounts WHERE account_id = $1",
            [req.user]
        )
        res.json(id.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


// Gets token for corresponding new account made
// Parameters: req: {body: {name: input name, login_id: input login id,
// login_password: input login password, phone_number: input phone number,
// kakao_id: input kakao id}}
// Return: corresponding token
accountRoutes.post("/newaccount", async (req, res) => {
    try {
        const { name, login_id, login_password, phone_number, kakao_id } = req.body;
        const user = await pool.query("SELECT * FROM accounts WHERE name = $1",
        [name]);

        // prevent going to next code if user already exists
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        // Encrypt password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const bycrptPassword = await bcrypt.hash(login_password, salt);

        const newUser = await pool.query(
            "INSERT INTO accounts (name, login_id, login_password, phone_number, kakao_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, login_id, bycrptPassword, phone_number, kakao_id]
        )


        const token = jwtGenerator(newUser.rows[0].account_id);
        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Get token from corresponding login
// Parameters: req: {body: {login_id, login_password}}
// Return: corresponding token
accountRoutes.post("/login", async (req, res) => {
    try {
        const { id, password } = req.body;
        const user = await pool.query("SELECT * FROM accounts WHERE login_id = $1", 
        [id]);

        if (user.rows.length === 0) {
            return res.status(401).json("Incorrect credentials");
        }

        const validPassword = await bcrypt.compare(
            password, user.rows[0].login_password
        );

        if (!validPassword) {
            return res.status(401).json("Incorrect credentials")
        }

        const token = jwtGenerator(user.rows[0].account_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");  
    }
});

export default accountRoutes;