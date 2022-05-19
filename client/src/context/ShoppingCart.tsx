import {useShoppingCartLogic, UseShoppingCartResult} from "../hooks/shoppingCart";
import React, {useContext} from "react";


const ShoppingCartContext = React.createContext<UseShoppingCartResult>({
    shoppingCart: [],
    addProductToShoppingCard: () => null,
    removeAllProductsFromCart: () => null,
    removeProductFromCart: () => null,
})

export const ShoppingCartProvider: React.FC = ({children}) => {
    const shoppingCart = useShoppingCartLogic();
    return <ShoppingCartContext.Provider value={shoppingCart}>{children}</ShoppingCartContext.Provider>
}

export const useShoppingCart = () => useContext(ShoppingCartContext);