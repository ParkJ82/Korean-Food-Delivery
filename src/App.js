import React from "react";
import {Route, Routes} from "react-router-dom";
import CreateAccountWebsite from './Websites/Create Account Widget/CreateAccount';
import HomePage from './Websites/HomePage Widgets/master/HomePage';
import Login from "./Websites/Login Widgets/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Purchase from "./Websites/Purchase";
import ShoppingCart from "./Websites/Shopping Cart/ShoppingCart";
import CustomerService from "./Websites/Customer Service/CustomerService";
import NewCompany from "./Websites/Widgets For Companies/NewCompany";
import FoodSpecifics from "./Websites/Food Specific Widgets/FoodSpecifics";


const App = () => {


  return (
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/createaccount" element={<CreateAccountWebsite />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/purchase" element={<Purchase />}/>
          <Route path="/newcompany" element={<NewCompany />}/>
          <Route path="/shoppingcart" element={<ShoppingCart />}/>
          <Route path="/customerservice" element={<CustomerService />}/>
          <Route path="/foods/:id" element={<FoodSpecifics/>}/>
        </Routes>
        
      
      </div>
    
  );
}

export default App;
