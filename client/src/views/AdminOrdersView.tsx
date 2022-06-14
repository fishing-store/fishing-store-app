import {Box, DataTable, Text, Select} from "grommet";
import {ColumnConfig} from "grommet/components/DataTable";
import {useEffect, useState} from "react";
import {api} from "../api";
import ROUTES from "../utils/ROUTES.json";

const AdminOrdersView = () => {
    const [orders, setOrders] = useState<Orders[]>();

    useEffect(() => {
        api.get("/adminOrders/").then(({data}) => {
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
            render: (datum: Orders) => {

                return (<Select
      options={['New', 'Sent', 'Closed']}
      value={datum.status}
      onChange={({ option }) => {
          setOrders(prevState => {
              const newState = prevState?.map(order => {
                  if(order.id === datum.id){
                      return {...order, status: option}
                  }
                  return order;
              });
              return newState;
          })
          const formData = new FormData()
          formData.append("status", "Sent");
          api.post(`change-order-state/${datum.id}`, {"status": option}).then((response) => {
      console.log({response});
      if (response.status === 201) {
        console.log("SUCCESS")
      }
      else
        console.log("ERROR")
    });
      }
      }
    />)
            }
        },
        {
            property: 'user',
            align: "center",
            header: <Text weight={"bold"}>User</Text>,
            render: (datum: Orders) => (
                <Text>{datum.email}</Text>
            )
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
                <Text weight={"bold"} size={"xxlarge"}>All orders</Text>
                <DataTable sortable={true} columns={columns} data={orders} alignSelf={'center'}
                           margin={{vertical: "medium"}} pad={"small"}/>
            </Box>
        </Box>
    );
};

export default AdminOrdersView;