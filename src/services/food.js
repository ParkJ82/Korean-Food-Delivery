import http from "../http-common";

class FoodDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`)
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`)
    }

    createFood(data) {
        return http.post("/food", data);
    }

    updateFood(data) {
        return http.put("/food", data);
    }

    deleteFood(id) {
        return http.delete(`/food?id=${id}`);
    }

    getCategories(id) {
        return http.get(`/categories`);
    }

}

export default new FoodDataService();