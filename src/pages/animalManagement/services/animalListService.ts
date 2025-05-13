import { api } from "../../../services/axios-config/api";
import { Animal } from "../constants/animalInterface";

export class AnimalListService {
  static async getAll(
    token: string,
    params: Record<string, string | number | undefined>
  ): Promise<Animal[]> {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    console.log("Sending API request with params:", filteredParams);

    const { data } = await api.get("/pet", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filteredParams,
    });
    return data;
  }
}
