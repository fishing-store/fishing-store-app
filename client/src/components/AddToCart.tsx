import Button from "react-bootstrap/Button";
import {CartProduct} from "../views/ProductsView";
import {useState} from "react";

const AddToCart = (props: {product: Product, shoppingCart: CartProduct[], addProductToShoppingCard: (product: CartProduct) => void}) => {
    const {product, shoppingCart, addProductToShoppingCard} = props;
    const [value, setValue] = useState(0);

    return (
        <div>
        <input
            placeholder="count"
            value={value}
            type="number"
            onChange={(event) =>
                setValue(+event.target.value ? +event.target.value : 0)
            }
        />
        <Button
            variant="primary"
            style={{ margin: 10 }}
            disabled={value > 0 ? false : true}
            onClick={() => addProductToShoppingCard({count: value, product })}
        >
            Add to cart
        </Button>
    </div>
)};

export { AddToCart };