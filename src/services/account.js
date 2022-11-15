import http from "../http-common";

class AccountDataService {
    loginToAccount(data) {
        return http.post("/login", data);
    }

    createNewAccount(data) {   
        return http.post("/newaccount", data);
    }

    getName(data) {
        return http.post("/getName", data);
    }
}

export default new AccountDataService();