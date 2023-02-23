import http from "../http-common";

class PurchaseDataService {
    createIntent(items) {
        return http.post("/payments/create-payment-intent", items)
    }

    transferMoney(dynamicShoppingCart) {
        http.post("/payments/transfer-payments", dynamicShoppingCart)
    }
}

export default new PurchaseDataService();