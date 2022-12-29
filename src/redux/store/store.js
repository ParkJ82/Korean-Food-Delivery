import { configureStore } from "@reduxjs/toolkit";
import allReducers from "../reducers";
import AccountDataService from "../../services/account";

const storedRedux = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: {
            extraArgument: { AccountDataService }
        }
   })
})

export default storedRedux