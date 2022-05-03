import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  OrderView,
  ProductsView,
  ShoppingCartView,
  AddProductView,
  DeliveryView,
  AboutUsView,
  RegisterView,
} from "./views";
import Navbar from "./components/Navbar";
import ROUTES from "./utils/ROUTES.json";
import { DeliveryProvider } from "./DeliveryContext";
import "@fontsource/roboto";
import {
  Box,
  Button,
  Heading,
  Grommet,
  Collapsible,
  Main,
  Footer,
  Text,
} from "grommet";
import { Menu, FormClose } from "grommet-icons";
import { useState } from "react";
import { AppBar } from "./components/AppBar";
import "bootstrap/dist/css/bootstrap.min.css";
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "16px",
      height: "22px",
    },
  },
};

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Router>
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar flex={false}>
            <Heading level="3" margin="none">
              Fishing Store
            </Heading>
            <Button
              icon={!showSidebar ? <Menu /> : <FormClose />}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </AppBar>

          <Main overflow="auto" flex={true}>
            <Box
              direction="row"
              flex
              overflow={{ horizontal: "hidden" }}
              className="scroll-enabled"
            >
              <Box flex align="center" justify="center">
                <DeliveryProvider>
                  <Routes>
                    <Route path={ROUTES.order} element={<OrderView />}></Route>
                    <Route
                      path={ROUTES.products}
                      element={<ProductsView />}
                    ></Route>
                    <Route
                      path={ROUTES.cart}
                      element={<ShoppingCartView />}
                    ></Route>
                    <Route
                      path={ROUTES.addproduct}
                      element={<AddProductView />}
                    ></Route>
                    <Route
                      path={ROUTES.delivery}
                      element={<DeliveryView />}
                    ></Route>
                    <Route path={ROUTES.info} element={<AboutUsView />}></Route>
                    <Route
                      path={ROUTES.register}
                      element={<RegisterView />}
                    ></Route>
                  </Routes>
                </DeliveryProvider>
              </Box>
              <Collapsible direction="horizontal" open={showSidebar}>
                <Navbar />
              </Collapsible>
            </Box>
          </Main>

          <Footer background="brand" pad="medium" flex={false}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </Text>
          </Footer>
        </Box>
      </Grommet>
    </Router>
  );
};

export default App;
