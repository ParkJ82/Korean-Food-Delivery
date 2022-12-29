
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null


function cartListReducer(state = [], action) {
    switch (action.type) {
        case "SET_SHOPPING_CART":
            return action.shoppingCartList
        // case "ADD_FOOD_TO_SHOPPING_CART":
        //     return addToShoppingCart(state, action.food, action.amount)
        default:
            return state;
    }
}

export default cartListReducer;