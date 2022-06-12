// import { useState } from "react";
import React from "react";
import { Text, Box, Button, Menu, Heading, Tag, Layer } from "grommet";
import { DeliveryContext } from "../context/DeliveryContext";
import DeliveryForm from "../components/DeliveryForm";
import { Link } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

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

  const { deliveryDetails, setDeliveryDetails } = React.useContext(DeliveryContext);

  React.useEffect(() => {
    const win = window as any;
    win.handlePickedPoint = (point: any) => {
      console.log({ point, deliveryDetails });
      setDeliveryDetails({ ...deliveryDetails, inpostDetails: point, deliveryType: DeliveryType.InPost });
      setShow(false);
    }
  }, [deliveryDetails]);

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

  const allDetailsInserted = () => {
    if (deliveryType === DeliveryType.InPost && !inpostDetails)
      return false;
    const { name, surname, email, address } = deliveryDetails;
    return name !== "" && surname !== "" && email !== "" && address !== "";
  };

  return (
    <Box width="large" pad="medium" gap="medium" wrap>
      <Box pad="medium" width="medium" gap="medium">
        <Heading level={3}>Enter your details</Heading>
        <DeliveryForm />
      </Box>

      <Box pad="medium" gap="small" width="medium">
        <Heading level={2}>Delivery type</Heading>
        <Box direction="row" width="large">
          <Menu
            size="large"
            label={deliveryType}
            items={[
              { label: DeliveryType.Home, onClick: () => setDeliveryDetails({ ...deliveryDetails, deliveryType: DeliveryType.Home }) },
              { label: DeliveryType.InPost, onClick: () => setDeliveryDetails({ ...deliveryDetails, deliveryType: DeliveryType.InPost }) },
              { label: DeliveryType.Store, onClick: () => setDeliveryDetails({ ...deliveryDetails, deliveryType: DeliveryType.Store }) },
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
          <Box gap="small">
            <Heading level={3}>Delivery point</Heading>
            <Tag name="Name" value={inpostDetails.name} />
            <Tag name="Address" value={`${inpostDetails?.address_details?.city}, ${inpostDetails?.address?.line1}`} />
          </Box>
        )}
      </Box>


      <Box width="medium" pad="medium">
        <Heading level={2}>Payment method</Heading>
        <Menu
          size="large"
          label={paymentType}
          items={[
            { label: PaymentType.Card, onClick: () => setDeliveryDetails({ ...deliveryDetails, paymentType: PaymentType.Card }) },
            { label: PaymentType.Blik, onClick: () => setDeliveryDetails({ ...deliveryDetails, paymentType: PaymentType.Blik }) },
          ]}
        />

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

      <Box direction={"row"} align="center" justify={"around"}>
        <Link to={ROUTES.cart}>
          <Button label={"Go back"} />
        </Link>
        {
          allDetailsInserted() ? (
            <Link to={ROUTES.order}>
              <Button primary={true} label={"Confirm details"} />
            </Link>
          ) :
            <Button active={false} label={"Confirm details"} />
        }
      </Box>
    </Box>
  );
};

export default DeliveryView;
