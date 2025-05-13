import { api } from "../../../services/axios-config/api";
import { Animal } from "../constants/animalInterface";

interface ExportParams {
  status?: "all" | "adopted" | "available" | "unavailable";
  startDate?: string;
  endDate?: string;
  format?: "csv" | "xlsx";
}

export class ExportService {
  static async exportAnimals(params: ExportParams): Promise<Blob> {
    const response = await api.get("/animals/export", {
      params,
      responseType: "blob",
    });

    const filename = `animais_${new Date().toISOString().split("T")[0]}.${
      params.format || "xlsx"
    }`;
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  }

  static async exportAnimalById(
    id: number,
    format: "csv" | "xlsx" = "xlsx"
  ): Promise<Blob> {
    const response = await api.get(`/animals/${id}/export`, {
      params: { format },
      responseType: "blob",
    });

    const filename = `animal_${id}_${
      new Date().toISOString().split("T")[0]
    }.${format}`;
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  }
}
