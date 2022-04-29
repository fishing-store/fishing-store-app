import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ROUTES from "../utils/ROUTES.json";
import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { CaretUp, CaretDown } from "grommet-icons";
import * as grommet from "grommet";

enum SortType {
  Price,
  Quantity,
  Name
}

const ProductsView = () => {
  const [products, setProducts] = useState<Product[]>();
  const [defaultProducts, setDefaultProducts] = useState<Product[]>();
  const [isAscending, setIsAscending] = useState(true);
  const [sortType, setSortType] = useState<SortType>();
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/products/").then(({ data }) => {setProducts(data); setDefaultProducts([...data ?? []])});
  }, []);

  useEffect(() => {
    sort();
  }, [isAscending, sortType]);
  const clearSorting = () => {
    setProducts([...defaultProducts ?? []]);
  }

  const setAscending = () => {
    setIsAscending(true);
  }

  const setDescending = () =>  {
    setIsAscending(false);
  }

  const sort = () => {
    switch (sortType) {
      case SortType.Price:
        isAscending ? products?.sort((a,b) => a.price - b.price) : products?.sort((a,b) => b.price - a.price);
        break;
       case SortType.Quantity:
        isAscending ? products?.sort((a,b) => a.count - b.count) : products?.sort((a,b) => b.count - a.count);
        break;
      case SortType.Name:
        isAscending ? products?.sort((a,b) => a.name.localeCompare(b.name)) : products?.sort((a,b) => b.name.localeCompare(a.name));
        break;
      default:
        clearSorting()
        break;
    }
    setProducts([...products ?? []]);
  }

  return (
    <div>
        <Button variant="primary" 
          style={{margin: 10}} 
          onClick={() => setSortType(SortType.Price)}>
            Sort by price
            </Button>
        <Button variant="primary" 
          style={{margin: 10}} 
          onClick={() => setSortType(SortType.Quantity)}>
          Sort by quantity
        </Button>
        <Button variant="primary" 
          style={{margin: 10}}
          onClick={() => setSortType(SortType.Name)}>
          Sort by name
        </Button>
        <grommet.Button icon={<CaretUp />} onClick={setAscending} ></grommet.Button>
        <grommet.Button icon={<CaretDown />} onClick={setDescending} ></grommet.Button>
        <Button variant="primary"
          style={{margin: 10}}
          onClick={clearSorting}>
            Clear sorting
        </Button>
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
    </div>
  );
};

export default ProductsView;
