import {Box, DataTable, Text} from "grommet";
import {ColumnConfig} from "grommet/components/DataTable";
import {useEffect, useState} from "react";
import {api} from "../api";
import jwt_decode from 'jwt-decode'

const UserOrdersView = () => {
    const [orders, setOrders] = useState<Orders[]>();

    useEffect(() => {
		const token: string = localStorage.getItem('fishingapp-user-token')!;
        const decodedToken = jwt_decode<MyToken>(token)
        api.get(`/userOrders/${decodedToken.email}`).then(({data}) => {
            setOrders(data);
        });
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
        {
            property: 'delivery',
            align: "center",
            header: <Text weight={"bold"}>Delivery</Text>,
            render: (datum: Orders) => (
                <Text>{datum.deliveryType}</Text>
            )
        },
        {
            property: 'totalCost',
            align: "center",
            header: <Text weight={"bold"}>Total cost</Text>,
            render: (datum: Orders) => (
                <Text>{datum.totalCost}</Text>
            )
        },
    ];

    return (
        <Box pad="medium" gap="medium" wrap>
            <Box align='center' border={"bottom"}>
                <DataTable sortable={true} columns={columns} data={orders} alignSelf={'center'}
                           margin={{vertical: "medium"}} pad={"small"}/>
            </Box>
        </Box>
    );
};

export default UserOrdersView;