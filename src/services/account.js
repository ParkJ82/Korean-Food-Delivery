import http from "../http-common";

class AccountDataService {

    loginToAccountAndGetToken(loginIdAndPassword) {
        const token = http.post("/account/login", loginIdAndPassword);
        return token;
    }

    createNewAccountAndGetToken(newAccountInformation) {   
        const token = http.post("/account/newaccount", newAccountInformation);
        return token
    }

    getUserIdFromToken() {
        const userId = http.post("/account/getid");
        return userId;
    }

    getNameFromToken() {
        const name = http.post("/account/getname");
        return name;
    }

    async getShoppingCartFromToken() {
        const shoppingCartList = http.post("/shoppingcart/getshoppingcart");
        return shoppingCartList;
    }

    updateShoppingCart(newShoppingCartInformation) {
        http.post("/shoppingcart/updateshoppingcart", newShoppingCartInformation);
    }

    deleteFromShoppingCart(deleteInformation) {
        http.delete("/shoppingcart/deleteshoppingcart", {data: deleteInformation})
    }

    deleteAllFromShoppingCart(deleteInformation) {
        http.delete("/shoppingcart/deleteallfromshoppingcart", {data: deleteInformation})
    }

    deleteAllFromUser(deleteInformation) {
        http.delete("/shoppingcart/deleteall", {data: deleteInformation})
    }

    deleteToken() {
        http.get("/token/deletetoken")
    }

    getToken() {
        return http.get("/token/gettoken")
    }

    getInfo() {
        return http.post("/account/getinfo")
    }

}

export default new AccountDataService();