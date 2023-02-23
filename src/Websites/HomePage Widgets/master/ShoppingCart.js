import { setShoppingCart, returnDynamicShoppingCart, adjustDynamicShoppingCart } from "../../../redux/actions";

async function getAndSetShoppingCartListFromServer(extraArgument) {
    var shoppingCart;
    let token
    const { AccountDataService } = extraArgument
    await AccountDataService.getToken()
        .then(async response => {
            token = response.data
        })
    if (token === "false") {
        shoppingCart = await getShoppingCartFromLocalStorage()
    } else {
    await AccountDataService.getShoppingCartFromToken()
        .then(async response => {
            shoppingCart = await getShoppingCartFromDatabaseResponse(response)
            return shoppingCart
        })
    }

    // setShoppingCartList(shoppingCart);
    return shoppingCart
}
  
async function getShoppingCartFromLocalStorage() {
    var shoppingCart;
    if (sessionStorage.getItem("shoppingCart")) {
        shoppingCart = returnLocalStorageShoppingCart()
        
    } else {
        shoppingCart = setAndReturnEmptyLocalStorageShoppingCart()
    }
    return shoppingCart;
}

async function getShoppingCartFromDatabaseResponse(response) {
    const inputCart = response.data
    const shoppingCart = getShoppingCartListFromInputCart(inputCart)
    return shoppingCart;
}

function returnLocalStorageShoppingCart() {
    var shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"))
    return shoppingCart
}

function setAndReturnEmptyLocalStorageShoppingCart() {
    var shoppingCart = [];
    sessionStorage.setItem("shoppingCart", JSON.stringify([]));
    return shoppingCart
}

function getShoppingCartListFromInputCart(inputCart) {
    const shoppingCart = []
    for (let currentFoodIndex = 0; currentFoodIndex < inputCart.length; ++currentFoodIndex) {
        for (let amount = 0; amount < inputCart[currentFoodIndex].amount; ++amount) {
            shoppingCart
                .push(
                    {food_id: inputCart[currentFoodIndex].food_id, food_name: inputCart[currentFoodIndex].food_name,
                        category: inputCart[currentFoodIndex].category, price: inputCart[currentFoodIndex].price,
                            delivered_by: inputCart[currentFoodIndex].delivered_by, 
                                is_set_menu: inputCart[currentFoodIndex].is_set_menu
                })
        }
    }
    return shoppingCart;
}



async function getShoppingCartFromLocalStorageAndAddFood(food, amount) {
    const shoppingCart = await getShoppingCartFromLocalStorage()
    await addFoodToLocalStorageShoppingCart(shoppingCart, food, amount)
}

async function getShoppingCartFromLocalStorageAndDeleteFood(food, amount) {
    const shoppingCart = await getShoppingCartFromLocalStorage()
    await deleteFoodFromLocalStorageShoppingCart(shoppingCart, food, amount)
}

async function getShoppingCartFromLocalStorageAndDeleteAllFood(food) {
    const shoppingCart = await getShoppingCartFromLocalStorage()
    await deleteAllFoodFromLocalStorageShoppingCart(shoppingCart, food)
}

async function getShoppingCartFromLocalStorageAndDeleteAllFromUser() {
    sessionStorage.removeItem("shoppingCart")
}


async function addFoodToLocalStorageShoppingCart(shoppingCart, food, amount) {
    for (let count = 0; count < amount; ++count) {
        shoppingCart.push(food)
    }
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}

async function deleteFoodFromLocalStorageShoppingCart(shoppingCart, food, amount) {
    let index = 0;
    while (JSON.stringify(shoppingCart[index]) != JSON.stringify(food)) {
        ++index;
    }
    await shoppingCart.splice(index, amount)
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}

async function deleteAllFoodFromLocalStorageShoppingCart(shoppingCart, food) {
    shoppingCart = shoppingCart.filter(a => JSON.stringify(a) !== JSON.stringify(food))
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}

async function addFoodToDatabaseShoppingCart(food, amount, extraArgument) {
    const { AccountDataService } = extraArgument
    const login_id = await getUserIdFromToken(AccountDataService)
    await AccountDataService.updateShoppingCart({login_id: login_id, food_id: food.food_id, amount: amount})
}

async function deleteFoodFromDatabaseShoppingCart(food, amount, extraArgument) {
    const { AccountDataService } = extraArgument
    const login_id = await getUserIdFromToken(AccountDataService)
    await AccountDataService.deleteFromShoppingCart({login_id: login_id, food_id: food.food_id, amount: amount})
}

async function deleteAllFoodFromDatabaseShoppingCart(food, extraArgument) {
    const { AccountDataService } = extraArgument
    const login_id = await getUserIdFromToken(AccountDataService)
    await AccountDataService.deleteAllFromShoppingCart({login_id: login_id, food_id: food.food_id})
}

