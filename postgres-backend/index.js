import express from "express";
import cors from "cors";
import accountRoutes from "./routes/accounts.js";
import ratingsRoutes from "./routes/ratings.js";
import shoppingCartRoutes from "./routes/shoppingCart.js";
import deliveryServiceRoutes from "./routes/deliveryServices.js";
import foodsRoutes from "./routes/foods.js";

const port = 3001
const app = express()

// Set app and required librares for the apps
function setApp() {
    setAppLibraries()
    setAppRoutes()
}

function setAppLibraries() {
    app.use(cors())
    app.use(express.json())
}

// Set up required routes
function setAppRoutes() {
    app.use(accountRoutes);
    app.use(ratingsRoutes);
    app.use(shoppingCartRoutes);
    app.use(deliveryServiceRoutes);
    app.use(foodsRoutes);
}

function runApp() {
    app.listen(port, () => {console.log(`App running on port ${port}.`)})
}

setApp()
runApp()