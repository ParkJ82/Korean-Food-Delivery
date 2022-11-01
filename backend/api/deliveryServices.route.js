import express from "express"
import DeliveryServicesCtrl from "./deliveryServices.controller.js"
import InsertDeliveryService from "./insertDeliveryService.controller.js"
const router = express.Router()

router.route("/").get(DeliveryServicesCtrl.apiGetDeliveryServices)
router.route("/id/:id").get(DeliveryServicesCtrl.apiGetDeliveryServicesById)

router
    .route("/InsertDeliveryService")
    .post(InsertDeliveryService.apiPostDeliveryService)
    .put(InsertDeliveryService.apiUpdateDeliveryService)
    .delete(InsertDeliveryService.apiDeleteDeliveryService)

export default router