import express from "express";
import pool from "../foods.js";

const deliveryServiceRoutes = express.Router();

// Inserts the new delivery service and returns the new row
// Parameters: (req: {data: {service_name: name of service, 
// service_email: email of service, service_phonenumber: phone number of service,
// order_by: the date limit of the current food listing, set_menu_minimum: 
// mimimum purchase needed in order to get set discount }})
// Return: everything of the new row
deliveryServiceRoutes.post("/delivery_services", async (req, res) => {
    try {
        const { service_name, service_email, service_phonenumber, 
            delivery_minimum, order_by, set_menu_minimum } = req.data;
        const newDeliveryService = await pool.query(
            "INSERT INTO delivery_services (service_name, service_email, service_phonenumber, delivery_minimum, order_by, set_menu_minimum) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [service_name, service_email, service_phonenumber, delivery_minimum, order_by, set_menu_minimum]
        );

        res.json(newDeliveryService.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});


// NEEDS MODIFICATION
// Gets all the delivery services along with the ratings
// Parameters: none
// Return: everything of rows, ratings
deliveryServiceRoutes.get("/delivery_services", async (req, res) => {
    try {
        const allDeliveryServices = await pool.query(
            "SELECT service_id, service_name, service_email, service_phonenumber, delivery_minimum, order_by, set_menu_minimum, rated_users, ROUND((total_rating / rated_users)::numeric, 1) AS ratings FROM delivery_services");
        res.json(allDeliveryServices.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// POTENTIALLY UNUSED/MOVED TO PYTHON
//
//
deliveryServiceRoutes.delete("/delivery_services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDeliveryService = await pool.query("DELETE FROM delivery_services WHERE service_id = $1", 
        [id]);
        res.json("Sucessfully deleted service");
    } catch (err) {
        console.error(err.message);
    }
});


// POTENTIALLY UNUSED/MOVED TO PYTHON
//
//
deliveryServiceRoutes.put("/delivery_services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { service_name, service_email, service_phonenumber, 
            delivery_minimum, order_by, set_menu_minimum }
        = req.body;
        const updateFood = await pool.query(
            "UPDATE delivery_services SET service_name = $1, service_email = $2, service_phonenumber = $3, delivery_minimum = $4, order_by = $5, set_menu_minimum = $6 WHERE service_id = $7",
            [service_name, service_email, service_phonenumber, 
                delivery_minimum, order_by, set_menu_minimum, id]
        );

        res.json("Service was updated!");
    } catch (err) {
        console.error(err.message);
    }
})


// POTENTIALLY UNUSED/MOVED TO PYTHON
//
//
deliveryServiceRoutes.put("/delivery_services/:name/rating/:rating", async (req, res) => {
    const { name, rating } = req.params;
    const updateRating = await pool.query("UPDATE delivery_services SET rated_users = rated_users + 1, total_rating = total_rating + $1 WHERE service_name = $2",
    [rating, name])
})




export default deliveryServiceRoutes;