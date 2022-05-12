import {CartProduct} from "../views/ProductsView";
import {useState} from "react";
import {Box, Text, Button} from "grommet";

const EditProductQuantity = (props: {product: CartProduct, shoppingCart: CartProduct[], addProductToShoppingCard: (product: CartProduct) => void}) => {
    const {product, shoppingCart, addProductToShoppingCard} = props;
    const [value, setValue] = useState(product.count);

    return (
        <Box direction="row">
                    <Button label='-' onClick={() => {
                        setValue(value-1);
                        product.count = value - 1;
                        addProductToShoppingCard(product);
                    }} style={{borderRadius: "0px"}}
                            size={"small"}/>
                    <Text margin={"small"}>{value}</Text>
                    <Button label='+' onClick={() => {
                        setValue(value+1);
                        product.count = value + 1;
                        addProductToShoppingCard(product);
                    }}
                            style={{borderRadius: "0px", paddingTop: "5px", paddingBottom: '5px'}} size={"small"}/>
                </Box>
)};

export { EditProductQuantity };