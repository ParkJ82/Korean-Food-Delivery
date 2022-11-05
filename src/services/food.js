import http from "../http-common";

class FoodDataService {
    


    getCategories() {
        return http.get(`/foods/categories`);
    }

    createFood(data) {
        return http.post("/foods", data);
    }

    getAllFoods() {
        return http.get("/foods");
    }

    getFoodByCategory(category) {
        return http.get(`/foods/searchbycategory${category}`);
    }

    getFoodByDeliveryService(service) {
        return http.get(`/foods/searchbydeliveryservice/${service}`);
    }

    getFoodById(id) {
        return http.get(`/foods/searchbyid/${id}`);
    }

    deleteFood(id) {
        return http.delete(`/foods/${id}`);
    }

    updateFood(id) {
        return http.put(`/foods/${id}`);
    }

    filterByCategoryAndDeliveryService(searchCategory, searchDeliveryService) {
        return http.get(`/foods/${searchDeliveryService}/${searchCategory}`);
    }

}

export default new FoodDataService();