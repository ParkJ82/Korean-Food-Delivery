import deliveryServicesDAO from "../dao/deliveryServicesDAO.js";

export default class InsertDeliveryService {
    static async apiPostDeliveryService(req, res, next) {
        try {
            const deliveryServiceName = req.body.name
            const deliveryServiceEmail = req.body.email
            const deliveryServicePhoneNumber = req.body.phoneNumber
            const deliveryServiceDeliveryMinimum = req.body.deliveryMinimum
            const deliveryServiceSetMenuMinimum = req.body.setMenuMinimum
            const deliveryServiceOrderBy = req.body.orderBy

            const deliveryServiceReponse = await deliveryServicesDAO.addDeliveryService(
                deliveryServiceName,
                deliveryServiceEmail,
                deliveryServicePhoneNumber,
                deliveryServiceDeliveryMinimum,
                deliveryServiceSetMenuMinimum,
                deliveryServiceOrderBy
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateDeliveryService(req, res, next) {
        try {
            const deliveryServiceId = req.body._id
            const deliveryServiceName = req.body.name
            const deliveryServiceEmail = req.body.email
            const deliveryServicePhoneNumber = req.body.phoneNumber
            const deliveryServiceDeliveryMinimum = req.body.deliveryMinimum
            const deliveryServiceSetMenuMinimum = req.body.setMenuMinimum
            const deliveryServiceOrderBy = req.body.orderBy

            const deliveryServiceResponse = await deliveryServicesDAO.updateDeliveryService(
                deliveryServiceId,
                deliveryServiceName,
                deliveryServiceEmail,
                deliveryServicePhoneNumber,
                deliveryServiceDeliveryMinimum,
                deliveryServiceSetMenuMinimum,
                deliveryServiceOrderBy
            )

            var { error } = deliveryServiceResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (deliveryServiceResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update deliveryService - user may not be original poster"
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteDeliveryService(req, res, next) {
        try {
            const deliveryServiceId = req.body._id
            const deliveryServiceResponse = await deliveryServicesDAO.deleteDeliveryService(
                deliveryServiceId
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}