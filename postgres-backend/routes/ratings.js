import express from "express";
import pool from "../foods.js";

const ratingsRoutes = express.Router();

// NEEDS MODIFICATION
// Update Rating of delivery service
// Parameters: req: {body: {user: input user, delivery_service: 
// input delivery service, rating: input rating}}
// Return: 
ratingsRoutes.post("/updaterating", async (req, res) => {
    try {
        const { user, delivery_service, rating } = req.body;
        await pool.query(
            `
            BEGIN
                IF EXISTS (SELECT FROM ratings WHERE login_id = $1, service_id = $2) THEN
                    UPDATE ratings SET ratings = $3 WHERE login_id = $1, service_id = $2;
                ELSE
                    INSERT INTO ratings (login_id, service_id) VALUES ($1, $2);
                END IF;
            END
            `,
            [user, delivery_service, rating]
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
})

export default ratingsRoutes;