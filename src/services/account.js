import http from "../http-common";

class AccountDataService {

    // Middleware for retriving token with login information
    // Parameters: data: {login_id: input id, login_password: input password}
    // Return: {data: {token: appropriate token from login}}
    loginToAccount(data) {
        return http.post("/login", data);
    }

    // Middleware for retriving token with new account info
    // Parameters: data: {name: input name, login_id: input id, 
    // login_password: input password, phone_number: input phone number, kakao_id: input kakao id}
    // Return: {data: {token: appropriate token from new account}}
    createNewAccount(data) {   
        return http.post("/newaccount", data);
    }

    // Middleware for retriving login_id with token
    // Parameters: data: {jwt_token: current token}
    // Return: {data: {login_id: login_id for current token}}
    getUserId(data) {
        return http.post("/getid", data);
    }

    // Middleware for retriving name with token
    // Parameters: data: {jwt_token: current token}
    // Return: {data: {name: name for current token}}
    getName(data) {
        return http.post("/getname", data);
    }

    // Middleware for retriving shopping cart with token
    // Parameters: data: {jwt_token: current token}
    // Return: {data: list of {foods_id: food id, food_name: name of food, amount: amount of food}}
    getShoppingCart(user) {
        return http.post("/getshoppingcart", user);
    }

    // Middleware for updating, retriving shopping cart with token
    // Parameters: data: {user: login_id, food_id: food id, amount: added amount}
    // Return: {data: list of {foods_id: food id, food_name: name of food, amount: amount of food}}
    updateShoppingCart(data) {
        return http.post("/updateshoppingcart", data);
    }

}

export default new AccountDataService();