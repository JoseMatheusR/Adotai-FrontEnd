import axios from "axios";
import { responseInterceptor } from "./interceptors/responseInterceptor";
import { errorInterceptor } from "./interceptors/errorInterceptor";
import { requestInterceptor } from "./interceptors/requestInterceptor";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

api.interceptors.request.use(
  (req) => requestInterceptor(req),
  (error) => errorInterceptor(error)
);
