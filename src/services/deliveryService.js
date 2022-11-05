import http from "../http-common";

class deliveryServiceDataService {

    createDeliveryService(data) {
        return http.post("/delivery_services", data);
    }

    getAllDeliveryServices() {
        return http.get(`/delivery_services`);
    }

    deleteDeliveryService(id) {
        return http.delete(`/delivery_services/${id}`);
    }

    updateDeliveryService(id, data) {
        return http.put(`/delivery_services/${id}`, data);
    }


}

export default new deliveryServiceDataService();