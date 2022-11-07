import http from "../http-common";

class AccountDataService {
    getAccountById(id) {
        return http.get(`/accounts/${id}`);
    }

    createNewAccount(data) {
        
        return http.post("/newaccount", data);
    }

    validateAccount(data) {
        console.log(data.id);
        console.log(data.password);
        return http.get(`/accounts/${data.id}/${data.password}`);
    }
}

export default new AccountDataService();