import {Link} from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";
import {useEffect, useState} from "react";
import {api} from "../api";
import {Box, Image, Text, DataTable, Button, Avatar} from "grommet";
import {ColumnConfig} from "grommet/components/DataTable";

const ShoppingCartView = () => {
    const [products, setProduct] = useState<Product[]>();
    useEffect(() => {
        const fetchData = () => {
            api.get(`/products/ce339b9a-e80e-4dae-9780-94766df90e80`).then(({data}) => setProduct([data, data]));

        };
        fetchData();
    }, [])

    const total = products?.map((product: { price: number; }) => product.price).reduce((prev: number, next: number) => prev + next);

    const columns: ColumnConfig<Product>[] = [
        {
            property: 'product',
            align: "start",
            header: <Text weight={"bold"}>Produkt</Text>,
            render: (datum: Product) => (
                <Link to={`/products/${datum?.id}`} style={{color: "black", textDecoration: "none"}}>
                    <Box direction="row" margin={"small"}>
                        <Avatar
                            round={false}
                            src={`${process.env.REACT_APP_IMG_BASE_URL}${datum.image}`}
                        />
                        <Box direction={"column"} margin={{horizontal: "small"}}>
                            <Text weight={"bold"}>{datum.name}</Text>
                            <Text weight={"lighter"} size={"small"}>{datum.description}</Text>
                        </Box>
                    </Box>
                </Link>
            ),
        },
        {
            property: 'price',
            align: "center",
            header: <Text weight={"bold"}>Cena</Text>,
        },
        {
            property: 'quantity',
            align: "center",
            header: <Text weight={"bold"}>Ilość</Text>,
            render: (datum: Product) => (
                <Box direction="row">
                    <Button label='-' onClick={() => {
                    }} style={{borderRadius: "0px"}} size={"small"}/>
                    <Text margin={"small"}>1</Text>
                    <Button label='+' onClick={() => {
                    }} style={{borderRadius: "0px", paddingTop: "5px", paddingBottom: '5px'}} size={"small"}/>
                </Box>
            )
        },
        {
            property: 'total',
            align: "center",
            header: <Text weight={"bold"}>Suma</Text>,
            render: (datum: Product) => (
                <Text>{datum.price}</Text>
            )
        },
    ];

    return (
        <Box pad="medium" gap="medium" wrap>
            <Text alignSelf={"start"} size={"xlarge"} weight={"bold"}>Twój koszyk</Text>
            <Box align='center' border={"bottom"}>
                <DataTable sortable={true} columns={columns} data={products} alignSelf={'center'}
                           margin={{vertical: "medium"}} pad={"small"}/>
            </Box>
            <Box direction={"row"} align="center" justify={"between"}>
                <Button label={"Wyczyść koszyk"} color={"red"}/>
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
