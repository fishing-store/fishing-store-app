import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {
    AboutUsView,
    AddProductView,
    AdminOrdersView,
    DeliveryView,
    EditProductView,
    LoginView,
    OrderView,
    ProductDetailsView,
    ProductsView,
    RegisterView,
    ShoppingCartView,
    UserOrdersView,
    UserView,
    OrderConfirmationView,
    UsersInfoView,
} from "./views";
import Navbar from "./components/Navbar";
import ROUTES from "./utils/ROUTES.json";
import {DeliveryProvider} from "./context/DeliveryContext";
import "@fontsource/roboto";
import {Box, Button, Collapsible, Footer, Grommet, Heading, Main, Text,} from "grommet";
import {FormClose, Menu} from "grommet-icons";
import {useState} from "react";
import {AppBar} from "./components/AppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {ShoppingCartProvider} from "./context/ShoppingCart";

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

    const defaultView = <ProductsView/>;
    const isSuperUser = localStorage.getItem("is_superuser") === "true";
    const allowIfSuperUser = (restrictedView: JSX.Element) => {
        if (isSuperUser)
            return restrictedView;
        else
            return defaultView;
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
                            icon={!showSidebar ? <Menu/> : <FormClose/>}
                            onClick={() => setShowSidebar(!showSidebar)}
                        />
                    </AppBar>

                    <Main overflow="auto" flex={true}>
                        <Box
                            direction="row"
                            flex
                            overflow={{horizontal: "hidden"}}
                            className="scroll-enabled"
                        >
                            <Box flex align="center" justify="center">
                                <ShoppingCartProvider>
                                    <DeliveryProvider>
                                        <Routes>
                                            <Route path={ROUTES.products} element={<ProductsView/>}/>
                                            <Route path={ROUTES.cart} element={<ShoppingCartView/>}/>
                                            <Route path={ROUTES.addproduct} element={allowIfSuperUser(<AddProductView/>)}/>
                                            <Route path={ROUTES.delivery} element={<DeliveryView/>}/>
                                            <Route path={ROUTES.order} element={<OrderView/>}/>
                                            <Route path={ROUTES.info} element={<AboutUsView/>}/>
                                            <Route path={ROUTES.product} element={<ProductDetailsView/>}/>
                                            <Route path={ROUTES.editproduct} element={<EditProductView/>}/>
                                            <Route path={ROUTES.register} element={<RegisterView/>}/>
                                            <Route path={ROUTES.login} element={<LoginView/>}/>
                                            <Route path={ROUTES.userprofile} element={<UserView/>}/>
                                            <Route path={ROUTES.adminOrders} element={<AdminOrdersView/>}/>
                                            <Route path={ROUTES.userOrders} element={<UserOrdersView/>}/>
                                            <Route path={ROUTES.orderconfirmation} element={<OrderConfirmationView/>}/>
                                            <Route path={ROUTES.users} element={allowIfSuperUser(<UsersInfoView/>)}/>
                                        </Routes>
                                    </DeliveryProvider>
                                </ShoppingCartProvider>
                            </Box>
                            <Collapsible direction="horizontal" open={showSidebar}>
                                <Navbar/>
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