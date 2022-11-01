import deliveryServicesDAO from "../dao/deliveryServicesDAO.js"

export default class DeliveryServicesCtrl {
    static async apiGetDeliveryServices(req, res, next) {
        const deliveryServicesPerPage = req.query.deliveryServicesPerPage ? parseInt(req.query.deliveryServicesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        const {deliveryServicesList, totalNumDeliveryServices} = await deliveryServicesDAO.getDeliveryServices({
            filters,
            page,
            deliveryServicesPerPage
        })

        let response = {
            deliveryServices: deliveryServicesList,
            page: page,
            filters: filters,
            entries_per_page: deliveryServicesPerPage,
            total_results: totalNumDeliveryServices
        }
        res.json(response)
    }

    static async apiGetDeliveryServicesById(req, res, next) {
        try {
            let id = req.params.id || {}
            let deliveryService = await deliveryServicesDAO.getDeliveryServiceByID(id)
            if (!deliveryService) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(deliveryService)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

}