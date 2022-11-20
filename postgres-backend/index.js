import express from "express";
import cors from "cors";
import pool from "./foods.js";
import accountRoutes from "./routes/accounts.js";
import ratingsRoutes from "./routes/ratings.js";
import shoppingCartRoutes from "./routes/shoppingCart.js";
import deliveryServiceRoutes from "./routes/deliveryServices.js";
import foodsRoutes from "./routes/foods.js";

// Set app and required librares for the apps
const app = express()
app.use(cors())
app.use(express.json())
const port = 3001

// Set up required routes
app.use(accountRoutes);
app.use(ratingsRoutes);
app.use(shoppingCartRoutes);
app.use(deliveryServiceRoutes);
app.use(foodsRoutes);

// Run app
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})