import express from "express";
import pool from "../foods.js";

const deliveryServiceRoutes = express.Router();

function handleServerError(error, serverResponse) {
    console.error(error.message);
    serverResponse.status(500).send("Server error");
}

async function returnAllDeliveryServices(serverResponse) {
    const allDeliveryServices = await pool.query(
        "SELECT * FROM delivery_services");
    serverResponse.json(allDeliveryServices.rows);
}

function setDeliveryServicesAPI() {
    // POTENTIALLY UNUSED/MOVED TO PYTHON
    deliveryServiceRoutes.post("/delivery_services", async (req, res) => {
        try {
            const { service_name, service_email, service_phonenumber, 
                delivery_minimum, order_by, set_menu_minimum } = req.data;
            const newDeliveryService = await pool.query(
                `INSERT INTO delivery_services 
                    (service_name, service_email, service_phonenumber, delivery_minimum, order_by, set_menu_minimum) 
                        VALUES($1, $2, $3, $4, $5, $6) 
                            RETURNING *`,
                [service_name, service_email, service_phonenumber, delivery_minimum, order_by, set_menu_minimum]
            );

            res.json(newDeliveryService.rows[0]);
        } catch(err) {
            console.error(err.message);
        }
    });

    deliveryServiceRoutes.get("/delivery_services", async (req, res) => {
        try {
            returnAllDeliveryServices(res);
        } catch (err) {
            handleServerError(err, res);
        }
    });


    // POTENTIALLY UNUSED/MOVED TO PYTHON
    deliveryServiceRoutes.delete("/delivery_services/:id", async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM delivery_services WHERE service_id = $1", 
            [id]);
            res.json("Sucessfully deleted service");
        } catch (err) {
            console.error(err.message);
        }
    });


    // POTENTIALLY UNUSED/MOVED TO PYTHON
    deliveryServiceRoutes.put("/delivery_services/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { service_name, service_email, service_phonenumber, 
                delivery_minimum, order_by, set_menu_minimum }
            = req.body;
            await pool.query(
                `UPDATE delivery_services 
                    SET service_name = $1, service_email = $2, service_phonenumber = $3, 
                        delivery_minimum = $4, order_by = $5, set_menu_minimum = $6 
                            WHERE service_id = $7`,
                [service_name, service_email, service_phonenumber, 
                    delivery_minimum, order_by, set_menu_minimum, id]
            );

            res.json("Service was updated!");
        } catch (err) {
            console.error(err.message);
        }
    })
}

setDeliveryServicesAPI()
export default deliveryServiceRoutes;