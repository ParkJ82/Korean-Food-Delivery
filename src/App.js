import React, { useState, useEffect } from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import CreateAccountWebsite from './Websites/Create Account Widget/CreateAccount';
import HomePage from './Websites/HomePage Widgets/master/HomePage';
import Login from "./Websites/Login Widgets/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Purchase from "./Websites/Purchase";
import ShoppingCart from "./Websites/Shopping Cart/ShoppingCart";
import CustomerService from "./Websites/Customer Service/CustomerService";
import NewCompany from "./Websites/Widgets For Companies/NewCompany";
import FoodSpecifics from "./Websites/Food Specific Widgets/FoodSpecifics";
import TopWidget from "./Websites/Global Widgets/TopWidget";
import LoginContext from "./login-context";
import RateDelivery from "./Websites/Rate Delivery/RateDelivery";


function App() {

  const [user, setUser] = useState(
    // sessionStorage.getItem("user") ? 
    //   JSON.parse(sessionStorage.getItem("user")) : 
      null);
  const [shoppingCart, setShoppingCart] = useState(
    // user ?   
    //   accounts.retriveShoppingCart(user) : localStorage.getItem("guestUser") 
    //   ? JSON.parse(localStorage.getItem("guestUser")) : 
      sessionStorage.getItem("shoppingCart") ?
        JSON.parse(sessionStorage.getItem("shoppingCart")) : []
  );

  const [totalCost, setTotalCost] = useState(
      sessionStorage.getItem("totalCost") ?
        JSON.parse(sessionStorage.getItem("totalCost")) : 0);

  const [deliveryServices, setDeliveryServices] = useState([]);



  function login(user = null) {
    setUser(user);
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  function adjustCost(cost) {
    setTotalCost(cost);
    sessionStorage.setItem("totalCost", JSON.stringify(cost));
  }

  function setInputDeliveryServices(inputDeliveryServices) {
    setDeliveryServices(inputDeliveryServices)
  }

  function logout() {
    setShoppingCart([]);
    setUser(null);
  }

  function alterShoppingCart(inputShoppingCart) {
    // if (action == "remove") {
    //  setShoppingCart(inputShoppingCart.filter(food => food.food_id !== inputFood.food_id));
    // } else {
    //   setShoppingCart([...inputShoppingCart, inputFood]);
    // }

    setShoppingCart(inputShoppingCart);
    sessionStorage.setItem("shoppingCart", JSON.stringify(inputShoppingCart));
    console.log(inputShoppingCart);
    // user ? 
    // accounts.adjustShoppingCart(user) : localStorage.setItem("guestUser", JSON.stringify(inputShoppingCart))
    
  }

  function PrivateRoutes() {
    let auth = {'token': user}
    return (
      auth.token ? <Navigate to="/"/> : <Outlet/>
    )
  }

  return (
      <div>
        <LoginContext.Provider value={{user: user}}>
          <TopWidget/>
        </LoginContext.Provider>

        <Routes>


          <Route exact path="/" element={<LoginContext.Provider value={{user: user, shoppingCart: shoppingCart, 
            alterShoppingCart:alterShoppingCart, totalCost:totalCost,  setTotalCost: adjustCost, 
}}>
          <HomePage />
          </LoginContext.Provider>}/>

          <Route element={<PrivateRoutes/>}>
            <Route path="/createaccount" element={<LoginContext.Provider value={{user: user, login:login }}>
            <CreateAccountWebsite/>
            </LoginContext.Provider>}/>


            <Route path="/login" element={<LoginContext.Provider value={{user: user, login:login }}>
              <Login/>
              </LoginContext.Provider>}/>
          </Route>

          <Route path="/purchase" element={<LoginContext.Provider value={{user: user, login:login }}>
            <Purchase/>
            </LoginContext.Provider>}/>

          <Route path="/newcompany" element={<NewCompany />}/>

          <Route path="/shoppingcart" element={<LoginContext.Provider value={{user: user, shoppingCart: shoppingCart, 
            alterShoppingCart:alterShoppingCart, totalCost:totalCost,  setTotalCost: adjustCost}}>
            <ShoppingCart/>
            </LoginContext.Provider>}/>

          <Route path="/customerservice" element={<LoginContext.Provider value={{user: user, login:login }}>
            <CustomerService/>
            </LoginContext.Provider>}/>

          <Route path="/foods/:id" element={<LoginContext.Provider value={{user: user, shoppingCart: shoppingCart, alterShoppingCart:alterShoppingCart }}>
            <FoodSpecifics/>
            </LoginContext.Provider>}/>

          <Route path="/ratedelivery" element={<RateDelivery />}/>

        </Routes>
        
      
      </div>
    
  );
}

export default App;
