import {Link} from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";
import {Avatar, Box, Button, DataTable, Text} from "grommet";
import {ColumnConfig} from "grommet/components/DataTable";
import {CartProduct} from "./ProductsView";
import {EditProductQuantity} from "../components/EditProductQuantity";
import {useShoppingCart} from "../context/ShoppingCart";

const ShoppingCartView = () => {
    const {shoppingCart, removeProductFromCart, removeAllProductsFromCart} = useShoppingCart();
    const total = shoppingCart?.map((cartProduct) => cartProduct).reduce((acc, next: CartProduct) => acc + next.product.price * next.count, 0);


    const columns: ColumnConfig<CartProduct>[] = [
        {
            property: 'product',
            align: "start",
            header: <Text weight={"bold"}>Produkt</Text>,
            render: (datum: CartProduct) => (
                <Link to={`/products/${datum.product.id}`} style={{color: "black", textDecoration: "none"}}>
                    <Box direction="row" margin={"small"}>
                        <Avatar
                            round={false}
                            src={`${process.env.REACT_APP_IMG_BASE_URL}${datum.product.image}`}
                        />
                        <Box direction={"column"} margin={{horizontal: "small"}}>
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
            header: <Text weight={"bold"}>Cena</Text>,
            render: (datum: CartProduct) => (
                <Text>{datum.product.price}</Text>
            ),
        },
        {
            property: 'quantity',
            align: "center",
            header: <Text weight={"bold"}>Ilość</Text>,
            render: (datum: CartProduct) => (
                <EditProductQuantity product={datum}/>
            )
        },
        {
            property: 'total',
            align: "center",
            header: <Text weight={"bold"}>Suma</Text>,
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
            <Text alignSelf={"start"} size={"xlarge"} weight={"bold"}>Twój koszyk</Text>
            <Box align='center' border={"bottom"}>
                <DataTable sortable={true} columns={columns} data={shoppingCart} alignSelf={'center'}
                           margin={{vertical: "medium"}} pad={"small"}/>
            </Box>
            <Box direction={"row"} align="center" justify={"between"}>
                <Button label={"Wyczyść koszyk"} color={"red"} onClick={removeAllProductsFromCart}/>
                <Text weight={"bold"} margin={{right: "medium"}} size={"large"}>Suma: {total}</Text>
            </Box>
            <Box align={"end"}>
                <Link to={ROUTES.order}>
                    <Button primary={true} label={"Złóż zamówienie"}/>
                </Link>
            </Box>
        </Box>
    );
};

export default ShoppingCartView;
