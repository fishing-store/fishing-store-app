import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => console.log(error)
);
