import { FormField, TextInput, Box, Button, Form } from "grommet";
import type { FormEvent, FormEventHandler } from 'react';
import { api } from "../api";


const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    var { username, password, password2, email } = e.target as typeof e.target & {
        username: {value: string}
        password: {value: string}
        password2: {value: string}
        email: {value: string}
    }

    console.log(username.value, password.value, password2.value, email.value)

    api.post("/register/",{
        username: username.value,
        password: password.value,
        password2: password2.value,
        email: email.value
    }).then((response) => {
        console.log(response);
        username.value = ''
        password.value = ''
        password2.value = ''
        email.value = ''
    }, (error) => {
        console.log(error);
    });
}

const RegisterView = () => {
    return(
        <div>
        {/* <Form onSubmit={evt => registerUser }>
           <FormField name="username" htmlFor="username-input-id" label="Username">
           <TextInput type="text" id="username-input-id" name="name" />
           </FormField>
           <FormField name="email" htmlFor="email-input-id" label="Email">
           <TextInput type="email" id="email-input-id" name="name" />
           </FormField>
           <FormField name="password" htmlFor="password-input-id" label="Enter your password:">
           <TextInput type="password" id="password-input-id" name="password" />
           </FormField>
           <FormField name="password2" htmlFor="password2-input-id" label="Confirm your password:">
           <TextInput type="password" id="password2-input-id" name="password2" />
           </FormField>
           <Button type="submit" primary label="Register"/>
        </Form> */}
        <form onSubmit={evt => {registerUser(evt)} }>
            <fieldset>
                <label>Username</label>
                <input type="text" id="username"/>
            </fieldset>
            <fieldset>
                <label>Email</label>
                <input type="email" id="email"/>
            </fieldset>
            <fieldset>
                <label>Username</label>
                <input type="password" id="password"/>
            </fieldset>
            <fieldset>
                <label>Username</label>
                <input type="password" id="password2"/>
            </fieldset>
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default RegisterView;