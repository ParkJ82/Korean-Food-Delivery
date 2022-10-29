import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import FoodsDAO from "./dao/foodsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.FOODCOLLECTIONS_DB_URI,
    {
        maxPoolSize: 50,
        writeConcern: 2500,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await FoodsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })