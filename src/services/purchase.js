import http from "../http-common";

class PurchaseDataService {
    createPaymentIntent(items) {
        console.log(items)
        return http.post("/create-payment-intent", items)
    }
}

export default new PurchaseDataService();