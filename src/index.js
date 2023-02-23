// CLEANED

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpApi from "i18next-http-backend"

import React, {Suspense} from 'react';
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
        supportedLngs: ["ko", "en"],
        fallbackLng: "ko",
        detection: {
            caches: ["cookie"],
            order: ["cookie", "htmlTag", "localStorage", "subdomain"],
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        
    })

const loadingMarkup = (
    <div className="py-4 text-center">
        <h2>로딩중 (Loading)..</h2>
    </div>
)

// Run App with Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={loadingMarkup}>
        
        <BrowserRouter>
            <Provider store={storedRedux}>    
                <App />
            </Provider>
        </BrowserRouter>
        
    </Suspense>
    
);

