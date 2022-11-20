// CLEANED

import React from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import CreateAccountWebsite from './Websites/Create Account Widget/CreateAccount';
import HomePage from './Websites/HomePage Widgets/master/HomePage';
import Login from "./Websites/Login Widgets/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Purchase from "./Websites/Purchase";
import ShoppingCart from "./Websites/Shopping Cart/ShoppingCart";
import CustomerService from "./Websites/Customer Service/CustomerService";
import NewCompany from "./Websites/Widgets For Companies/NewCompany";
import FoodSpecifics from "./Websites/Food Specific Widgets/FoodSpecifics";
import TopWidget from "./Websites/Global Widgets/TopWidget";
import RateDelivery from "./Websites/Rate Delivery/RateDelivery";


function App() {

  // Deny access to Routes the user is already Logged In
  // No parameters
  function LoginPrivateRoutes() {
    let auth = {token: localStorage.getItem("token")}
    return (
      auth.token ? <Navigate to="/"/> : <Outlet/>
    )
  }

  return (
      <div>
        <TopWidget/>

        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route element={<LoginPrivateRoutes/>}>
            <Route path="/createaccount" element={<CreateAccountWebsite/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
          <Route path="/purchase" element={<Purchase/>}/>
          <Route path="/newcompany" element={<NewCompany />}/>
          <Route path="/shoppingcart" element={<ShoppingCart/>}/>
          <Route path="/customerservice" element={<CustomerService/>}/>
          <Route path="/foods/:id" element={<FoodSpecifics/>}/>
          <Route path="/ratedelivery" element={<RateDelivery />}/>
        </Routes>
      </div>
    
  );
}

export default App;
