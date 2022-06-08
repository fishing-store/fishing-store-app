import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const productsApi = axios.create({
  baseURL: process.env.REACT_APP_PRODUCTS_URL,
});

const ordersApi = axios.create({
  baseURL: process.env.REACT_APP_ORDERS_URL,
});

const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

productsApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => console.log(error)
);

ordersApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => console.log(error)
);

authApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => console.log(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => console.log(error)
);

export {
  api,
  productsApi,
  ordersApi,
  authApi
};