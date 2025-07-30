# PDF Summary Extraction API

This project provides an API for uploading PDF documents and extracting structured summaries using either OpenAI's GPT-4o or Anthropic's Claude models. It is optimized for environmental and agricultural reports, transforming unstructured PDF content into structured JSON for downstream use.

---

## 🛠️ Tech Stack

- **Framework**: Node.js with Express
- **PDF Parsing**: `pdf-parse`
- **LLM Integration**: OpenAI GPT-4o and Claude Opus 4
- **Storage**: In-memory via Multer
- **Language**: TypeScript

---

## 🚀 Features

- Upload a PDF and extract structured data in a single API call
- Choose between OpenAI or Claude as LLM provider
- Validates and cleans JSON response for consistent schema
- Returns fallback empty structure in case of model or parsing failure

---

## 📦 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/pdf-extractor.git
   cd pdf-extractor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file:
   ```
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_claude_key
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

---

## 🧪 API Usage

### POST `/upload`

Upload a PDF and extract a summary:

#### Form Data:
- `file`: PDF file (multipart/form-data)

#### Optional Query:
- `provider`: `openai` (default) or `claude`

#### Example with cURL:
```bash
curl -X POST http://localhost:3000/upload?provider=claude   -F "file=@./sample.pdf"
```

---

## 📁 Folder Structure

```
├── routes/
│   └── upload.ts       → Express route for file upload
├── services/
│   ├── pdfService.ts   → PDF parsing logic
│   └── llmService.ts   → LLM integration (OpenAI & Claude)
├── utils/
│   ├── types.ts        → ExtractedReport interface
│   └── constants.ts    → Prompt templates
├── .env
├── README.md
```
