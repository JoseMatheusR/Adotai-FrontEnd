import { api } from "../../../services/axios-config/api";

export class AnimalDeleteService {
  static async delete(id: number): Promise<void> {
    await api.delete(`/animals/${id}`);
  }
}
