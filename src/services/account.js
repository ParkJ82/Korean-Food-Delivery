import http from "../http-common";

class AccountDataService {
    loginToAccount(data) {
        return http.post("/login", data);
    }

    createNewAccount(data) {   
        return http.post("/newaccount", data);
    }

    getName(data) {
        return http.post("/getname", data);
    }

    getShoppingCart(user) {
        return http.post("/getshoppingcart", user);
    }

    // createShoppingCart(data) {
    //     return http.post("/newshoppingcart", data);
    // }

    updateShoppingCart(data) {
        return http.post("/updateshoppingcart", data);
    }

}

export default new AccountDataService();