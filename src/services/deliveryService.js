import http from "../http-common";

class deliveryServiceDataService {

    // MOVED TO PYTHON
    //
    //
    createDeliveryService(data) {
        return http.post("/delivery_services", data);
    }

    // Get info about all delivery services (excluding ratings)
    // Parameters: None
    // Return: {data: {service_id: service id, service_name: service name,
    // service_email: service email, service_phonenumber: service phonenumber,
    // delivery_minumum: minimum purchase for free delivery, 
    // order_by: last day to order current set of food, set_menu_minimum: 
    // mimimum purchase needed in order to get set discount}}
    getAllDeliveryServices() {
        return http.get(`/delivery_services`);
    }

    // MOVED TO PYTHON
    //
    //
    deleteDeliveryService(id) {
        return http.delete(`/delivery_services/${id}`);
    }

    // MOVED TO PYTHON
    //
    //
    updateDeliveryService(id, data) {
        return http.put(`/delivery_services/${id}`, data);
    }

    // Update Rating of delivery service and Get All Ratings of delivery services
    // Parameters: data: {user: input account_id, delivery_service: 
    // input delivery service, rating: input rating}
    // Return: {data: list of {service_name: name of service, rating: rating of corresponding service}}
    updateDeliveryServiceRating(data) {
        http.post(`/updaterating`, data);
        return http.get("getratings")
    }

    // Get All Ratings of delivery services
    // Parameters: None
    // Return: {data: list of {service_name: name of service, rating: rating of corresponding service}}
    getDeliveryServiceRating() {
        return http.get(`/getratings`)
    }

}

export default new deliveryServiceDataService();