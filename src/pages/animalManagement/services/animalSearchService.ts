import { api } from "../../../services/axios-config/api";
import { Animal } from "../constants/animalInterface";

interface SearchParams {
  name?: string;
  type?: string;
  breed?: string;
  status?: "all" | "adopted" | "available" | "unavailable";
  author?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  animals: Animal[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export class AnimalSearchService {
  static async search(params: SearchParams): Promise<SearchResponse> {
    const { data } = await api.get("/pet", {
      params: {
        ...params,
        ...Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== undefined)
        ),
      },
    });
    return data;
  }

  static async searchByName(name: string): Promise<Animal[]> {
    const { data } = await api.get("/animals/search", {
      params: { name },
    });
    return data.animals;
  }
}
