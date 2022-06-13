import {Route, Routes} from "react-router-dom";
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


import ROUTES from "./utils/ROUTES.json";

import "@fontsource/roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

const AppRoutes = ({loginCallback, isSuperUser}: {loginCallback: () => void, isSuperUser: boolean}) => {
    const defaultView = <ProductsView/>;
    const allowIfSuperUser = (restrictedView: JSX.Element) => {
        if (isSuperUser)
            return restrictedView;
        else
            return defaultView;
    };

    return (
        <Routes>
            <Route path={ROUTES.default} element={defaultView}/>
            <Route path={ROUTES.products} element={<ProductsView/>}/>
            <Route path={ROUTES.cart} element={<ShoppingCartView/>}/>
            <Route path={ROUTES.addproduct} element={allowIfSuperUser(<AddProductView/>)}/>
            <Route path={ROUTES.delivery} element={<DeliveryView/>}/>
            <Route path={ROUTES.order} element={<OrderView/>}/>
            <Route path={ROUTES.info} element={<AboutUsView/>}/>
            <Route path={ROUTES.product} element={<ProductDetailsView/>}/>
            <Route path={ROUTES.editproduct} element={<EditProductView/>}/>
            <Route path={ROUTES.register} element={<RegisterView/>}/>
            <Route path={ROUTES.login} element={<LoginView loginCallback={loginCallback}/>}/>
            <Route path={ROUTES.userprofile} element={<UserView/>}/>
            <Route path={ROUTES.adminOrders} element={<AdminOrdersView/>}/>
            <Route path={ROUTES.userOrders} element={<UserOrdersView/>}/>
            <Route path={ROUTES.orderconfirmation} element={<OrderConfirmationView/>}/>
            <Route path={ROUTES.users} element={allowIfSuperUser(<UsersInfoView/>)}/>
        </Routes>
    );
};

export default AppRoutes;