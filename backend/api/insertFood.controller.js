import foodsDAO from "../dao/foodsDAO.js";

export default class InsertFood {
    static async apiPostFood(req, res, next) {
        try {
            const foodName = req.body.name
            const foodEnglishName = req.body.englishName
            const foodCategory = req.body.category
            const foodPrice = req.body.price

            const FoodResponse = await foodsDAO.addFood(
                foodName,
                foodEnglishName,
                foodCategory,
                foodPrice
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateFood(req, res, next) {
        try {
            const foodId = req.body._id
            const foodName = req.body.name
            const foodEnglishName = req.body.englishName
            const foodCategory = req.body.category
            const foodPrice = req.body.price

            const foodResponse = await foodsDAO.updateFood(
                foodId,
                foodName,
                foodEnglishName,
                foodCategory,
                foodPrice
            )

            var { error } = foodResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (foodResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review - user may not be original poster",  
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.messsage })
        }
    }

    static async apiDeleteFood(req, res, next) {
        const foodId = req.body._id
        const foodResponse = await foodsDAO.deleteFood(
            foodId
        )
        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}