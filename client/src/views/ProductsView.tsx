import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ROUTES from "../utils/ROUTES.json";

const ProductsView = () => {
  return (
    <div>
	  <Link to={ROUTES.addproduct}>
		  <Button variant="primary">
				Add new product
		  </Button>
	  </Link>
    </div>
  );
};

export default ProductsView;
