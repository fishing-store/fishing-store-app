import { Link } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";
import { Avatar, Box, Button, DataTable, Text } from "grommet";
import { ColumnConfig } from "grommet/components/DataTable";
import { CartProduct } from "./ProductsView";
import { EditProductQuantity } from "../components/EditProductQuantity";
import { useShoppingCart } from "../context/ShoppingCart";

const ShoppingCartView = () => {
    const { shoppingCart, removeProductFromCart, removeAllProductsFromCart } = useShoppingCart();
    const total = shoppingCart?.map((cartProduct) => cartProduct).reduce((acc, next: CartProduct) => acc + next.product.price * next.count, 0);


    const columns: ColumnConfig<CartProduct>[] = [
        {
            property: 'product',
            align: "start",
            header: <Text weight={"bold"}>Product</Text>,
            render: (datum: CartProduct) => (
                <Link to={`/products/${datum.product.id}`} style={{ color: "black", textDecoration: "none" }}>
                    <Box direction="row" margin={"small"}>
                        <Avatar
                            round={false}
                            src={`${process.env.REACT_APP_IMG_BASE_URL}${datum.product.image}`}
                        />
                        <Box direction={"column"} margin={{ horizontal: "small" }}>
                            <Text weight={"bold"}>{datum.product.name}</Text>
                            <Text weight={"lighter"} size={"small"}>{datum.product.description}</Text>
                        </Box>
                    </Box>
                </Link>
            ),
        },
        {
            property: 'price',
            align: "center",
            header: <Text weight={"bold"}>Unit price</Text>,
            render: (datum: CartProduct) => (
                <Text>{datum.product.price}</Text>
            ),
        },
        {
            property: 'quantity',
            align: "center",
            header: <Text weight={"bold"}>Count</Text>,
            render: (datum: CartProduct) => (
                <EditProductQuantity product={datum} />
            )
        },
        {
            property: 'total',
            align: "center",
            header: <Text weight={"bold"}>Total</Text>,
            render: (datum: CartProduct) => (
                <Text>{datum.product.price * datum.count}</Text>
            )
        },
        {
            property: 'remove',
            align: "center",
            render: (datum: CartProduct) => (
                <Button color={"red"} onClick={() => removeProductFromCart(datum.product.id)}>X</Button>
            )
        },
    ];

    return (
        <Box pad="medium" gap="medium" wrap>
            <Text alignSelf={"start"} size={"xlarge"} weight={"bold"}>Your cart</Text>
            {
                shoppingCart.length > 0 ? (
                    <Box pad="medium" gap="medium" wrap>
                        <Box align='center' border={"bottom"}>
                            <DataTable
                                sortable={true}
                                columns={columns}
                                data={shoppingCart}
                                alignSelf={'center'}
                                margin={{ vertical: "medium" }}
                                pad={"small"}
                            />
                        </Box>
                        <Box direction={"row"} align="center" justify={"around"}>
                            <Button label={"Clear cart"} color={"red"} onClick={removeAllProductsFromCart} />
                            <Text weight={"bold"} margin={{ right: "medium" }} size={"large"}>Total: {total}</Text>
                        </Box>
                    </Box>
                ) : <Text size="large" alignSelf={'center'}>Your cart is empty</Text>
            }

            <Box align={"end"}>
                {
                    shoppingCart.length > 0 ? (
                        <Link to={ROUTES.delivery}>
                            <Button primary={true} label={"Submit order"} />
                        </Link>
                    ) : <Button active={false} label={"Submit order"} />
                }
            </Box>
        </Box>
    );
};

export default ShoppingCartView;
