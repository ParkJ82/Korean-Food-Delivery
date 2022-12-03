import express from "express";
import pool from "../foods.js";
import authorization from "../middleware/authorization.js";

const shoppingCartRoutes = express.Router();

async function getLoginIdFromAccountId(accountId) {
    const findLoginId = await pool.query(
        "SELECT login_id FROM accounts WHERE account_id=$1",
        [accountId]
    )

   return findLoginId.rows[0].login_id
}

function handleServerError(error, serverResponse) {
    console.error(error.message);
    serverResponse.status(500).send("Server error");
}

async function getShoppingCart(loginId, serverResponse) {
    console.log(loginId)
    const shoppingCart = await pool.query(
        `
        SELECT foods.*, shopping_cart.login_id AS login_id, shopping_cart.amount AS amount FROM foods
                JOIN shopping_cart ON shopping_cart.food_id = foods.food_id 
                    WHERE login_id = $1;
        `,
        [loginId]
    )
    serverResponse.json(shoppingCart.rows)
}

async function returnShoppingCart(serverRequest, serverResponse) {
    const { user } = serverRequest;
    const loginId = await getLoginIdFromAccountId(user)
    getShoppingCart(loginId, serverResponse)
}

async function updateShoppingCart(serverRequest, serverResponse) {
    const { login_id, food_id, amount } = serverRequest.body;
    const insertCart = await pool.query(
        `INSERT INTO shopping_cart (login_id, food_id, amount) VALUES ($1, $2, $3) 
            ON CONFLICT (login_id, food_id) DO UPDATE 
                SET amount = shopping_cart.amount + $3 RETURNING *;`,
        [login_id, food_id, amount]
    )
    serverResponse.json(insertCart.rows[0])
}

function setShoppingCartRoutesAPI() {
    shoppingCartRoutes.post("/getshoppingcart", authorization, async (req, res) => {
        try {
            console.log("hi")
            returnShoppingCart(req, res)       
        } catch (err) {
            handleServerError(err, res)
        }
    })

    shoppingCartRoutes.post("/updateshoppingcart", async (req, res) => {
        try {
            updateShoppingCart(req, res)
        } catch (err) {
            handleServerError(err, res) 
        }
    })
}

setShoppingCartRoutesAPI()
export default shoppingCartRoutes;