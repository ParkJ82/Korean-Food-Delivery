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


function App() {

  const [user, setUser] = useState(
    sessionStorage.getItem("user") ? 
      JSON.parse(sessionStorage.getItem("user")) : null);
  const [shoppingCart, setShoppingCart] = useState(
    user ? 
    // Work on
      accounts.retriveShoppingCart(user) : localStorage.getItem("guestUser") 
      ? JSON.parse(localStorage.getItem("guestUser")) : []
  );

  function login(user = null) {
    setUser(user);
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }


  function logout() {
    setShoppingCart([]);
    setUser(null);
  }

  function alterShoppingCart(action, inputFood, inputShoppingCart, user=null) {
    // if (action == "remove") {
    //  setShoppingCart(inputShoppingCart.filter(food => food.food_id !== inputFood.food_id));
    // } else {
    //   setShoppingCart([...inputShoppingCart, inputFood]);
    // }

    // Start From Here Tomorrow
    setShoppingCart(inputShoppingCart)
    user ? 
    accounts.adjustShoppingCart(user) : localStorage.setItem("guestUser", JSON.stringify(inputShoppingCart))
    
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


          <Route exact path="/" element={<LoginContext.Provider value={{user: user, login:login }}>
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

          <Route path="/shoppingcart" element={<LoginContext.Provider value={{user: user, login:login }}>
            <ShoppingCart/>
            </LoginContext.Provider>}/>

          <Route path="/customerservice" element={<LoginContext.Provider value={{user: user, login:login }}>
            <CustomerService/>
            </LoginContext.Provider>}/>

          <Route path="/foods/:id" element={<LoginContext.Provider value={{user: user, login:login }}>
            <FoodSpecifics/>
            </LoginContext.Provider>}/>

        </Routes>
        
      
      </div>
    
  );
}

export default App;
