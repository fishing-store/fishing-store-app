// import { useState } from "react";
import React from "react";
import { FormField, Text, Box, Button, Menu, Heading, Tag, Layer, Card, CardHeader, CardBody } from "grommet";
import { DeliveryContext } from "../DeliveryContext";
import DeliveryForm from "../components/DeliveryForm";


enum DeliveryType {
  Store = "In Store",
  InPost = "InPost",
  Home = "Home",
};

const DeliveryView = () => {
  const [deliveryType, setDeliveryType] = React.useState(DeliveryType.Home);
  const [inpostDetails, setInpostDetails] = React.useState(null as any);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const win = window as any;
    win.handlePickedPoint = (point: any) => {
      console.log(point);
      setInpostDetails(point);
      setShow(false);
    }
  }, []);

  React.useEffect(() => {

    const cleanup = () => { document.getElementById("map_script")?.remove(); };

    if (show) {
      cleanup();
      const script = document.createElement('script');
      script.src = "https://geowidget.easypack24.net/js/sdk-for-javascript.js";
      script.async = true;
      script.setAttribute("id", "map_script");
      document.body.appendChild(script);
    }

    return cleanup;
  }, [show]);

  return (
    <Box fill={true} pad="large">
      <Heading level={1}>Delivery</Heading>
      <Heading level={3}>Enter your details</Heading>
      <Box direction="column" width="large" margin="medium">
        <DeliveryForm />
      </Box>

      <Heading level={3}>Choose delivery type</Heading>
      <Box direction="row" width="large" margin="medium">
        <Menu
          label={deliveryType}
          items={[
            { label: 'Home delivery', onClick: () => setDeliveryType(DeliveryType.Home) },
            { label: 'Delivery via InPost', onClick: () => setDeliveryType(DeliveryType.InPost) },
            { label: 'In store pickup', onClick: () => setDeliveryType(DeliveryType.Store) },
          ]}
        />
        {deliveryType === DeliveryType.InPost && <Button label="Pick delivery point" onClick={() => setShow(true)}/>}
      </Box>

      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          full={true}
        >
          <Box id="easypack-map"></Box>
        </Layer>
      )}

      {deliveryType === DeliveryType.Store && (
        <Text>
          You can pick up your order in store at the following address: <br/>
          <strong>Władysława Reymonta 19, 30-059 Kraków</strong>
        </Text>
      )}

      {deliveryType === DeliveryType.InPost && inpostDetails && (
        <Card gap="medium" background="light-1" pad="medium">
          <CardHeader>
            <Heading level={3}>Delivery point</Heading>
          </CardHeader>
          <CardBody gap="small">
            <Tag name="Name" value={inpostDetails.name} />
            <Tag name="Address" value={`${inpostDetails?.address_details?.city}, ${inpostDetails?.address?.line1}`} />
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default DeliveryView;
