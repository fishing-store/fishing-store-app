import { useState, useEffect } from "react";
import { api } from "../api";

const ProductsView = () => {
  const [products, setProducts] = useState<Product[]>();

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
          }}
          key={product.id}
        >
          <div>
            <strong>Id: {product?.id}</strong>
            <p>Nazwa: {product?.name}</p>
            <p>Cena: {product?.price}</p>
            <p>Opis: {product?.description}</p>
          </div>
          <div>
            <img src={product?.image} width={100} alt="Zdjęcie produktu" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;
