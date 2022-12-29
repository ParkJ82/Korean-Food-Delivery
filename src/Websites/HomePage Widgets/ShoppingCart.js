import { setShoppingCart, returnDynamicShoppingCart, adjustDynamicShoppingCart } from "../../redux/actions";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

async function getAndSetShoppingCartListFromServer(extraArgument) {
    var shoppingCart;
    const { AccountDataService } = extraArgument
    if (!token) {
        shoppingCart = await getShoppingCartFromLocalStorage()
    } else {
    await AccountDataService.getShoppingCartFromToken(token)
        .then(async response => {
            shoppingCart = await getShoppingCartFromDatabaseResponse(response)
            console.log(shoppingCart)
            return shoppingCart
        })
    }

    console.log(shoppingCart)
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
                    {food_id: inputCart[currentFoodIndex].food_id, food_name: inputCart[currentFoodIndex],
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


async function addFoodToLocalStorageShoppingCart(shoppingCart, food, amount) {
    for (let count = 0; count < amount; ++count) {
        shoppingCart.push(food)
    }
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}

async function AddFoodToDatabaseShoppingCart(food, amount, extraArgument) {
    const { AccountDataService } = extraArgument
    const login_id = await getUserIdFromToken(token, AccountDataService)
    await AccountDataService.updateShoppingCart({login_id: login_id, food_id: food.food_id, amount: amount})
}

async function getUserIdFromToken(token, AccountDataService) {
    try {
        let loginId;
        await AccountDataService.getUserIdFromToken(token)
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
        console.log(shoppingCart)
        dispatch(setShoppingCart(shoppingCart))

        dispatch(returnDynamicShoppingCart(shoppingCart))
    }   
}

export function addToShoppingCart(inputFood, amount) {
    return async (dispatch, getState, extraArgument) => {
        var shoppingCart = getState().cartList
        if (!token) {
            await getShoppingCartFromLocalStorageAndAddFood(inputFood, amount)
        } else {
            await AddFoodToDatabaseShoppingCart(inputFood, amount, extraArgument)
        }
    
        // setNewTotalPriceWithInputFood(inputFood)
        await getShoppingCartListWithInputFood(shoppingCart, inputFood, amount)
        dispatch(setShoppingCart([...shoppingCart]))
        dispatch(returnDynamicShoppingCart([...shoppingCart]))
    }
}