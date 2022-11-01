import { ObjectID } from "bson"

let deliveryServices

export default class deliveryServicesDAO {
    static async injectDB(conn) {
        if (deliveryServices) {
            return
        }
        try {
            deliveryServices = await conn.db(process.env.FOODCOLLECTIONS_NS).collection("DeliveryServices")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in deliveryServicesDAO: ${e}`,
            )
        }
    }

    static async getDeliveryServices({
        filters = null,
        page = 0,
        deliveryServicesPerPage = 20
    } = {}) {

        let query
        let cursor

        try {
            cursor = await deliveryServices
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { deliveryServicesList: [], totalNumDeliveryServices: 0 }
        }

        const displayCursor = cursor.limit(deliveryServicesPerPage).skip(deliveryServicesPerPage * page)

        try {
            const deliveryServicesList = await displayCursor.toArray()
            const totalNumDeliveryServices = await deliveryServices.countDocuments(query)

            return { deliveryServicesList, totalNumDeliveryServices }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return {deliveryServicesList: [], totalNumDeliveryServices: 0 }
        }
    }

    static async getDeliveryServiceByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectID(id),
                    },
                },
            ]
          return await deliveryServices.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in deliveryServicesDAO: ${e}`)
            throw e
        }
    }

    static async addDeliveryService(deliveryServiceName,
                                    deliveryServiceEmail,
                                    deliveryServicePhoneNumber,
                                    deliveryServiceDeliveryMinimum,
                                    deliveryServiceSetMenuMinimum,
                                    deliveryServiceOrderBy) {
          try {
            const deliveryServiceDoc = {
                _id: ObjectID(),
                name: deliveryServiceName,
                email: deliveryServiceEmail,
                phoneNumber: deliveryServicePhoneNumber,
                deliveryMinimum: deliveryServiceDeliveryMinimum,
                setMenuMinimum: deliveryServiceSetMenuMinimum,
                orderBy: deliveryServiceOrderBy,
            }

            return await deliveryServices.insertOne(deliveryServiceDoc)
          }  catch (e) {
            console.error(`Unable to post deliveryService: ${e}`)
            return { error: e }
          }
    }

    static async updateDeliveryService(deliveryServiceId,
                                    deliveryServiceName,
                                    deliveryServiceEmail,
                                    deliveryServicePhoneNumber,
                                    deliveryServiceDeliveryMinimum,
                                    deliveryServiceSetMenuMinimum,
                                    deliveryServiceOrderBy) {
        try {
            const updateDeliveryService = await deliveryServices.updateOne(
                { _id: ObjectID(deliveryServiceId) },
                { $set: { name: deliveryServiceName, email: deliveryServiceEmail, phoneNumber: deliveryServicePhoneNumber,
                deliveryMinimum: deliveryServiceDeliveryMinimum, setMenuMinimum: deliveryServiceSetMenuMinimum,
                orderBy: deliveryServiceOrderBy } }
            )

            return updateDeliveryService
        } catch (e) {
            console.error(`Unable to update deliveryService: ${e}`)
            return { error: e }
        }
    }

    static async deleteDeliveryService(deliveryServiceId) {
        try {
            const deleteDeliveryService = await deliveryServices.deleteOne({
                _id: ObjectID(deliveryServiceId),
            })

            return deleteDeliveryService
        } catch (e) {
            console.error(`Unable to delete deliveryService: ${e}`)
            return { error: e }
        }
    }
}