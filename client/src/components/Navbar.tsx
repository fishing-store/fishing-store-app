import { Nav, Anchor } from "grommet";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

import * as Icons from "grommet-icons";

const Navbar = () => {
  const location = useLocation();

  return (
    <Nav direction="column" pad="medium" width="small">
      <Anchor
        label={location.pathname}
        icon={<Icons.Location />}
        color="black"
        disabled
      />
      <Link to={ROUTES.login}>
        <Anchor label="Login" icon={<Icons.Login />} />
      </Link>
      <Link to={ROUTES.register}>
        <Anchor label="Register" icon={<Icons.UserNew />} />
      </Link>
      <Link to={ROUTES.products}>
        <Anchor label="Products" icon={<Icons.ProductHunt />} color="black"/>
      </Link>
      <Link to={ROUTES.cart}>
        <Anchor label="Cart" icon={<Icons.Cart />} color="black"/>
      </Link>
      <Link to={ROUTES.delivery}>
        <Anchor label="Delivery view" icon={<Icons.Deliver />} color="black"/>
      </Link>
      <Link to={ROUTES.order}>
        <Anchor label="Confirm order" icon={<Icons.Checkmark />} color="black"/>
      </Link>
      <Link to={ROUTES.addproduct}>
        <Anchor label="Add product" icon={<Icons.Add />} />
      </Link>
      <Link to={ROUTES.info}>
        <Anchor label="About Us" icon={<Icons.Info />} />
      </Link>
      <Link to={ROUTES.userprofile}>
        <Anchor label="User profile" icon={<Icons.UserSettings />} />
      </Link>
      <Link to={ROUTES.adminOrders}>
        <Anchor label="Orders" icon={<Icons.Notes />} />
      </Link>
    </Nav>
  );
};

export default Navbar;
