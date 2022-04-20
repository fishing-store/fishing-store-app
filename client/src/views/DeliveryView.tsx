// import { useState } from "react";
import React from "react";
import { FormField, TextInput, Box, Button, Form } from "grommet";
import { DeliveryContext } from "../DeliveryContext";

const DeliveryView = () => {
  const context = React.useContext(DeliveryContext);
  return (
    <Form
      value={context.deliveryDetails}
      onReset={value => context.setDeliveryDetails({})}
      onChange={(value) => {
        context.setDeliveryDetails(value);
      }}
    >
      <FormField name="name" htmlFor="text-input-id" label="Name">
        <TextInput id="text-input-id" name="name" />
      </FormField>
      <FormField name="surname" htmlFor="text-input-id" label="Surname">
        <TextInput id="text-input-id" name="surname" />
      </FormField>
      <FormField name="address" htmlFor="text-input-id" label="Address">
        <TextInput id="text-input-id" name="address" />
      </FormField>
      <FormField name="telephone" htmlFor="text-input-id" label="Telephone">
        <TextInput id="text-input-id" name="telephone" />
      </FormField>
      <FormField name="email" htmlFor="text-input-id" label="Email">
        <TextInput id="text-input-id" name="email" />
      </FormField>
    </Form>
  );
};

export default DeliveryView;
