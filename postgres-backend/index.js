import express from "express";
import cors from "cors";
import pool from "./foods.js";
import bcrypt from "bcrypt";
import jwtGenerator from "./utils/jwtGenerator.js";
import validInfo from "./middleware/validInfo.js";
import authorization from "./middleware/authorization.js";

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001

app.post("/getName", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT name FROM accounts WHERE account_id = $1",
            [req.user]
        )

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

app.post("/newaccount", async (req, res) => {
    try {
        const { name, login_id, login_password, phone_number, kakao_id } = req.body;
        const user = await pool.query("SELECT * FROM accounts WHERE name = $1",
        [name]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const bycrptPassword = await bcrypt.hash(login_password, salt);

        const newUser = await pool.query(
            "INSERT INTO accounts (name, login_id, login_password, phone_number, kakao_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, login_id, bycrptPassword, phone_number, kakao_id]
        )


        const token = jwtGenerator(newUser.rows[0].account_id);
        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { login_id, login_password } = req.body;
        const user = await pool.query("SELECT * FROM accounts WHERE login_id = $1", 
        [login_id]);

        if (user.rows.length === 0) {
            return res.status(401).json("Incorrect credentials");
        }

        const validPassword = await bcrypt.compare(
            login_password, user.rows[0].login_password
        );

        if (!validPassword) {
            return res.status(401).json("Incorrect credentials")
        }

        const token = jwtGenerator(user.rows[0].account_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");  
    }
});


app.get("/foods/categories", async (req, res) => {
    try {
        const categories = await pool.query("SELECT category FROM foods GROUP BY category");
        res.json(categories.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/delivery_services", async (req, res) => {
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

// app.post("/newaccount", async (req, res) => {
//     try {

//         console.log(req.body);
//         const { name, id, password, phonenumber, kakaoid } = req.body;
//         const newAccount = await pool.query(
//             "INSERT INTO accounts (login_id, login_password, phone_number, kakao_id, name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//             [id, password, phonenumber, kakaoid, name]
//         )

//         res.json(newAccount.rows[0])
//     } catch (err) {
//         console.error(err.message);
//     }
// })

app.get("/delivery_services", async (req, res) => {
    try {
        const allDeliveryServices = await pool.query(
            "SELECT service_id, service_name, service_email, service_phonenumber, delivery_minimum, order_by, set_menu_minimum, rated_users, ROUND((total_rating / rated_users)::numeric, 1) AS ratings FROM delivery_services");
        res.json(allDeliveryServices.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/delivery_services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDeliveryService = await pool.query("DELETE FROM delivery_services WHERE service_id = $1", 
        [id]);
        res.json("Sucessfully deleted service");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/delivery_services/:id", async (req, res) => {
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

// UPDATE delivery_services SET total_rating = $1, rated_users = $2 WHERE service_id = $3


app.post("/foods", async (req, res) => {
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

app.get("/foods", async (req, res) => {
    try {
        const allFoods = await pool.query("SELECT * FROM foods");
        res.json(allFoods.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// app.get("/foods/searchbycategory/:id/:page", async (req, res) => {
//     try {
//         const { id, page } = req.params;
//         const food = await pool.query("SELECT SKIP $1 FIRST 15 * FROM foods WHERE category = $2",
//         [page, id]);

//         res.json(food.rows[0])
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.get("/foods?page=:page/?searchbydeliveryservice=:id", async (req, res) => {
//     try {
//         const { page, id } = req.params;
//         const food = await pool.query("SELECT SKIP $1 FIRST 15 * FROM foods WHERE delivered_by = $2", 
//         [page, id]);
//         res.json(food.rows)
//     } catch (err) {
//         console.error(err.message);
//     }
    
// })


app.delete("/foods/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteFood = await pool.query("DELETE FROM foods WHERE food_id = $1", 
        [id]);
        res.json("Sucessfully deleted food");
    } catch (err) {
        console.log(err.message);
    }
});

app.put("/foods/:id", async (req, res) => {
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

app.get("/foods/searchbyid/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const food = await pool.query("SELECT * FROM foods WHERE food_id = $1",
        [id]);

        res.json(food.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
    

// app.get("accounts/:id/:password", async (req, res) => {
//     try {
//         const { id, password } = req.params;
//         const account = await pool.query("SELECT * FROM accounts WHERE login_id = $1 AND account_password = $2",
//         [id, password]);

//         res.json(account.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// }) 

app.put("/delivery_services/:name/rating/:rating", async (req, res) => {
    const { name, rating } = req.params;
    const updateRating = await pool.query("UPDATE delivery_services SET rated_users = rated_users + 1, total_rating = total_rating + $1 WHERE service_name = $2",
    [rating, name])
})


app.get("/foods/:deliveryservice/:category", async (req, res) => {
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



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})