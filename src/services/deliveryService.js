import http from "../http-common";

class deliveryServiceDataService {
    getAll(page = 0) {
        return http.get(`/deliveryServices?page=${page}`);
    }

    get(id) {
        return http.get(`/deliveryServices/id/${id}`)
    }

    find(query, by = "name", page = 0) {
        return http.get(`/deliveryServices?${by}=${query}&page=${page}`)
    }

    createDeliveryService(data) {
        return http.post("/deliveryServices/DeliveryService", data);
    }

    updateDeliveryService(data) {
        return http.put("/deliveryServices/DeliveryService", data);
    }

    deleteDeliveryService(id) {
        return http.delete(`/deliveryServices/DeliveryService?id=${id}`);
    }

}

export default new deliveryServiceDataService();