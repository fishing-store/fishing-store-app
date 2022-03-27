import { Link } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.order}>Order</Link>
        </li>
        <li>
          <Link to={ROUTES.products}>Products</Link>
        </li>
        <li>
          <Link to={ROUTES.cart}>Cart</Link>
        </li>
        <li>
          <Link to={ROUTES.test}>Test API</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
