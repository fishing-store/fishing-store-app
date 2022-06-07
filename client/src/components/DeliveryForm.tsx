// import { useState } from "react";
import React from "react";
import { FormField, TextInput, Form } from "grommet";
import { DeliveryContext } from "../context/DeliveryContext";
const DeliveryForm = () => {
    const context = React.useContext(DeliveryContext);
    return (
        <Form
            value={context.deliveryDetails}
            onReset={value => context.setDeliveryDetails({})}
            onChange={(value) => {
                context.setDeliveryDetails(value);
            }}
        >
            <FormField name="name" htmlFor="text-input-id" label="First name" required>
                <TextInput id="text-input-id" name="name" />
            </FormField>
            <FormField name="surname" htmlFor="text-input-id" label="Last name" required>
                <TextInput id="text-input-id" name="surname" />
            </FormField>
            <FormField name="address" htmlFor="text-input-id" label="Address" required>
                <TextInput id="text-input-id" name="address" />
            </FormField>
            <FormField name="telephone" htmlFor="text-input-id" label="Telephone" required>
                <TextInput id="text-input-id" name="telephone" />
            </FormField>
            <FormField name="email" htmlFor="text-input-id" label="Email" required>
                <TextInput id="text-input-id" name="email" />
            </FormField>
        </Form>
    );
};

export default DeliveryForm;
