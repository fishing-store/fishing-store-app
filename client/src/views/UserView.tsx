import { useState, useEffect } from "react";
import { Box, Text } from "grommet";
import jwt_decode from 'jwt-decode'
import UserOrdersView from "./UserOrdersView";

const UserView = () => {
    const [user, setUser] = useState<UserInfo>({
        username: "",
        is_superuser: false
    });
    useEffect(() => {
        try {
        const token: string = localStorage.getItem('fishingapp-user-token')!;
        const decodedToken = jwt_decode<MyToken>(token)
        setUser({username: decodedToken.username, is_superuser: decodedToken.is_superuser})
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <Box>
            <Box align='center' pad="xlarge" >
            <h1>User information</h1>
            <Text>Username: <b>{user?.username}</b></Text>
            <Text>Is admin?: <b>{user?.is_superuser.toString()}</b></Text>
            </Box>
            <UserOrdersView/>
        </Box>
    );
};

export default UserView;