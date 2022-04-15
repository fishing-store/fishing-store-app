import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { api } from '../api';
import { useNavigate  } from "react-router-dom";

const AddProductView = () => {
   let navigate  = useNavigate();
    let productAdded = false;
    const initialFormData = Object.freeze({
        name: "",
        count: 0,
        price: 0,
        description: "",
        image: "https://www.rei.com/media/product/148527"
      });

    const [product, updateFormData] = useState<Product>(initialFormData);

    const handleChange = (e: React.ChangeEvent<any>) => {
        updateFormData({
          ...product,
          // Trimming any whitespace
          [e.target.name]: e.target.value
        });
      };

    const sendProduct = () => {
        console.log(product)
        api.post("products/add", product)
        .then((res) => {
            productAdded = true;
            console.log(res);
            console.log("product added", productAdded);
            navigate("/products");
        });
      };
      return (
        <Form>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter product name" onChange={handleChange}/>
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Product price</Form.Label>
            <Form.Control name="price" type="number" placeholder="Enter product price" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCount">
            <Form.Label>Product count</Form.Label>
            <Form.Control name="count" type="number" placeholder="Enter product count" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Priduct description</Form.Label>
            <Form.Control name="description" type="text" placeholder="Enter product description" onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" onClick={sendProduct}>
            Add product
          </Button>
        </Form>
      );
    };
  
  export default AddProductView;