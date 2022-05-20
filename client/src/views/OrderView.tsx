import React from "react";
import { Box, Button, Heading, Table, TableBody, TableCell, TableHeader, TableRow, Tag, Text } from "grommet";
import { DeliveryContext, DeliveryType } from "../context/DeliveryContext";
import { useShoppingCart } from "../context/ShoppingCart";
import { Link } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

const OrderView = () => {

    const { deliveryDetails } = React.useContext(DeliveryContext);
    const { deliveryType, inpostDetails } = deliveryDetails;
    const { name, surname, address, telephone, email } = deliveryDetails;

    const { shoppingCart } = useShoppingCart();

    const calculateTotalCost = () => shoppingCart.reduce((acc, item) => acc + item.product.price * item.count, 0);

    return (
        <Box width="large" pad="medium" gap="medium" wrap>
            <Heading level={2}>Confirm order</Heading>

            <Box pad="medium" width="medium" gap="medium">
                <Heading level={3}>Items</Heading>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" border="bottom">
                                Name
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                Count
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                Unit cost
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                Total cost
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            shoppingCart.map(item =>
                                <TableRow key={item.product.id}>
                                    <TableCell><strong>{item.product.name}</strong></TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell>{`${item.product.price} PLN`}</TableCell>
                                    <TableCell>{`${item.product.price * item.count} PLN`}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>

                <Tag name="Total" value={`${calculateTotalCost()} PLN`} />
            </Box>

            <Box pad="medium" width="medium" gap="medium">
                <Heading level={3}>Contact information</Heading>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Surname</strong></TableCell>
                            <TableCell><strong>{surname}</strong></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Telephone</strong></TableCell>
                            <TableCell>{telephone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>{email}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>


            <Box pad="medium" width="medium" gap="medium">
                <Heading level={3}>Delivery point</Heading>
                {deliveryType === DeliveryType.Store && (
                    <Box>
                        <Heading level={4}>In-store pickup</Heading>
                        <Text>
                            You can pick up your order in store at the following address: <br />
                            <strong>Władysława Reymonta 19, 30-059 Kraków</strong>
                        </Text>
                    </Box>
                )}


                {deliveryType === DeliveryType.Home && (
                    <Box>
                        <Heading level={4}>Home delivery</Heading>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Addres</strong></TableCell>
                                    <TableCell><strong>{address}</strong></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                )}

                {deliveryType === DeliveryType.InPost && inpostDetails && (
                    <Box gap="small">
                        <Heading level={4}>Inpost</Heading>
                        <Tag name="Name" value={inpostDetails.name} />
                        <Tag name="Address" value={`${inpostDetails?.address_details?.city}, ${inpostDetails?.address?.line1}`} />
                    </Box>
                )}
            </Box>

            <Box width="medium" pad="medium">
                <Link to={ROUTES.order}>
                    <Button primary={true} label={"Confirm order"}/>
                </Link>
            </Box>
        </Box>
    );
};

export default OrderView;
