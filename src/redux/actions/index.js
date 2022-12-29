import food from "../../services/food"

export function setShoppingCart(shoppingCartList) {
    return {
        type: "SET_SHOPPING_CART",
        shoppingCartList: shoppingCartList
    }
}

export function addFoodToShoppingCart(food, amount) {
    return {
        type: "ADD_FOOD_TO_SHOPPING_CART",
        food: food,
        amount: amount
    }
}

export function returnDynamicShoppingCart(shoppingCartList) {
    return {
        type: "RETURN_DYNAMIC_SHOPPING_CART",
        shoppingCartList: shoppingCartList
    }
}

export function setHomePageFoods(foodList) {
    return {
        type: "SET_HOMEPAGE_FOODS",
        foodList: foodList
    }
}

export function setHomePageDeliveryService(deliveryService) {
    return {
        type: "SET_HOMEPAGE_DELIVERY_SERVICE",
        deliveryService: deliveryService
    }
}

export function adjustDynamicShoppingCart(food, amount) {
    return {
        type: "ADJUST_DYNAMIC_SHOPPING_CART",
        food: food,
        amount: amount
    }
}