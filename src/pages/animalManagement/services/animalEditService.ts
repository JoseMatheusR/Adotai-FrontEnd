import { api } from "../../../services/axios-config/api";
import { Animal } from "../constants/animalInterface";

export class AnimalEditService {
  static async update(id: number, animal: Partial<Animal>): Promise<Animal> {
    const { data } = await api.put(`/pet/${id}`, animal);
    return data;
  }
}
