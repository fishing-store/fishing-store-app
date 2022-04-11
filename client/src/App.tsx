import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  OrderView,
  ProductsView,
  ShoppingCartView,
  TestApiView,
} from "./views";
import Navbar from "./components/Navbar";
import ROUTES from "./utils/ROUTES.json";

import "@fontsource/roboto";
import { Box, Button, Heading, Grommet, Collapsible, ResponsiveContext, Layer, Main, Footer, Text } from 'grommet';
import { Menu, FormClose } from 'grommet-icons';
import { useState } from "react";

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '16px',
      height: '22px',
    },
  },
};

const AppBar = (props: any) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Router>
            <Grommet theme={theme} full>
        <Box fill>
        <AppBar flex={false}>
            <Heading level='3' margin='none'>Najplepszy sklep wędkarski</Heading>
            <Button icon={!showSidebar ? <Menu /> : <FormClose />} onClick={() => setShowSidebar(!showSidebar)} />
          </AppBar>

          <Main overflow="auto" flex={true}>
            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align='center' justify='center'>
                <Routes>
                  <Route path={ROUTES.order} element={<OrderView />}></Route>
                  <Route path={ROUTES.products} element={<ProductsView />}></Route>
                  <Route path={ROUTES.cart} element={<ShoppingCartView />}></Route>
                  <Route path={ROUTES.test} element={<TestApiView />}></Route>
                </Routes>
              </Box>
          
          <Collapsible direction='horizontal' open={showSidebar}>
                  <Navbar />
                </Collapsible>
            </Box>
          </Main>


          <Footer background="brand" pad="medium" flex={false}>
            <Text>Copyright</Text>
          </Footer>
        </Box>
      </Grommet>
    </Router>
  );
};

{/* <Router>
<Navbar />
<Routes>
  <Route path={ROUTES.order} element={<OrderView />}></Route>
  <Route path={ROUTES.products} element={<ProductsView />}></Route>
 <Route path={ROUTES.cart} element={<ShoppingCartView />}></Route>
  <Route path={ROUTES.test} element={<TestApiView />}></Route>
</Routes>
</Router> */}

export default App;
