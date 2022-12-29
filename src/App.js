import React, { useState, useEffect, useMemo } from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import CreateAccountWebsite from './Websites/Create Account Widget/CreateAccount';
import HomePage from './Websites/HomePage Widgets/master/HomePage';
import Login from "./Websites/Login Widgets/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Purchase from "./Websites/Purchase/Purchase";
import ShoppingCart from "./Websites/Shopping Cart/ShoppingCart";
import CustomerService from "./Websites/Customer Service/CustomerService";
import NewCompany from "./Websites/Widgets For Companies/NewCompany";
import FoodSpecifics from "./Websites/Food Specific Widgets/FoodSpecifics";
import TopWidget from "./Websites/Global Widgets/TopWidget";
import RateDelivery from "./Websites/Rate Delivery/RateDelivery";
import { useTranslation } from "react-i18next"
import AccountDataService from "./services/account"

import GlobalContext from "./global-states"


function App() {
  const { t } = useTranslation()
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
  // const [ shoppingCartList, setShoppingCartList ] = useState([])
  // const [ dynamicShoppingCart, setDynamicShoppingCart ] = useState({})

  // useEffect(() => {
  //   getShoppingCartList()
  // }, [])

  // useEffect(() => {
  //   async function handleDynamicShoppingCart() {
  //     const dynamicShoppingCart = await getDynamicShoppingCartList()
  //     setDynamicShoppingCart(dynamicShoppingCart)
  //   }
  //   handleDynamicShoppingCart()
  // }, [shoppingCartList])

  // const shoppingCarts = useMemo(() => {
  //   return {shoppingCartList: shoppingCartList, setShoppingCartList: setCardShoppingCartList,
  //     addToShoppingCart: addCardToShoppingCart, dynamicShoppingCart: dynamicShoppingCart,
  //     setDynamicShoppingCart: setCardDynamicShoppingCart}
  // }, [shoppingCartList, dynamicShoppingCart])

  // async function getShoppingCartList() {
  //   getAndSetShoppingCartListFromServer()
  //       .then(response => {
  //           const shoppingCart = response.data
  //           adjustDynamicShoppingCart(shoppingCart);
  //           return shoppingCart;
  //           }
  //       )
  // }

  // async function adjustDynamicShoppingCart() {
  //   const dynamicShoppingCart = await getDynamicShoppingCartList()
  //   setDynamicShoppingCart(dynamicShoppingCart);
  // }

  // async function getDynamicShoppingCartList() {
  //   const outputDynamicShoppingCart = {};
  //   for (let foodIndex = 0; foodIndex < shoppingCartList.length; foodIndex++) {
  //       if (shoppingCartList[foodIndex].food_id in outputDynamicShoppingCart) {
  //           outputDynamicShoppingCart[shoppingCartList[foodIndex].food_id].Amount++;
  //       }
  //       else {
  //           outputDynamicShoppingCart[shoppingCartList[foodIndex].food_id] = 
  //           {Food: shoppingCartList[foodIndex], Amount: 1}
  //       }
  //   }
  //   return outputDynamicShoppingCart
  // }

  // function setCardShoppingCartList(shoppingCartList) {
  //   setShoppingCartList([...shoppingCartList])
  // }

  // function setCardDynamicShoppingCart(dynamicShoppingCart) {
  //   setDynamicShoppingCart(dynamicShoppingCart)
  // }

  // async function getAndSetShoppingCartListFromServer() {
  //     var shoppingCart;
  //     if (!token) {
  //         shoppingCart = getShoppingCartFromLocalStorage()
  //     } else {
  //     await AccountDataService.getShoppingCartFromToken(token)
  //         .then(response => {
  //             shoppingCart = getShoppingCartFromDatabaseResponse(response)
              
  //         })
  //     }
  //     setShoppingCartList(shoppingCart);
  //     return shoppingCart
  // }
  
  // function getShoppingCartFromLocalStorage() {
  //   var shoppingCart;
  //   if (sessionStorage.getItem("shoppingCart")) {
  //       shoppingCart = returnLocalStorageShoppingCart()
  //   } else {
  //       shoppingCart = setAndReturnEmptyLocalStorageShoppingCart()
  //   }
  //   return shoppingCart;
  // }

  // function getShoppingCartFromDatabaseResponse(response) {
  //   const inputCart = response.data
  //   const shoppingCart = getShoppingCartListFromInputCart(inputCart)
  //   return shoppingCart;
  // }

  // function returnLocalStorageShoppingCart() {
  //   var shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"))
  //   return shoppingCart
  // }

  // function setAndReturnEmptyLocalStorageShoppingCart() {
  //   var shoppingCart = [];
  //   sessionStorage.setItem("shoppingCart", JSON.stringify([]));
  //   return shoppingCart
  // }

  // function getShoppingCartListFromInputCart(inputCart) {
  //   const shoppingCart = []
  //   for (let currentFoodIndex = 0; currentFoodIndex < inputCart.length; ++currentFoodIndex) {
  //       for (let amount = 0; amount < inputCart[currentFoodIndex].amount; ++amount) {
  //           shoppingCart
  //               .push(
  //                   {food_id: inputCart[currentFoodIndex].food_id, food_name: inputCart[currentFoodIndex],
  //                       category: inputCart[currentFoodIndex].category, price: inputCart[currentFoodIndex].price,
  //                           delivered_by: inputCart[currentFoodIndex].delivered_by, 
  //                               is_set_menu: inputCart[currentFoodIndex].is_set_menu
  //               })
  //       }
  //   }
  //   return shoppingCart;
  // }

  // async function addCardToShoppingCart(inputFood, amount) {
  //   if (!token) {
  //       getShoppingCartFromLocalStorageAndAddFood(inputFood, amount)
  //   } else {
  //       AddFoodToDatabaseShoppingCart(inputFood, amount)
  //   }
    
  //   // setNewTotalPriceWithInputFood(inputFood)
  //   setShoppingCartListWithInputFood(inputFood, amount)
  //   adjustDynamicShoppingCart();
  // }

  // function getShoppingCartFromLocalStorageAndAddFood(food, amount) {
  //     const shoppingCart = getShoppingCartFromLocalStorage()
  //     addFoodToLocalStorageShoppingCart(shoppingCart, food, amount)
  // }

  // function addFoodToLocalStorageShoppingCart(shoppingCart, food, amount) {
  //   for (let count=0; count < amount; ++count) {
  //       shoppingCart.push(food)
  //   }
  //   sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  // }

  // async function AddFoodToDatabaseShoppingCart(food, amount) {
  //   const login_id = await getUserIdFromToken(token)
  //   AccountDataService.updateShoppingCart({login_id: login_id, food_id: food.food_id, amount: amount})
  // }

  // async function getUserIdFromToken(token) {
  //   try {
  //       let loginId;
  //       await AccountDataService.getUserIdFromToken(token)
  //           .then(response => {
  //               loginId = response.data.login_id; 
  //           })
  //       return handleLoginId(loginId)
  //   } catch (err) {
  //       handleGetError(err)
  //   }
  // }

  // async function setShoppingCartListWithInputFood(inputFood, amount) {
  //   for (let count=0; count < amount; ++count) {
  //       shoppingCartList.push(inputFood);
  //   }
  //   setShoppingCartList(shoppingCartList);
  // }

  // function handleLoginId(loginId) {
  //   if (loginId !== "") {
  //       return loginId;      
  //   }
  // }

  // function handleGetError(error) {
  //   console.error(error)
  // }

  useEffect(() => {
    document.title = t("name")
  }, [t])
  function CreateNonLoginPrivateRoutes() {
    let authorization = {token: localStorage.getItem("token")}
    return (
      authorization.token ? <Navigate to="/"/> : <Outlet/>
    )
  }

  return (
      <div>
        
        <TopWidget/>

        <Routes>
          
            <Route element={<CreateNonLoginPrivateRoutes/>}>
              <Route path="/createaccount" element={<CreateAccountWebsite/>}/>
              <Route path="/login" element={<Login/>}/>
            </Route>
            <Route path="/" element={<HomePage />}/>
            <Route path="/kr" element={<HomePage />}/>
            <Route path="/en" element={<HomePage />}/>
            <Route path="/purchase" element={
                  <Purchase/>
              }/>
            <Route path="/newcompany" element={
                    <NewCompany />} />
            <Route path="/shoppingcart" element={
                  <ShoppingCart/>
            }/>
            <Route path="/customerservice" element={<CustomerService/>}/>
            <Route path="/foods/:id" element={
                  <FoodSpecifics/>
            }/>
            <Route path="/ratedelivery" element={<RateDelivery />}/>
  
        </Routes>
      </div>
    
  );
}

export default App;
