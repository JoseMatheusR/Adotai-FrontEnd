import { api } from "../../../../services/axios-config/api";
import { ILogin, LoginResponse } from "../types.s";

export class LoginServices {
  static async post(values: Partial<ILogin>): Promise<LoginResponse> {
    const { data } = await api.post("/user/login", values);
    return data;
  }
}
