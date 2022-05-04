import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

const ShoppingCartView = () => {
  return (
    <div>
      <Link to={ROUTES.order}>
        <Button variant="primary">Next</Button>
      </Link>
    </div>
  );
};

export default ShoppingCartView;
