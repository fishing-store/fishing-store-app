import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useSnackbar } from 'notistack';

const LoginView = ({loginCallback}: {loginCallback: () => void}) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [login, setLogging] = useState<LoginForm>({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogging((login) => ({
          ...login,
          [e.target.name]: e.target.value,
        }));
      };

    const sendLogin = (e: React.FormEvent) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", login.username.toString());
        formData.append("password", login.password.toString());

        axios.post(process.env.REACT_APP_API_URL + "/login/", formData).then((resp) => {
            console.log(resp);
            localStorage.setItem('fishingapp-user-token', resp.data.access);
            const decodedToken = jwt_decode<MyToken>(resp.data.access)
            localStorage.setItem('is_superuser', String(decodedToken.is_superuser));

            enqueueSnackbar("Login successful", { variant: "success" });
            loginCallback();
            navigate("/");
        }).catch((err) => {
            console.log(err);
            if (err.response)
                enqueueSnackbar(err.response.data.detail, { variant: "error" });
            else
                enqueueSnackbar(err.toString(), { variant: "error" });

        })

    }

    return (
        <div>
        <Form onSubmit={sendLogin}>
            <h1>Login form</h1>
            <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password (min 8 characters)</Form.Label>
                    <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
        </div>
    );
};

export default LoginView;