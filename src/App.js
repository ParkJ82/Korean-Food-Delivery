import React, { useState } from "react";
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
import TopWidget from "./Websites/Global Widgets/TopWidget";


function App() {

  const [user, setUser] = React.useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setShoppingCart([]);
    setUser(null);
  }

  return (
      <div>

        {<TopWidget user={user}/>}

        <Routes>
          
          <Route exact path="/" element={(props) => (
          <HomePage {...props} user={user}/>)}
          />

          <Route path="/createaccount" element={(props) => (
          <CreateAccountWebsite {...props} login={login} />)}
          />

          <Route path="/login" element={(props) => (
          <Login {...props} login={login} />)}
          />

          <Route path="/purchase" element={(props) => (
          <Purchase {...props} user={user}/>)}
          />

          <Route path="/newcompany" element={<NewCompany />}/>

          <Route path="/shoppingcart" element={(props) => (
          <ShoppingCart {...props} user={user}/>)}
          />

          <Route path="/customerservice" element={(props) => (
          <CustomerService {...props} user={user}/>)}
          />

          <Route path="/foods/:id" element={(props) => (
          <FoodSpecifics {...props} user={user}/>)}
          />

        </Routes>
        
      
      </div>
    
  );
}

export default App;
