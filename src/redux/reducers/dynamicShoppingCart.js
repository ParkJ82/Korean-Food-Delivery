
function getDynamicShoppingCartList(shoppingCartList) {
    const outputDynamicShoppingCart = {};
    for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
        if (shoppingCartList[foodIndex].food_id in outputDynamicShoppingCart) {
            outputDynamicShoppingCart[shoppingCartList[foodIndex].food_id].Amount++;
        }
        else {
            outputDynamicShoppingCart[shoppingCartList[foodIndex].food_id] = 
            {Food: shoppingCartList[foodIndex], Amount: 1}
        }
    }
    return outputDynamicShoppingCart
}

function adjustDynamicShoppingCart(originalDictionary, food, amount) {
    const newDictionary = originalDictionary;
    if (food.delivery_service in originalDictionary) {
        originalDictionary[food.food_id].Amount += amount
    } else {
        originalDictionary[food.food_id] = {Food: food, Amount: amount}
    }
    return originalDictionary
}

function dynamicCartReducer(state = {}, action) {
    switch (action.type) {
        case "RETURN_DYNAMIC_SHOPPING_CART":
            return getDynamicShoppingCartList(action.shoppingCartList)
        case "ADJUST_DYNAMIC_SHOPPING_CART":
            return adjustDynamicShoppingCart(state, action.food, action.amount)
        default:
            return state;
    }
}

export default dynamicCartReducer;