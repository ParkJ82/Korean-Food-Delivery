import express from "express";
import pool from "../foods.js";

const ratingsRoutes = express.Router();

function handleServerError(error, serverResponse) {
    console.error(error.message);
    serverResponse.status(500).send("Server error");
}

async function getLoginIdFromAccountId(accountId) {
    const findLoginId = await pool.query(
        "SELECT login_id FROM accounts WHERE account_id=$1",
        [accountId]
    )
    return findLoginId.rows[0]
}

async function modifyRatingInDatabase(ratingRow, loginId) {
    await pool.query(
        `
        BEGIN
            IF EXISTS (SELECT FROM ratings WHERE login_id = $1, service_id = $2) THEN
                UPDATE ratings SET ratings = $3 WHERE login_id = $1, service_id = $2;
            ELSE
                INSERT INTO ratings (login_id, service_id, rating) VALUES ($1, $2, $3);
            END IF;
        END
        `,
        [loginId, ratingRow.delivery_service, ratingRow.rating]
    )
}


function updateRating(serverRequest) {
    const ratingRow = serverRequest.body;
            
    const loginId = getLoginIdFromAccountId(ratingRow.user)

    modifyRatingInDatabase(ratingRow, loginId)
}

async function getDeliveryServiceWithRatings(serverResponse) {
    const ratings = await pool.query(
        `
        SELECT delivery_services.service_name AS service_name,
                ROUND(AVG(ratings.rating)::numeric, 1) as rating, COUNT(*) AS rated_users,
                    delivery_services.delivery_minimum as delivery_minimum
                        FROM ratings
                            JOIN delivery_services
                                ON delivery_services.service_id = ratings.service_id
                                    GROUP BY delivery_services.service_name, delivery_services.delivery_minimum
        `
    )
    serverResponse.json(ratings.rows)
}


// NEEDS MODIFICATION
// Update Rating of delivery service
// Parameters: req: {body: {user: input account_id, delivery_service: 
// input delivery service, rating: input rating}}
// Return: None


function setRatingRoutesAPI() {
    ratingsRoutes.post("/updaterating", async (req, res) => {
        try {
            updateRating(req)
        } catch (err) {
            handleServerError(err, res)
        }
    })
    
    // Get All Ratings of all delivery_services
    // Parameters: None
    // Return: all ratings with corresponding service name
    ratingsRoutes.get("/getratings", async (req, res) => {
        try {
            getDeliveryServiceWithRatings(res)
        } catch (err) {
            handleServerError(err, res)
        }
    })
}

setRatingRoutesAPI()

export default ratingsRoutes;