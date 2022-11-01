import express from "express"
import cors from "cors"
import foods from "./api/foods.route.js"
import deliveryServices from "./api/deliveryServices.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/foods", foods)
app.use("/api/v1/deliveryServices", deliveryServices)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app