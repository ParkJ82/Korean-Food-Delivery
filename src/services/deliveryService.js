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

    // Rework
    setDeliveryServiceRating(name, rating) {
        console.log([name, rating])
        return http.put(`/delivery_services/${name}/rating/${rating}`);
    }

    updateDeliveryServiceRating(data) {
        return http.post(`/updaterating`, data);
    }

    getDeliveryServiceRating(user) {
        
    }

}

export default new deliveryServiceDataService();