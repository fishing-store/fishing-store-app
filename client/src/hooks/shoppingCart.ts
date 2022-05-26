import {useEffect, useState} from "react";
import { Product } from "../typings/typings";

interface CartProduct {
    count: number;
    product: Product;
}

export type UseShoppingCartResult = {
    shoppingCart: CartProduct[],
    addProductToShoppingCard: (product: CartProduct) => void,
    removeProductFromCart: (productId: string) => void,
    removeAllProductsFromCart: () => void
}

export const useShoppingCartLogic = (): UseShoppingCartResult => {
    const [shoppingCart, setShoppingCart] = useState<CartProduct[]>(JSON.parse(localStorage.getItem('shopping-cart') as string) ?? []);

    useEffect(() => {
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }, [shoppingCart]);

    const addProductToShoppingCard = (product: CartProduct) => {
        const foundIndex = shoppingCart.findIndex((prod: CartProduct) => product.product.id === prod.product.id);
        if (!product.count) {
            return;
        }
        if (foundIndex >= 0) {
            shoppingCart[foundIndex] = product;
            setShoppingCart([...shoppingCart]);
        } else {
            setShoppingCart([...shoppingCart, product]);
        }
    }

    const removeAllProductsFromCart = () => {
        setShoppingCart([]);
    };

    const removeProductFromCart = (productId: string) => {
        const newProducts = shoppingCart.filter((prod: CartProduct) => prod.product.id !== productId);
        setShoppingCart([...newProducts]);
    }
    return {
        shoppingCart,
        addProductToShoppingCard,
        removeAllProductsFromCart,
        removeProductFromCart
    }
}