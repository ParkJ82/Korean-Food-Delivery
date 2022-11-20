import express from "express";
import pool from "../foods.js";
import authorization from "../middleware/authorization.js";

const shoppingCartRoutes = express.Router();

// Gets shopping cart of the appropriate user
// Parameters: req: {token: token}
// Return: shopping cart food list
shoppingCartRoutes.post("/getshoppingcart", authorization, async (req, res) => {
    try {
        const { user } = req.body;

        const findLoginId = await pool.query(
            "SELECT login_id FROM accounts WHERE account_id=$1",
            [user]
        )

        const login_id = findLoginId.rows[0]

        const shoppingCart = await pool.query(
            `
            SELECT foods.foods_id as foods_id, foods.food_name AS food_name, shopping_cart.amount AS amount, 
                foods.delivered_by AS delivered_by, foods.price as price FROM shopping_cart 
                    JOIN foods ON shopping_cart.food_id = foods.food_id 
                        WHERE shopping_cart.login_id = $1
            `,
            [login_id]
        )
        res.json(shoppingCart.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

// NEEDS MODIFICATION
// Updates and gets shopping cart of the appropriate user
// Parameters: req: {user: login_id, food_id: food_id, amount: added amount}
// Return: shopping cart food list
shoppingCartRoutes.post("/updateshoppingcart", async (req, res) => {
    try {
        const { user, food_id, amount } = req.body;
        console.log([user, food_id, amount])
        const insertCart = await pool.query(
            `
            DO
            $$
            BEGIN
            IF EXISTS (SELECT FROM shopping_cart WHERE login_id = $1 AND food_id = $2) THEN
                UPDATE shopping_cart SET amount = amount + $3 WHERE login_id = $1 AND food_id = $2;
            ELSE
                INSERT INTO shopping_cart (login_id, food_id, amount) VALUES (hi, 2, 3);
            END IF;
            END;
            $$;
            `
            [user, food_id, amount]
        )

        const shoppingCart = await pool.query(
            `
            SELECT foods.food_name AS food_name, shopping_cart.amount AS amount,
                foods.delivered_by AS delivered_by FROM shopping_cart 
                        JOIN foods 
                            ON shopping_cart.food_id = foods.food_id 
                                WHERE shopping_cart.login_id = $1
            `,
            [user]
        )

        res.json(shoppingCart.rows)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");   
    }
})



export default shoppingCartRoutes;