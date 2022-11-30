import http from "../http-common";

class AccountDataService {

    loginToAccountAndGetToken(loginIdAndPassword) {
        const token = http.post("/login", loginIdAndPassword);
        return token;
    }

    createNewAccountAndGetToken(newAccountInformation) {   
        const token = http.post("/newaccount", newAccountInformation);
        return token
    }

    getUserIdFromToken(token) {
        const userId = http.post("/getid", {jwt_token: token});
        return userId;
    }

    getNameFromToken(token) {
        const name = http.post("/getname", {jwt_token: token});
        return name;
    }

    async getShoppingCartFromToken(token) {
        const shoppingCartList = http.post("/getshoppingcart", {jwt_token: token});
        return shoppingCartList;
    }

    updateShoppingCart(newShoppingCartInformation) {
        http.post("/updateshoppingcart", newShoppingCartInformation);
    }

}

export default new AccountDataService();