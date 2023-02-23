import http from "../http-common";

class deliveryServiceDataService {

    getAllDeliveryServices() {
        const deliveryServicesList = http.get(`/deliveryservices/delivery_services`);
        return deliveryServicesList;
    }

    updateDeliveryServiceRatingAndGetDeliveryServiceRatings(newRatingInformation) {
        this.setNewRating(newRatingInformation)
        const deliveryServicesRatingsList = this.getAllDeliveryServiceRatings()
        return deliveryServicesRatingsList
    }

    setNewRating(newRatingInformation) {
        http.post(`/deliveryservices/updaterating`, newRatingInformation);
    }

    getAllDeliveryServiceRatings() {
        const deliveryServicesRatingsList = http.get(`/deliveryservices/getratings`)
        return deliveryServicesRatingsList;
    }

    getDeliveryServiceRating(deliveryService) {
        const rating = http.post("/deliveryservices/getrating", deliveryService)
        return rating;
    }

    // MOVED TO PYTHON
    deleteDeliveryService(id) {
        return http.delete(`/deliveryservices/delivery_services/${id}`);
    }

    // MOVED TO PYTHON
    updateDeliveryService(id, data) {
        return http.put(`/deliveryservices/delivery_services/${id}`, data);
    }

    // MOVED TO PYTHON
    createDeliveryService(data) {
        return http.post("/deliveryservices/delivery_services", data);
    }

}

export default new deliveryServiceDataService();