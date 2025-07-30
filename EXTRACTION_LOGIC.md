# Extraction Logic

This document explains how structured summaries are extracted from raw PDF files using LLMs.

---

## 🔄 Step-by-Step Workflow

### 1. **PDF Parsing**
- Uploaded PDF is read into a memory buffer using `multer`.
- The buffer is passed to a `pdf-parse` wrapper (`parsePDFBuffer`) to extract raw text.

### 2. **Text Formatting**
- The extracted text is passed into the LLM wrapped in a **prompt pair**:
  - `systemPrompt`: Instructions for the LLM to behave as a data extraction engine.
  - `userPrompt`: Concatenated with extracted text.

### 3. **LLM Extraction**
- Two models are supported:
  - `GPT-4o` via OpenAI API.
  - `Claude Opus` via Anthropic SDK.
- Response is expected to be a **pure JSON block**.

### 4. **Response Sanitization**
- The raw LLM output is cleaned by stripping:
  - Markdown code fences like \`\`\`json
- The JSON is parsed and validated via `ensureExtractedReportShape()`:
  - Invalid or missing fields are defaulted to empty arrays or 0s.
  - Fields are strongly typed to match the `ExtractedReport` interface.

---

## 💡 Design Choices

- **Robustness**: All LLM errors fallback to an empty `ExtractedReport` to avoid runtime failure.
- **Modularity**: Claude and OpenAI logic are isolated for clarity and easier debugging.
- **Safety**: Numerical fields are passed through `safeNumber()` to avoid NaN or undefined values.

---

## 📐 Data Shape

```ts
interface ExtractedReport {
  summary: {
    totalGoals: number;
    totalBMPs: number;
    completionRate: number;
  };
  goals: any[];
  bmps: any[];
  implementation: any[];
  monitoring: any[];
  outreach: any[];
  geographicAreas: any[];
}
```

---

## 🔍 LLM Prompting Strategy

- **System Prompt** (`systemPrompt`): Sets strict JSON rules and constraints.
- **User Prompt** (`userPrompt`): Injects extracted text after a few guiding instructions.

By anchoring the prompt to a fixed schema, we maximize LLM accuracy and reduce hallucination risk.
