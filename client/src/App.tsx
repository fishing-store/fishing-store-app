import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  OrderView,
  ProductsView,
  ShoppingCartView,
  TestApiView,
} from "./views";
import Navbar from "./components/Navbar";
import ROUTES from "./utils/ROUTES.json";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={ROUTES.order} element={<OrderView />}></Route>
        <Route path={ROUTES.products} element={<ProductsView />}></Route>
        <Route path={ROUTES.cart} element={<ShoppingCartView />}></Route>
        <Route path={ROUTES.test} element={<TestApiView />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
