import http from "../http-common";

class FoodDataService {

    getAllFoods() {
        const foodsList = http.get(`/foods`);
        return foodsList;
    }

    getAllFoodCategories() {
        const foodCategoriesList = http.get(`/foods/categories`);
        return foodCategoriesList;
    }

    getFoodByCategoryAndDeliveryService(categoryList, searchDeliveryService) {
        const categoryAndDeliveryService = {categoryList: categoryList, deliveryservice: searchDeliveryService}
        const foodsList = http.post(`/foodsbycategorydeliveryservice`, categoryAndDeliveryService);
        return foodsList;
    }

    getFoodById(id) {
        const food = http.get(`/foods/searchbyid/${id}`);
        return food;
    }

    // MOVED TO PYTHON
    deleteFood(id) {
        return http.delete(`/foods/${id}`);
    }

    // MOVED TO PYTHON
    updateFood(id) {
        return http.put(`/foods/${id}`);
    }

    // MOVED TO PYTHON
    createFood(data) {
        return http.post("/foods", data);
    }

}

export default new FoodDataService();