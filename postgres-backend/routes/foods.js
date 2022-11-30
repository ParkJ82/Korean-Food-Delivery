import express from "express";
import pool from "../foods.js";

const foodsRoutes = express.Router();

async function filterByNoFilter() {
    const filteredFood = await pool.query("SELECT * FROM foods");
    return filteredFood
}

async function filterByCategory(category) {
    const filteredFood = await pool.query(
        "SELECT * FROM foods WHERE category = $1",
        [category]
    )
    return filteredFood
}

async function filterByDeliveryService(deliveryService) {
    const filteredFood = await pool.query(
        "SELECT * FROM foods WHERE delivered_by = $1",
        [deliveryService]
    )
    return filteredFood
}

function handleServerError(error, serverResponse) {
    console.error(error.message);
    serverResponse.status(500).send("Server error");
}

async function handleFoodFilters(serverRequest, serverResponse) {
    const { deliveryservice, category} = serverRequest.params;
    var filteredFood;
    if (deliveryservice == "전체 업체" && category == "전체 음식") {
        filteredFood = await filterByNoFilter()
    } 
    else if (deliveryservice == "전체 업체") {
        filteredFood = await filterByCategory(category)
    
    }
    else if (category == "전체 음식") {
        filteredFood = await filterByDeliveryService(deliveryservice)
    
    } 
    else {
        filteredFood = await pool.query(
            "SELECT * FROM foods WHERE delivered_by = $1 AND category = $2",
            [deliveryservice, category]
        )
    
    }

    console.log(filteredFood.rows)
    serverResponse.json(filteredFood.rows);
}

async function returnAllCategories(serverResponse) {
    const categories = await pool.query("SELECT category FROM foods GROUP BY category");
    serverResponse.json(categories.rows);
}

async function returnAllFoods(serverResponse) {
    const allFoods = await pool.query("SELECT * FROM foods");
    serverResponse.json(allFoods.rows);
}


function setFoodRouteAPI() {
    // Get all the categories for all the foods
    // Parameters: none
    // Return: all categories in foods
    foodsRoutes.get("/foods/categories", async (req, res) => {
        try {
            returnAllCategories(res)
        } catch (err) {
            handleServerError(err, res)
        }
    }
    )

    // POTENTIALLY UNUSED/MOVED TO PYTHON
    //
    //
    foodsRoutes.post("/foods", async (req, res) => {
        try {
            const { food_name, category, price, delivered_by, is_set_menu }
            = req.body;
            const newFood = await pool.query(
                "INSERT INTO foods (food_name, category, price, delivered_by, is_set_menu) VALUES($1, $2, $3, $4, $5) RETURNING *",
                [food_name, category, price, delivered_by, is_set_menu]
            );

            res.json(newFood.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });

    
    // Get all foods as awhole
    // Parameters: none
    // Return: all foods
    foodsRoutes.get("/foods", async (req, res) => {
        try {
            returnAllFoods(res)
        } catch (err) {
            handleServerError(err, res)
        }
    });



    // POTENTIALLY UNUSED/MOVED TO PYTHON
    //
    //
    foodsRoutes.delete("/foods/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const deleteFood = await pool.query("DELETE FROM foods WHERE food_id = $1", 
            [id]);
            res.json("Sucessfully deleted food");
        } catch (err) {
            console.log(err.message);
        }
    });

    // POTENTIALLY UNUSED/MOVED TO PYTHON
    //
    //
    foodsRoutes.put("/foods/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { food_name, category, price, delivered_by, is_set_menu }
            = req.body;
            const updateFood = await pool.query(
                "UPDATE foods SET food_name = $1, category = $2, price = $3, delivered_by = $4, is_set_menu = $5 WHERE food_id = $6",
                [food_name, category, price, delivered_by, is_set_menu, id]
            );

            res.json("Food was updated!");
        } catch (err) {
            console.error(err.message);
        }
    })

    foodsRoutes.post("/updateimage", async (req, res) => {
        try {
            const { food_name, picture_url } = req.body;
            const foodWithImage = await pool.query(
              `
              UPDATE foods 
                SET picture_url = $1
                    WHERE food_name = $2
                        RETURNING *;
              `,
              [picture_url, food_name]
            )
            res.json(foodWithImage.rows[0])
        } catch (err) {
            console.error(err.message)
        }
    })


    // POTENTIALLY UNUSED
    //
    //
    foodsRoutes.get("/foods/searchbyid/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const food = await pool.query("SELECT * FROM foods WHERE food_id = $1",
            [id]);

            res.json(food.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });


    // Gets foods from given delivery service and category
    // Parameters: req: {params: {deliveryservice: filtered delivery service, category: filtered category, page: current page}}
    // Return: List of filtered foods
    foodsRoutes.get("/foods/:deliveryservice/:category", async (req, res) => {
            try {
                handleFoodFilters(req, res)
        } catch (err) {
                handleServerError(err, res)
            }
        })
}

setFoodRouteAPI();

export default foodsRoutes;