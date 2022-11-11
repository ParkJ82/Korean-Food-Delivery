import http from "../http-common";

class FoodDataService {
    


    getCategories() {
        return http.get(`/foods/categories`);
    }

    createFood(data) {
        return http.post("/foods", data);
    }

    getAllFoods() {
        return http.get(`/foods`);
    }

    // getFoodByCategory(category, page=0) {
    //     const pageFood = page * 15;
    //     return http.get(`/foods/${pageFood}/searchbycategory/${category}`);
    // }

    // getFoodByDeliveryService(service, page=0) {
    //     const pageFood = page * 15;
    //     return http.get(`/foods?page=${pageFood}/?searchbydeliveryservice=${service}`);
    // }

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