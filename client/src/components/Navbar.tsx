import { Nav, Anchor } from "grommet";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";
import * as Icons from "grommet-icons";
import { useEffect, useState } from "react";

interface NavbarProps {
  isSuperUser: boolean;
  isLogged: boolean | null;
  logout: () => void;
};

const Navbar = ({ isSuperUser, isLogged, logout }: NavbarProps) => {
  const location = useLocation();

  return (
    <Nav direction="column" pad="medium" width="small">
      <Anchor
        label={location.pathname}
        icon={<Icons.Location />}
        color="black"
        disabled
      />

      {
        isLogged && (
          <Link to={ROUTES.login} onClick={logout}>
            <Anchor label="Logout" icon={<Icons.Login />} />
          </Link>
        )
      }

      {
        !isLogged && (
          <Link to={ROUTES.login}>
            <Anchor label="Login" icon={<Icons.Login />} />
          </Link>
        )
      }

      {
        !isLogged && (
          <Link to={ROUTES.register}>
            <Anchor label="Register" icon={<Icons.UserNew />} />
          </Link>
        )
      }

      {
        isSuperUser && (
          <Link to={ROUTES.users}>
            <Anchor label="Users" icon={<Icons.User />} />
          </Link>
        )
      }

      <Link to={ROUTES.products}>
        <Anchor label="Products" icon={<Icons.ProductHunt />} color="black" />
      </Link>
      <Link to={ROUTES.cart}>
        <Anchor label="Cart" icon={<Icons.Cart />} color="black" />
      </Link>

      {
        isSuperUser && (
          <Link to={ROUTES.addproduct}>
            <Anchor label="Add product" icon={<Icons.Add />} />
          </Link>
        )
      }

      <Link to={ROUTES.info}>
        <Anchor label="About Us" icon={<Icons.Info />} />
      </Link>

      {
        isLogged && (
          <Link to={ROUTES.userprofile}>
            <Anchor label="User profile" icon={<Icons.UserSettings />} />
          </Link>
        )
      }

      {
        isSuperUser && (
          <Link to={ROUTES.adminOrders}>
            <Anchor label="Orders" icon={<Icons.Notes />} />
          </Link>
        )
      }
    </Nav>
  );
};

export default Navbar;