async function deleteAllFromUserFromDatabaseShoppingCart(extraArgument) {
    const { AccountDataService } = extraArgument
    const login_id = await getUserIdFromToken(AccountDataService)
    await AccountDataService.deleteAllFromUser()
}

async function getUserIdFromToken(AccountDataService) {
    try {
        let loginId;
        await AccountDataService.getUserIdFromToken()
            .then(response => {
                loginId = response.data.login_id; 
            })
        return await handleLoginId(loginId)
    } catch (err) {
        handleGetError(err)
    }
}

async function getShoppingCartListWithInputFood(shoppingCartList, inputFood, amount) {
    for (let count=0; count < amount; ++count) {
        shoppingCartList.push(inputFood);
    }
}

async function deleteShoppingCartListWithoutInputFood(shoppingCartList, inputFood, amount) {
    
    let index = 0;
    while (JSON.stringify(shoppingCartList[index]) != JSON.stringify(inputFood)) {
        ++index;
    }
    await shoppingCartList.splice(index, amount)
}

function deleteShoppingCartListWithoutAllInputFood(shoppingCartList, inputFood) {
    const returnShoppingCartList = shoppingCartList.filter(a => JSON.stringify(a) !== JSON.stringify(inputFood))
    return returnShoppingCartList
}

async function handleLoginId(loginId) {
    if (loginId !== "") {
        return loginId;      
    }
}

function handleGetError(error) {
    console.error(error)
}

export function getShoppingCartListFromServerAndSetDynamicShoppingCart() {
    return async (dispatch, getState, extraArgument) => {
        const shoppingCart = await getAndSetShoppingCartListFromServer(extraArgument)
        // .then(response => {
        //     const shoppingCart = response.data
        //     console.log(shoppingCart)
        //     // dispatch(adjustDynamicShoppingCart(shoppingCart));
        //     return shoppingCart;
        //     }
        // )
        dispatch(setShoppingCart(shoppingCart))

        dispatch(returnDynamicShoppingCart(shoppingCart))
    }   
}

export function addToShoppingCart(inputFood, amount) {
    return async (dispatch, getState, extraArgument) => {
        var shoppingCart = getState().cartList
        let token
        const { AccountDataService } = extraArgument
        await AccountDataService.getToken()
            .then(async response => {
                token = response.data
            })
        if (token === "false") {
            await getShoppingCartFromLocalStorageAndAddFood(inputFood, amount)
        } else {
            await addFoodToDatabaseShoppingCart(inputFood, amount, extraArgument)
        }
    
        // setNewTotalPriceWithInputFood(inputFood)
        await getShoppingCartListWithInputFood(shoppingCart, inputFood, amount)
        dispatch(setShoppingCart([...shoppingCart]))
        dispatch(returnDynamicShoppingCart([...shoppingCart]))
    }
}

export function deleteFromShoppingCart(inputFood, amount) {
    return async (dispatch, getState, extraArgument) => {
        var shoppingCart = getState().cartList
        let token
        const { AccountDataService } = extraArgument
        await AccountDataService.getToken()
            .then(async response => {
                token = response.data
            })
        if (token === "false") {
            await getShoppingCartFromLocalStorageAndDeleteFood(inputFood, amount)
        } else {
            await deleteFoodFromDatabaseShoppingCart(inputFood, amount, extraArgument)
        }

        await deleteShoppingCartListWithoutInputFood(shoppingCart, inputFood, amount)
        dispatch(setShoppingCart([...shoppingCart]))
        dispatch(returnDynamicShoppingCart([...shoppingCart]))
    }
}

export function deleteAllFromShoppingCart(inputFood) {
    return async (dispatch, getState, extraArgument) => {
        var shoppingCart = getState().cartList
        let token
        const { AccountDataService } = extraArgument
        await AccountDataService.getToken()
            .then(async response => {
                token = response.data
            })
        if (token === "false") {
            await getShoppingCartFromLocalStorageAndDeleteAllFood(inputFood)
        } else {
            await deleteAllFoodFromDatabaseShoppingCart(inputFood, extraArgument)
        }
        
        const returnShoppingCart = deleteShoppingCartListWithoutAllInputFood(shoppingCart, inputFood)
        dispatch(setShoppingCart([...returnShoppingCart]))
        dispatch(returnDynamicShoppingCart([...returnShoppingCart]))
    }
}

export function deleteAllFromUser() {
    return async (dispatch, getState, extraArgument) => {
        let token
        const { AccountDataService } = extraArgument
        await AccountDataService.getToken()
            .then(async response => {
                token = response.data
            })
        if (token === "false") {
            await getShoppingCartFromLocalStorageAndDeleteAllFromUser()
        } else {
            await deleteAllFromUserFromDatabaseShoppingCart(extraArgument)
        }

        dispatch(setShoppingCart([]))
        dispatch(returnDynamicShoppingCart([]))
    }
}