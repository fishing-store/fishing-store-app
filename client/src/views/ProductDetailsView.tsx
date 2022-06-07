import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import Button from "react-bootstrap/Button";

const ProductDetailsView = () => {
  const [products, setProduct] = useState<Product>();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = () => {
      api.get(`/products/${id}`).then(({ data }) => setProduct(data));
    };
    fetchData();
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 10,
        border: "2px solid black",
        margin: 10,
        alignContent: "center",
        alignItems: "center",
        cursor: "pointer",
        overflowWrap: "break-word"
      }}
    >
          {localStorage['is_superuser'] == "true" ? (
            <Link to={`/editproduct/${products?.id}`}>
              <Button variant="primary">Edit product</Button>
            </Link> ) : ("")
          }
          <div>
            <strong>Id: {products?.id}</strong>
            <p>Nazwa: {products?.name}</p>
            <p>Cena: {products?.price}</p>
            <p>Opis: {products?.description}</p>
            <p>Liczba: {products?.count}</p>
          </div>
          <div>
            <img
              src={`${process.env.REACT_APP_IMG_BASE_URL}${products?.image}`}
              width={100}
              alt="Zdjęcie produktu"
            />
          </div>
      
    </div>
  );
};
  
export default ProductDetailsView;