import React from "react";
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateAccountWebsite from './Websites/CreateAccount';
import HomePage from './Websites/main';
import Login from "./Websites/Login";

const App = () => {
  return (
    <Router>
      <div>

      <Routes>
        <Route exact path="/home" element={<HomePage />}/>
        <Route path="/createaccount" element={<CreateAccountWebsite />}/>
        <Route path="/login" element={<Login />}/>
      </Routes> 
      
      </div>
    </Router>
    
  );
}

export default App;
