import { AxiosError } from "axios";

export const errorInterceptor = async (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Erro de Conexão"));
  }

  return Promise.reject(error);
};
