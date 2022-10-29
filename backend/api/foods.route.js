import express from "express"
import FoodsCtrl from "./foods.controller.js"
import InsertFood from "./insertFood.controller.js"
const router = express.Router()

router.route("/").get(FoodsCtrl.apiGetFoods)
router.route("/id/:id").get(FoodsCtrl.apiGetFoodById)
router.route("/categories").get(FoodsCtrl.apiGetFoodCategories)

router
    .route("/InsertFood")
    .post(InsertFood.apiPostFood)
    .put(InsertFood.apiUpdateFood)
    .delete(InsertFood.apiDeleteFood)

export default router