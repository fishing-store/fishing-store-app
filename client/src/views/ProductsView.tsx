import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ROUTES from "../utils/ROUTES.json";
import {AddToCart} from "../components/AddToCart";
import {useEffect, useState} from "react";
import {productsApi} from "../api";
import {CaretDown, CaretUp} from "grommet-icons";
import * as grommet from "grommet";

enum SortType {
    Price,
    Quantity,
    Name,
}

export interface CartProduct {
    count: number;
    product: Product;
}

const ProductsView = () => {
    const [products, setProducts] = useState<Product[]>();
    const [defaultProducts, setDefaultProducts] = useState<Product[]>();
    const [isAscending, setIsAscending] = useState(true);
    const [sortType, setSortType] = useState<SortType>();
    const [searchValue, setSearchValue] = useState("");
    const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
    const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
    const [countMin, setCountMin] = useState<number | undefined>(undefined);
    const [countMax, setCountMax] = useState<number | undefined>(undefined);
    const navigate = useNavigate();
    useEffect(() => {
        productsApi.get("/products/").then(({data}) => {
            setProducts(data);
            setDefaultProducts([...(data ?? [])]);
        });
    }, []);

    useEffect(() => {
        sort();
    }, [isAscending, sortType]);

    const clearSorting = () => {
        setProducts([...(defaultProducts ?? [])]);
    };

    const setAscending = () => {
        setIsAscending(true);
    };

    const setDescending = () => {
        setIsAscending(false);
    };

    const sort = () => {
        switch (sortType) {
            case SortType.Price:
                isAscending
                    ? products?.sort((a, b) => a.price - b.price)
                    : products?.sort((a, b) => b.price - a.price);
                break;
            case SortType.Quantity:
                isAscending
                    ? products?.sort((a, b) => a.count - b.count)
                    : products?.sort((a, b) => b.count - a.count);
                break;
            case SortType.Name:
                isAscending
                    ? products?.sort((a, b) => a.name.localeCompare(b.name))
                    : products?.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        setProducts([...(products ?? [])]);
    };

    const filter = () => {
        let newProducts = defaultProducts?.filter((product) =>
            product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        );
        newProducts = newProducts?.filter(
            (product) =>
                product.price >= (priceMin ?? 0) &&
                product.price <= (priceMax ?? 10000000000000)
        );
        newProducts = newProducts?.filter(
            (product) =>
                product.price >= (countMin ?? 0) &&
                product.price <= (countMax ?? 10000000000000)
        );
        setProducts([...(newProducts ?? [])]);
    };

    return (
        <div>
            <div
                style={{
                    marginTop: "150px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <form>
                    <input
                        placeholder="Search for..."
                        style={{margin: 10}}
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                    <input
                        placeholder="Min price"
                        style={{margin: 10}}
                        value={priceMin}
                        type="number"
                        onChange={(event) =>
                            setPriceMin(+event.target.value ? +event.target.value : undefined)
                        }
                    />
                    <input
                        placeholder="Max price"
                        style={{margin: 10}}
                        type="number"
                        value={priceMax}
                        onChange={(event) =>
                            setPriceMax(event.target.value ? +event.target.value : undefined)
                        }
                    />
                    <input
                        placeholder="Min quantity"
                        style={{margin: 10}}
                        value={countMin}
                        type="number"
                        onChange={(event) =>
                            setCountMin(+event.target.value ? +event.target.value : undefined)
                        }
                    />
                    <input
                        placeholder="Max quantity"
                        style={{margin: 10}}
                        type="number"
                        value={countMax}
                        onChange={(event) =>
                            setCountMax(event.target.value ? +event.target.value : undefined)
                        }
                    />
                    <Button variant="primary" style={{margin: 10}} onClick={filter}>
                        Filter
                    </Button>
                </form>
            </div>
            <div
                style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Button
                    variant="primary"
                    style={{margin: 10}}
                    onClick={() => setSortType(SortType.Price)}
                >
                    Sort by price
                </Button>
                <Button
                    variant="primary"
                    style={{margin: 10}}
                    onClick={() => setSortType(SortType.Quantity)}
                >
                    Sort by quantity
                </Button>
                <Button
                    variant="primary"
                    style={{margin: 10}}
                    onClick={() => setSortType(SortType.Name)}
                >
                    Sort by name
                </Button>
                <grommet.Button
                    icon={<CaretUp/>}
                    onClick={setAscending}
                ></grommet.Button>
                <grommet.Button
                    icon={<CaretDown/>}
                    onClick={setDescending}
                ></grommet.Button>
                <Button variant="primary" style={{margin: 10}} onClick={clearSorting}>
                    Clear all
                </Button>
            </div>
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
                    <div key={product?.id}>
                        <div
                            style={{
                                flexDirection: "column",
                                padding: 10,
                                border: "2px solid black",
                                margin: 10,
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                            key={product.id}
                            onClick={() => {
                                navigate(`/products/${product?.id}`);
                            }}
                        >
                            <div>
                                <strong>Id: {product?.id}</strong>
                                <p>Nazwa: {product?.name}</p>
                                <p>Cena: {product?.price}</p>
                                <p>Opis: {product?.description}</p>
                                <p>Liczba: {product?.count}</p>
                                {/* {product?.categories && (
                                    <p>
                                        Kategorie: &nbsp;
                                        {JSON.parse(product?.categories.toString()).map(
                                            (c: string) => `${c} `
                                        )}
                                    </p>
                                )} */}
                            </div>
                            <div>
                                <img
                                    src={`${process.env.REACT_APP_PRODUCTS_URL}${product?.image}`}
                                    width={100}
                                    alt="Zdjęcie produktu"
                                />
                            </div>
                        </div>
                        <AddToCart product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsView;
