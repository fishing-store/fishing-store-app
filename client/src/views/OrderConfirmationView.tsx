import { Box, Button, DataTable, Text } from "grommet";
import { ColumnConfig } from "grommet/components/DataTable";
import { useEffect, useState } from "react";
import { api } from "../api";
import jwt_decode from 'jwt-decode'
import {useParams} from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

const OrderConfirmationView = () => {
    const [orders, setOrders] = useState<Orders[]>();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    useEffect(() => {
        try {
            const token: string = localStorage.getItem('fishingapp-user-token')!;
            // const decodedToken = jwt_decode<MyToken>(token);

            api.get(`/order-status/${id}`).then(response => {
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    enqueueSnackbar("Couldn't retrieve order information", { variant: "warning" });
                }
            }).catch(error => console.warn(error));
        } catch (error) {
            enqueueSnackbar("Unexpected error occurred", { variant: "error" });
        }
    }, []);

    const columns: ColumnConfig<Orders>[] = [
        {
            property: 'id',
            align: "center",
            header: <Text weight={"bold"}>ID</Text>,
            render: (datum: Orders) => (
                <Text>{datum.id}</Text>
            ),
        },
        {
            property: 'status',
            align: "center",
            header: <Text weight={"bold"}>Status</Text>,
            render: (datum: Orders) => (
                <Text>{datum.status}</Text>
            ),
        },
    ];

    return (
        <div>
            <strong>Your order has been successfully received!</strong>

            <Box pad="medium" gap="medium" wrap>
                <Box align='center' border={"bottom"}>
                    <DataTable
                        sortable={true}
                        columns={columns}
                        data={orders}
                        alignSelf={'center'}
                        margin={{ vertical: "medium" }}
                        pad={"small"}
                    />
                </Box>
                <Link to={ROUTES.default}>
                    <Button primary={true} label={"Go to payment"} />
                </Link>
            </Box>
        </div>
    );
};

export default OrderConfirmationView;
