import express from "express";
import pool from "../foods.js";

const ratingsRoutes = express.Router();

// NEEDS MODIFICATION
// Update Rating of delivery service
// Parameters: req: {body: {user: input account_id, delivery_service: 
// input delivery service, rating: input rating}}
// Return: None
ratingsRoutes.post("/updaterating", async (req, res) => {
    try {
        const { user, delivery_service, rating } = req.body;

        const findLoginId = await pool.query(
            "SELECT login_id FROM accounts WHERE account_id=$1",
            [user]
        )

        const login_id = findLoginId.rows[0]

        const newRating = await pool.query(
            `
            BEGIN
                IF EXISTS (SELECT FROM ratings WHERE login_id = $1, service_id = $2) THEN
                    UPDATE ratings SET ratings = $3 WHERE login_id = $1, service_id = $2;
                ELSE
                    INSERT INTO ratings (login_id, service_id, rating) VALUES ($1, $2, $3);
                END IF;
            END
            `,
            [login_id, delivery_service, rating]
        )


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
})

// Get All Ratings of all delivery_services
// Parameters: None
// Return: all ratings with corresponding service name
ratingsRoutes.get("/getratings", async (req, res) => {
    try {
        const ratings = await pool.query(
            `
            SELECT delivery_services.service_name AS service_name,
                SUM(ratings.rating) / COUNT(*) as rating
                    FROM rating
                        JOIN delivery_services
                            ON delivery_services.service_id = ratings.service_id
                                GROUP BY delivery_services.service_name
            `
        )
        res.json(ratings.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
})


export default ratingsRoutes;