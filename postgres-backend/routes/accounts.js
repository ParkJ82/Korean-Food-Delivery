import express from "express";
import authorization from "../middleware/authorization.js";
import pool from "../foods.js";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middleware/validInfo.js";
import bcrypt from "bcrypt";

const accountRoutes = express.Router();

function setAccountRoutesAPI() {
    accountRoutes.post("/getname", authorization, async (req, res) => {
        try {
            returnNameFromAccountId(req, res);
        } catch (err) {
            handleServerError(err, res);
        }
    })

    accountRoutes.post("/getid", authorization, async (req, res) => {
        try {
            returnLoginIdFromAccountId(req, res);
        } catch (err) {
            handleServerError(err, res);
        }
    })

    accountRoutes.post("/newaccount", async (req, res) => {
        try {
            processNewAccount(req, res);
        } catch (err) {
            handleServerError(err, res);
        }
    });

    accountRoutes.post("/login", async (req, res) => {
        try {
            processLogin(req, res);
        } catch (err) {
            handleServerError(err, res);  
        }
    });
}

function handleServerError(error, serverResponse) {
    console.error(error.message);
    serverResponse.status(500).send("Server error");
}

async function returnLoginIdFromAccountId(serverRequest, serverResponse) {
    const loginId = await pool.query(
        "SELECT login_id FROM accounts WHERE account_id = $1",
        [serverRequest.user]
    )    
    serverResponse.json(loginId.rows[0]);
}

function processNewAccount(serverRequest, serverResponse) {
    const accountInfo = serverRequest.body;
    createNewAccount(accountInfo, serverResponse);

    const token = jwtGenerator(newUser.rows[0].account_id);
    res.json({ token })
}

async function createNewAccount(accountInfo, res) {
    const {login_id, login_password} = accountInfo;

    if (checkIfLoginIdExists(login_id)) {
        return res.status(401).send("User already exist");
    }

    const encryptedPassword = returnEncryptedPassword(login_password)
    InsertNewUserInDatabase(accountInfo, encryptedPassword)

}

async function returnEncryptedPassword(password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound)
    const bycrptPassword = await bcrypt.hash(password, salt);
    
    return bycrptPassword;

}

async function InsertNewUserInDatabase(accountInfo, encryptedPassword) {
    await pool.query(
        `INSERT INTO accounts (name, login_id, login_password, phone_number, kakao_id) VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
        [accountInfo.name, accountInfo.login_id, encryptedPassword, accountInfo.phone_number, accountInfo.kakao_id]
    )
}


async function returnNameFromAccountId(serverRequest, serverResponse) {
    const user = await pool.query(
        "SELECT name FROM accounts WHERE account_id = $1",
        [serverRequest.user]
    )
    serverResponse.json(user.rows[0]);
}


function processLogin(serverRequest, serverResponse) {
    const loginInformation = serverRequest.body;

    if (!checkIfLoginIdExists(loginInformation.id)) {
        return serverResponse.status(401).json("Incorrect credentials");
    }

    if (checkIfPasswordIsCorrect(loginInformation)) {
        return serverResponse.status(401).json("Incorrect credentials")
    }

    returnToken(loginInformation.id, serverResponse)
}

async function checkIfLoginIdExists(loginId) {
    const user = await pool.query("SELECT * FROM accounts WHERE login_id = $1",
    [loginId]);
    if (user.rows.length !== 0) {
        return true
    } else {
        return false
    }
}

function returnToken(loginId, res) {
    const user = pool.query("SELECT account_id FROM accounts WHERE login_id = $1", 
        [loginId]);
    const token = jwtGenerator(user.rows[0].account_id);
    res.json({token: token});
}

async function checkIfPasswordIsCorrect(loginInformation) {
    const { id, password } = loginInformation;
    const user = pool.query("SELECT login_password FROM accounts WHERE login_id = $1", 
        [id])
    const validPassword = await bcrypt.compare(
        password, user.rows[0].login_password
    );
    if (validPassword) {
        return true
    } else {
        return false
    }
}

setAccountRoutesAPI()
export default accountRoutes;