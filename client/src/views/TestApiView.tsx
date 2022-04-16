import { useEffect, useState } from "react";
import { api } from "../api";

const TestApiView = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchData = () => {
      api.get("/").then(({ data }) => setProducts(data));
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: 10 }}>
      {products?.map((product) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            border: "2px solid black",
            marginTop: 10,
            width: 700,
          }}
          key={product.id}
        >
          <div>
            <strong>Id: {product?.id}</strong>
            <p>Nazwa: {product?.name}</p>
            <p>Cena: {product?.price}</p>
            <p>Opis: {product?.description}</p>
            <p>Liczba: {product?.count}</p>
          </div>
          <div>
            <img src={product?.image} alt="Zdjęcie produktu" style={{maxWidth: '400px'}}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestApiView;
