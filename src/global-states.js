import React from "react";
const globalContext = React.createContext({
    shoppingCartList: [], setShoppingCartList: () => {},
    addToShoppingCart: () => {},
    dynamicShoppingCart: {}, setDynamicShoppingCart: () => {}
})

export default globalContext;