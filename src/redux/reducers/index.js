import cartListReducer from "./shoppingCartList";
import dynamicCartReducer from "./dynamicShoppingCart";
import foodsReducer from "./foods";
import searchDeliveryServiceReducer from "./searchDeliveryService";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    cartList: cartListReducer,
    dynamicCart: dynamicCartReducer,
    foodsList: foodsReducer,
    searchDeliveryService: searchDeliveryServiceReducer
})

export default allReducers;