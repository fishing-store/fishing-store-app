import React from "react";
import { Box, Heading } from "grommet";
import { DeliveryContext } from "../context/DeliveryContext";
import { useShoppingCart } from "../context/ShoppingCart";


const OrderView = () => {

    const { deliveryDetails } = React.useContext(DeliveryContext);
    const { deliveryType, paymentType, inpostDetails } = deliveryDetails;

    const { shoppingCart } = useShoppingCart();

    return (
        <Box width="large" pad="medium" gap="medium" wrap>
            <Box pad="medium" width="medium" gap="medium">
                <Heading level={2}>Confirm order</Heading>
            </Box>

            <Box pad="medium" width="medium" gap="medium">
                <Heading level={3}>Items</Heading>
                {
                    shoppingCart.map(item =>
                        <Box key={item.product.id}>
                            <p>{item.product.name}</p>
                            <p>{item.product.price} x {item.count}</p>
                            <p>Total: {item.product.price * item.count}</p>
                        </Box>
                    )
                }
            </Box>

            <Box pad="medium" width="medium" gap="medium">
                <Heading level={3}>Delivery details</Heading>
                <p>Delivery type: {deliveryType}</p>
                <p>Payment type: {paymentType}</p>
            </Box>

        </Box>
    );
};

export default OrderView;
