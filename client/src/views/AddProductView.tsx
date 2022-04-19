import React, { useState } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/ROUTES.json";

const AddProductView = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    count: 0,
    price: 0,
    description: "",
    image: null,
  });

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
  const sendProduct = (e: React.FormEvent) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", product.image);
    formData.append("name", product.name);
    formData.append("count", product.count.toString());
    formData.append("price", product.price.toString());
    formData.append("description", product.description);

    api.post("products/add", formData).then(() => {
      navigate(ROUTES.products);
    });
  };

  return (
    <Form onSubmit={sendProduct}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter product name"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productPrice">
        <Form.Label>Product price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          placeholder="Enter product price"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productCount">
        <Form.Label>Product count</Form.Label>
        <Form.Control
          name="count"
          type="number"
          placeholder="Enter product count"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productDescription">
        <Form.Label>Product description</Form.Label>
        <Form.Control
          name="description"
          type="text"
          placeholder="Enter product description"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productImage">
        <Form.Label>Product image</Form.Label>
        <Form.Control name="image" type="file" onChange={handleImage} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add product
      </Button>
    </Form>
  );
};

export default AddProductView;
