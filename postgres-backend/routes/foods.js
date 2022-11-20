import express from "express";
import pool from "../foods.js";

const foodsRoutes = express.Router();

// Get all the categories for all the foods
// Parameters: none
// Return: all categories in foods
foodsRoutes.get("/foods/categories", async (req, res) => {
    try {
        const categories = await pool.query("SELECT category FROM foods GROUP BY category");
        res.json(categories.rows);
    } catch (err) {
        console.error(err.message);
    }
})

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
        const allFoods = await pool.query("SELECT * FROM foods");
        res.json(allFoods.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// NEEDS MODIFICATION
// Skips foods and gets first 15 foods after that
// Parameters: req: {params: {id, page}}
// Return: 15 foods after filter
foodsRoutes.get("/foods/searchbycategory/:id/:page", async (req, res) => {
    try {
        const { id, page } = req.params;
        const food = await pool.query("SELECT SKIP $1 FIRST 15 * FROM foods WHERE category = $2",
        [page, id]);

        res.json(food.rows[0])
    } catch (err) {
        console.error(err.message);
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
// Parameters: req: {params: {deliveryservice: filtered delivery service, category: filtered category}}
// Return: List of filtered foods
foodsRoutes.get("/foods/:deliveryservice/:category", async (req, res) => {
    const { deliveryservice, category } = req.params;
    if (deliveryservice == "전체 업체" && category == "전체 음식") {
        try {
            const filteredFood = await pool.query("SELECT * FROM foods");
            res.json(filteredFood.rows);
        } catch (err) {
            console.error(err.message);
        }
    } else if (deliveryservice == "전체 업체") {
        try {
            const filteredFood = await pool.query(
                "SELECT * FROM foods WHERE category = $1",
                [category]
            )
        
            res.json(filteredFood.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
    else if (category == "전체 음식") {
        try {
            const filteredFood = await pool.query(
                "SELECT * FROM foods WHERE delivered_by = $1",
                [deliveryservice]
            )
        
            res.json(filteredFood.rows);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        try {
            const filteredFood = await pool.query(
                "SELECT * FROM foods WHERE delivered_by = $1 AND category = $2",
                [deliveryservice, category]
            )
        
            res.json(filteredFood.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
})

export default foodsRoutes;