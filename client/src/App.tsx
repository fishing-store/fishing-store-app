import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import {
  OrderView,
  ProductsView,
  ShoppingCartView,
  AddProductView,
  DeliveryView,
  AboutUsView,
  ProductDetailsView,
  EditProductView,
  RegisterView,
  LoginView,
  UserView,
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
import "react-bootstrap-typeahead/css/Typeahead.css";
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

  const ProductWrapper = () => {
    const { id } = useParams();
    return <ProductDetailsView id={Number(id)} />
  };

  const EditProductWrapper = () => {
    const { id } = useParams();
    return <EditProductView id={Number(id)} />
  };

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
                    {localStorage['is_superuser'] == "true" ? (
                      <Route
                        path={ROUTES.addproduct}
                        element={<AddProductView />}
                      ></Route>
                      ) : ("")
                    }
                    <Route
                      path={ROUTES.delivery}
                      element={<DeliveryView />}
                    ></Route>
                    <Route path={ROUTES.info} element={<AboutUsView />}></Route>
                    <Route path={ROUTES.product} element={<ProductWrapper/>}></Route>
                    {localStorage['is_superuser'] == "true" ? (
                      <Route path={ROUTES.editproduct} element={<EditProductWrapper/>}></Route>
                      ) : ("")
                    }
                    <Route
                      path={ROUTES.register}
                      element={<RegisterView />}
                    ></Route>
                    <Route path={ROUTES.login} element={<LoginView />}></Route>
                    <Route
                      path={ROUTES.userprofile}
                      element={<UserView />}
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
            <Text>Let's go fishing!</Text>
          </Footer>
        </Box>
      </Grommet>
    </Router>
  );
};

export default App;