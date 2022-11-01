import http from "../http-common";

class FoodDataService {
    getAll(page = 0) {
        return http.get(`/foods?page=${page}`);
    }

    get(id) {
        return http.get(`/foods/id/${id}`)
    }

    find(query, by = "name", page = 0) {
        return http.get(`/foods?${by}=${query}&page=${page}`)
    }

    createFood(data) {
        return http.post("/foods/food", data);
    }

    updateFood(data) {
        return http.put("/foods/food", data);
    }

    deleteFood(id) {
        return http.delete(`/foods/food?id=${id}`);
    }

    getCategories() {
        return http.get(`/foods/categories`);
    }

}

export default new FoodDataService();