import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import Dashboard from "../components/Dashboard";
import { uploadPDF } from "../services/api";
import type { ExtractedReport } from "../types";

export function App() {
  const [report, setReport] = useState<ExtractedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [provider, setProvider] = useState<"openai" | "claude">("openai");

  const handleUpload = async (file: File) => {
    setLoading(true);
    setErr(null);
    try {
      const data = await uploadPDF(file, provider);
      setReport(data);
    } catch (e: any) {
      setErr(e?.message || "Failed to process PDF");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setReport(null);

  return (
    <div>
      {!report && (
        <>
          <div className="text-center mt-4">
            <label className="mr-2">Choose LLM:</label>
            <select
              value={provider}
              onChange={(e) =>
                setProvider(e.target.value as "openai" | "claude")
              }
              className="border p-1 rounded"
            >
              <option className="text-black" value="openai">
                OpenAI
              </option>
              <option className="text-black" value="claude">
                Claude
              </option>
            </select>
          </div>
          <FileUploader onUpload={handleUpload} />
        </>
      )}
      {loading && <p className="text-center mt-8">Processing PDF...</p>}
      {err && <p className="text-center mt-4 text-red-600">{err}</p>}
      {report && (
        <>
          <div className="text-center mt-4">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={reset}
            >
              Upload Another
            </button>
          </div>
          <Dashboard report={report} />
        </>
      )}
    </div>
  );
}

export default App;
