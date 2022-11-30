import http from "../http-common";

class deliveryServiceDataService {

    getAllDeliveryServices() {
        const deliveryServicesList = http.get(`/delivery_services`);
        return deliveryServicesList;
    }

    updateDeliveryServiceRatingAndGetDeliveryServiceRatings(newRatingInformation) {
        this.setNewRating(newRatingInformation)
        const deliveryServicesRatingsList = this.getAllDeliveryServiceRatings()
        return deliveryServicesRatingsList
    }

    setNewRating(newRatingInformation) {
        http.post(`/updaterating`, newRatingInformation);
    }

    getAllDeliveryServiceRatings() {
        const deliveryServicesRatingsList = http.get(`/getratings`)
        return deliveryServicesRatingsList;
    }

    // MOVED TO PYTHON
    deleteDeliveryService(id) {
        return http.delete(`/delivery_services/${id}`);
    }

    // MOVED TO PYTHON
    updateDeliveryService(id, data) {
        return http.put(`/delivery_services/${id}`, data);
    }

    // MOVED TO PYTHON
    createDeliveryService(data) {
        return http.post("/delivery_services", data);
    }

}

export default new deliveryServiceDataService();