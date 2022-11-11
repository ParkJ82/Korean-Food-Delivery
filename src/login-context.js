import {createContext} from "react";

const LoginContext = createContext({user: null, login: () => {}, 
shoppingCart: [], alterShoppingCart: () => {}, totalCost: 0, setTotalCost: () => {}});

export default LoginContext;