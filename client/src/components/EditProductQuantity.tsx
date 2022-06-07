import {CartProduct} from "../views/ProductsView";
import {useState} from "react";
import {Box, Button, Text} from "grommet";
import {useShoppingCart} from "../context/ShoppingCart";

const EditProductQuantity = (props: {product: CartProduct}) => {
    const {product} = props;
    const {addProductToShoppingCard} = useShoppingCart();
    const [value, setValue] = useState(product.count);

    const changeProductQuantity = (quantity : number) => {
        setValue(value + quantity);
        product.count = value + quantity;
        addProductToShoppingCard(product);
    }

    return (
        <Box direction="row">
            <Button label='-' onClick={() => changeProductQuantity(-1)}
                    disabled={value <= 1}
                    style={{borderRadius: "0px"}}
                    size={"small"}/>
            <Text margin={"small"}>{value}</Text>
            <Button label='+' onClick={() => changeProductQuantity(1)}
                    disabled={value >= product.product.count}
                    style={{borderRadius: "0px"}} size={"small"}/>
        </Box>
)};

export { EditProductQuantity };