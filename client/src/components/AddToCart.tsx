import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCart";
import { Box, TextInput } from "grommet";

const AddToCart = (props: { product: Product }) => {
    const { product } = props;
    const { addProductToShoppingCard } = useShoppingCart();
    const [value, setValue] = useState(0);

    return (
        <Box direction="row-responsive" gap="small">
            <TextInput
                value={value}
                type="number"
                onChange={(event) => {
                    const newValue = +event.target.value;

                    if (newValue > product.count)
                        setValue(product.count);
                    else if (newValue < 0)
                        setValue(0);
                    else
                        setValue(newValue);
                }}
            />
            <Button
                variant="primary"
                style={{ margin: 10 }}
                disabled={(value <= 0) || (value > product.count)}
                onClick={() => addProductToShoppingCard({ count: value, product })}
            >
                Add to cart
            </Button>
        </Box>
    )
};

export { AddToCart };