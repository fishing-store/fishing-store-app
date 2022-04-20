import { useEffect, useState } from "react";
import { api } from "../api";

type Props = {
  id: number;
};

const ProductDetailsView = ({ id }: Props) => {
  const [products, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = () => {
      api.get(`/products/${id}`).then(({ data }) => setProduct(data));
    };
    fetchData();
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