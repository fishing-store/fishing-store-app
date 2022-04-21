import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ROUTES from "../utils/ROUTES.json";
import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const ProductsView = () => {
  const [products, setProducts] = useState<Product[]>();
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/products/").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Link to={ROUTES.addproduct}>
        <Button variant="primary">Add new product</Button>
      </Link>
      {products?.map((product) => (
        <div
          style={{
            flexDirection: "column",
            padding: 10,
            border: "2px solid black",
            margin: 10,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          key={product.id}
          onClick={() => { navigate(`/products/${product?.id}`)}}
        >
          <div>
            <strong>Id: {product?.id}</strong>
            <p>Nazwa: {product?.name}</p>
            <p>Cena: {product?.price}</p>
            <p>Opis: {product?.description}</p>
            <p>Liczba: {product?.count}</p>
          </div>
          <div>
            <img
              src={`${process.env.REACT_APP_IMG_BASE_URL}${product?.image}`}
              width={100}
              alt="Zdjęcie produktu"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;
