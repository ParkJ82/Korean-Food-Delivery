import http from "../http-common";

class FoodDataService {

    // Get all categories of foods
    // Parameters: none
    // Return: {data: list of {category: unique category}}
    getCategories() {
        return http.get(`/foods/categories`);
    }

    // MOVED TO PYTHON
    //
    //
    createFood(data) {
        return http.post("/foods", data);
    }

    // Get all food objects from database
    // Parameters: none
    // Return: {data: list of {food: unique food object}}
    getAllFoods() {
        return http.get(`/foods`);
    }

    // MOVED TO PYTHON
    //
    //
    getFoodById(id) {
        return http.get(`/foods/searchbyid/${id}`);
    }

    // MOVED TO PYTHON
    //
    //
    deleteFood(id) {
        return http.delete(`/foods/${id}`);
    }

    // MOVED TO PYTHON
    //
    //
    updateFood(id) {
        return http.put(`/foods/${id}`);
    }

    // Get first 15 foods based on filtered category and delivery service
    // Parameters: search category, search delivery service
    // Return: {data: list of {food_id, food_name, category, price, delivered_by, is_set_menu}}
    filterByCategoryAndDeliveryService(searchCategory, searchDeliveryService) {
        return http.get(`/foods/${searchDeliveryService}/${searchCategory}`);
    }

}

export default new FoodDataService();