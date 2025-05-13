import { api } from "../../../services/axios-config/api";
import { Animal } from "../constants/animalInterface";

export class AnimalCreateService {
  static async create(
    animal: Omit<Animal, "id">,
    token: string
  ): Promise<Animal> {
    const { data } = await api.post("/pet/register", animal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}
