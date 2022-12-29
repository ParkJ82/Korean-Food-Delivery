
function foodsReducer(state = [], action) {
    switch (action.type) {
        case "SET_HOMEPAGE_FOODS":
            return [...action.foodList]
        default:
            return state;
    }
}

export default foodsReducer