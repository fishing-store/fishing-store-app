import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { DeliveryProvider } from "./context/DeliveryContext";
import "@fontsource/roboto";
import { Box, Button, Collapsible, Footer, Grommet, Heading, Main, Text, } from "grommet";
import { FormClose, Menu } from "grommet-icons";
import { useEffect, useState } from "react";
import { AppBar } from "./components/AppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ShoppingCartProvider } from "./context/ShoppingCart";
import AppRoutes from "./AppRoutes";
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();

    const superUserItemName = "is_superuser";
    const userItemName = "fishingapp-user-token";
    
    const checkIfLoggedInSet = () => {
        return localStorage.getItem(userItemName) !== null;
    };

    const [isLogged, setIsLogged] = useState(checkIfLoggedInSet());

    const logout = () => {
        localStorage.removeItem(userItemName);
        localStorage.removeItem(superUserItemName);
        setIsLogged(false);
        enqueueSnackbar("Logout successful", { variant: "success" });
    }

    const login = () => { setIsLogged(true) };
    
    const isSuperUser = localStorage.getItem(superUserItemName) === "true";
    
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
                                <ShoppingCartProvider>
                                    <DeliveryProvider>
                                        <AppRoutes
                                            loginCallback={login}
                                            isSuperUser={isSuperUser}
                                        />
                                    </DeliveryProvider>
                                </ShoppingCartProvider>
                            </Box>
                            <Collapsible direction="horizontal" open={showSidebar}>
                                <Navbar 
                                    isSuperUser={isSuperUser}
                                    isLogged={isLogged}
                                    logout={logout}
                                />
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