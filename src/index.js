// CLEANED

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpApi from "i18next-http-backend"

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import storedRedux from "./redux/store/store";


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ["kr", "en"],
        fallbackLng: "kr",
        detection: {
            caches: ["cookie"],
            order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        react: { useSuspense: false },
        
    })

// Run App with Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <Provider store={storedRedux}>
            <App />
        </Provider>
    </BrowserRouter>
);

