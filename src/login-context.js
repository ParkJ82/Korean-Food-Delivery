import {createContext} from "react";

const LoginContext = createContext({user: null, login: () => {}, 
shoppingCart: [], alterShoppingCart: () => {}});

export default LoginContext;