import { api } from "../../../../services/axios-config/api";
import { IRegister, RegisterResponse } from "../types.s";

export class RegisterServices {
  static async post(values: Partial<IRegister>): Promise<RegisterResponse> {
    const { data } = await api.post("/user/register", values);
    return data;
  }
}
