import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Box } from "grommet";
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { decode } from "punycode";
import { MyToken, UserInfo } from "../typings/typings";

const UserView = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInfo>({
        username: "",
        is_superuser: false
    });
    useEffect(() => {
        try {
        const token: string = localStorage.getItem('fishingapp-user-token')!;
        const decodedToken = jwt_decode<MyToken>(token)
        console.log(decodedToken.is_superuser)
        setUser({username: decodedToken.username, is_superuser: decodedToken.is_superuser})
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <div>
            <Box>
            <h1>User info</h1>
            <p>Username:{user?.username}</p>
            <p>Is admin?: {user?.is_superuser.toString()}</p>
            </Box>
        </div>
    );
};

export default UserView;