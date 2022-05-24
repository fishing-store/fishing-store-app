import { Nav, Anchor } from "grommet";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";
import * as Icons from "grommet-icons";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(localStorage['fishingapp-user-token']);
  const location = useLocation();

  useEffect(() => {
    setIsLogged(localStorage['fishingapp-user-token']);
  });

  const logout = () => {
    localStorage.removeItem('fishingapp-user-token');
    localStorage.removeItem('is_superuser');
    setIsLogged(localStorage['fishingapp-user-token']);
  }

  return (
    <Nav direction="column" pad="medium" width="small">
      <Anchor
        label={location.pathname}
        icon={<Icons.Location />}
        color="black"
        disabled
      />
      {
        isLogged ? (
          <Link to={ROUTES.login} onClick={logout}>
          <Anchor label="Logout" icon={<Icons.Login />} />
        </Link>
        ) : (
          <Link to={ROUTES.login}>
          <Anchor label="Login" icon={<Icons.Login />} />
        </Link>
        )
      }
      <Link to={ROUTES.register}>
        <Anchor label="Register" icon={<Icons.UserNew />} />
      </Link>
      <Link to={ROUTES.order}>
        <Anchor label="Order" icon={<Icons.List />} />
      </Link>
      <Link to={ROUTES.products}>
        <Anchor label="Products" icon={<Icons.ProductHunt />} />
      </Link>
      <Link to={ROUTES.cart}>
        <Anchor label="Cart" icon={<Icons.Cart />} />
      </Link>
      {localStorage['is_superuser'] == "true" ? (
        <Link to={ROUTES.addproduct}>
          <Anchor label="Add product" icon={<Icons.Add />} />
        </Link>
      ) : ("")
      }
      <Link to={ROUTES.delivery}>
        <Anchor label="Delivery view" icon={<Icons.Deliver />} />
      </Link>
      <Link to={ROUTES.info}>
        <Anchor label="About Us" icon={<Icons.Info />} />
      </Link>
      <Link to={ROUTES.userprofile}>
        <Anchor label="User profile" icon={<Icons.UserSettings />} />
      </Link>
    </Nav>
  );
};

export default Navbar;
