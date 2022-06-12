import React, { useState } from "react";
// import { api } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useSnackbar } from 'notistack';

const RegisterView = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [register, setRegistration] = useState<RegisterForm>({
        username: "",
        password: "",
        password2: "",
        email: "",
        number: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistration((register) => ({
          ...register,
          [e.target.name]: e.target.value,
        }));
      };

    const sendRegister = (e: React.FormEvent) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("username", register.username.toString());
        formData.append("password", register.password.toString());
        formData.append("password2", register.password2.toString());
        formData.append("email", register.email.toString());
        formData.append("number", register.number.toString());

        let userData = new FormData();
        userData.append("username", register.username.toString());
        userData.append("email", register.email.toString());
        userData.append("number", register.number.toString());


        axios.post(process.env.REACT_APP_API_URL + "/register/", formData).then(async (resp) => {
            console.log(resp)
            enqueueSnackbar("Registration successful", { variant: "success" });
            enqueueSnackbar("Now you can log in to your new account", { variant: "info", autoHideDuration: 10000 });
            navigate("/login");
        }).catch((err) => {
            console.log(err.response)
            enqueueSnackbar(err.response.request.response, { variant: "error" });
        })
        
        axios.post(process.env.REACT_APP_API_URL + "/users/", userData).then(async (resp) => {
        }).catch((err) => {
            console.log(err.response)
            enqueueSnackbar(err.response.request.response, { variant: "error" });
        })

    }

    return (
        <div>
        <Form onSubmit={sendRegister}>
            <h1>Register form</h1>
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

            <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                    name="password2"
                    type="password"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="number">
                    <Form.Label>Enter your phone number</Form.Label>
                    <Form.Control
                    name="number"
                    type="number"
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
        </div>
    );
};

export default RegisterView;