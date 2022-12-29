function searchDeliveryServiceReducer(state="전체 업체", action) {
    switch (action.type) {
        case "SET_HOMEPAGE_DELIVERY_SERVICE":
            return action.deliveryService
        default:
            return state
    }
}

export default searchDeliveryServiceReducer