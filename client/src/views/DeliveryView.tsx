// import { useState } from "react";
import React from "react";
import { Text, Box, Button, Menu, Heading, Tag, Layer, Card, CardHeader, CardBody } from "grommet";
import { DeliveryContext } from "../DeliveryContext";
import DeliveryForm from "../components/DeliveryForm";

enum DeliveryType {
  Store = "In store pick-up",
  InPost = "InPost delivery",
  Home = "Home delivery",
};

enum PaymentType {
  Card = "Visa / Mastercard",
  Blik = "Blik",
};

const DeliveryView = () => {
  const [show, setShow] = React.useState(false);

  const {deliveryDetails, setDeliveryDetails} = React.useContext(DeliveryContext);
  
  React.useEffect(() => {
    const win = window as any;
    win.handlePickedPoint = (point: any) => {
      console.log(point);
      setDeliveryDetails({...deliveryDetails, inpostDetails: point});
      setShow(false);
    }
  }, []);
  
  const deliveryType = deliveryDetails.deliveryType;
  const paymentType = deliveryDetails.paymentType;
  const inpostDetails = deliveryDetails.inpostDetails;

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
    <Box fill={true} pad="large" gap="medium">
      <Box width="large">
        <Heading level={2}>Delivery</Heading>
        <Heading level={3}>Enter your details</Heading>
        <DeliveryForm />

        <Heading level={3}>Choose delivery type</Heading>
        <Box direction="row" width="large" margin="medium">
          <Menu
            label={deliveryType}
            items={[
              { label: DeliveryType.Home, onClick: () => setDeliveryDetails({...deliveryDetails, deliveryType: DeliveryType.Home}) },
              { label: DeliveryType.InPost, onClick: () => setDeliveryDetails({...deliveryDetails, deliveryType: DeliveryType.InPost}) },
              { label: DeliveryType.Store, onClick: () => setDeliveryDetails({...deliveryDetails, deliveryType: DeliveryType.Store}) },
            ]}
          />
          {deliveryType === DeliveryType.InPost && <Button label="Pick delivery point" onClick={() => setShow(true)} />}
        </Box>

        {deliveryType === DeliveryType.Store && (
          <Text>
            You can pick up your order in store at the following address: <br />
            <strong>Władysława Reymonta 19, 30-059 Kraków</strong>
          </Text>
        )}


        {deliveryType === DeliveryType.Home && (
          <Text>
            Package will be delivered to address entered above.
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

      <Box>
        <Heading level={2}>Payment</Heading>
        <Box direction="row" width="large" margin="medium">
          <Menu
            label={paymentType}
            items={[
              { label: PaymentType.Card, onClick: () => setDeliveryDetails({...deliveryDetails, paymentType: PaymentType.Card}) },
              { label: PaymentType.Blik, onClick: () => setDeliveryDetails({...deliveryDetails, paymentType: PaymentType.Blik}) },
            ]}
          />
        </Box>
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
    </Box>
  );
};

export default DeliveryView;
