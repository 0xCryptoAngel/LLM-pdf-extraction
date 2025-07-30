import axios from "axios";
import type { ExtractedReport } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function uploadPDF(
  file: File,
  provider: "openai" | "claude"
): Promise<ExtractedReport> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/upload?provider=${provider}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data as ExtractedReport;
}
