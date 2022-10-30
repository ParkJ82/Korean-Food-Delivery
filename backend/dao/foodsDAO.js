import { ObjectID } from "bson"

let foods

export default class FoodsDAO {
    static async injectDB(conn) {
        if (foods) {
            return
        }
        try {
            foods = await conn.db(process.env.FOODCOLLECTIONS_NS).collection("Food")

        } catch (e) {
            console.error(
                `Unable to establish a collection handle in foodsDAO: ${e}`,
            )
        }
    }

    static async getFoods({
        filters = null,
        page = 0, 
        foodsPerPage = 20
    } = {}) {

        let query
        let cursor

        try {
            cursor = await foods
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { foodsList: [], totalNumFoods: 0 }
        }

        const displayCursor = cursor.limit(foodsPerPage).skip(foodsPerPage * page)

        try {
            const foodsList = await displayCursor.toArray()
            const totalNumFoods = await foods.countDocuments(query)

            return { foodsList, totalNumFoods }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return {foodsList: [], totalNumFoods: 0 }
        }
    }

    static async addFood(foodName, foodEnglishName, foodCategory, foodPrice) {
        try {
            const foodDoc = { name: foodName,
                englishName: foodEnglishName,
                category: foodCategory,
                price: foodPrice,
                _id: ObjectID(),
            }

            return await foods.insertOne(foodDoc)
        } catch (e) {
            console.error(`Unable to post food: ${e}`)
            return { error: e }
        }
    }

    static async updateFood(foodId, foodName, foodEnglishName, foodCategory, foodPrice) {
        try {
            const updateFood = await foods.updateOne(
                { _d: ObjectID(foodId)},
                { $set: { name: foodName, englishName : foodEnglishName, category: foodCategory, price: foodPrice } },
            )

            return updateFood
        } catch (e) {
            console.error(`Unable to update food: ${e}`)
            return { error: e }
        }
    }

    static async deleteFood(foodId) {

        try {
            const deleteFood = await foods.deleteOne({
                _id: ObjectID(foodId),
            })

            return deleteFood
        } catch (e) {
            console.error(`Unable to delete food: ${e}`)
            return { error: e }
        }
    }

    static async getFoodByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectID(id),
                    },
                },
            ]
          return await foods.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getFoodByID: ${e}`)
            throw e
        }
    }

    static async getCategories() {
        let categories = []
        try {
            categories = await foods.distinct("category")
            return categories
        } catch (e) {
            console.error(`Unable to get categories, ${e}`)
            return categories
        }
    }

}