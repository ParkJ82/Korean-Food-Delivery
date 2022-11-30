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
          <Route exact path="/" element={<HomePage />}/>
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
