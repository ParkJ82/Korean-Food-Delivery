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
import "bootstrap-icons/font/bootstrap-icons.css"
import BottomWidget from "./Websites/Global Widgets/BottomWidget";
import HomePageModal from "./Websites/HomePage Widgets/HomePageModal";
import SecurityPolicy from "./Websites/Customer Service/SecurityPolicy";
import PurchasePolicy from "./Websites/Customer Service/PurchasePolicy";
import PCICompliance from "./Websites/Customer Service/PCICompliance";
import { Helmet } from "react-helmet"




function App() {
  const { t } = useTranslation()

  const [ tokenExists, setTokenExists ] = useState(null)

  useEffect(() => {
    async function getToken() {
      let token;
      await AccountDataService.getToken()
        .then(async response => {
          token = response.data
          if (token !== "false") {
            setTokenExists("exists");
          }
        })
    }
    getToken()
  }, [])

  useEffect(() => {
    document.title = t("name")
  }, [t])
  function CreateNonLoginPrivateRoutes() {
    let authorization = {token: tokenExists}
    return (
      authorization.token ? <Navigate to="/"/> : <Outlet/>
    )
  }

  return (
      <div>

        <Helmet htmlAttributes={{
          lang: t("language")
          }}>
              <title lang={t("language")}>{t("name")}</title>  
              <meta name="description" content={t("third_line")} />
        </Helmet>
        
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
            <Route path="/pcicompliance" element={<PCICompliance />}/>
            <Route path="/securitypolicy" element={<SecurityPolicy />} />
            <Route path="/purchasepolicy" element={<PurchasePolicy />} />

  
        </Routes>

        <br />
        <br />
        <br />
        <br />

        <HomePageModal />

        <BottomWidget />
      </div>
    
  );
}

export default App;
