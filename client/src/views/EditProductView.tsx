import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";
import { productsApi } from "../api";
import ROUTES from "../utils/ROUTES.json";

const EditProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    count: 0,
    price: 0,
    description: "",
    categories: [],
    image: null,
  });

  useEffect(() => {
    const fetchData = () => {
      productsApi.get(`/products/${id}`).then(({ data }) => {
        setProduct(data);
      });
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct((product) => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<any>) => {
    setProduct((product) => ({
      ...product,
      image: e.target.files[0],
    }));
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", product.image);
    formData.append("name", product.name);
    formData.append("count", product.count.toString());
    formData.append("price", product.price.toString());
    formData.append("description", product.description);

    productsApi.put("saveProduct/" + id, formData).then(() => {
      navigate(ROUTES.products);
    });
  };

  return (
    <Form onSubmit={saveProduct}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          value={product?.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productPrice">
        <Form.Label>Product price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          value={product?.price}
          min="0"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productCount">
        <Form.Label>Product count</Form.Label>
        <Form.Control
          name="count"
          type="number"
          value={product?.count}
          min="0"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productDescription">
        <Form.Label>Product description</Form.Label>
        <Form.Control
          name="description"
          type="text"
          value={product?.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productImage">
        <Form.Label>Product image</Form.Label>
        <Form.Control name="image" type="file" onChange={handleImage} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save product
      </Button>
    </Form>
  );
};

export default EditProductView;
