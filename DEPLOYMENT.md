# Deployment Instructions

Here’s how to configure, run, and host the PDF Summary Extraction API.

---

## 🌐 Local Development

1. **Install**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```

3. **Test Upload**
   Use Postman or `curl` to POST a file to:
   ```
   http://localhost:3000/upload?provider=claude
   ```

---

## 🚀 Live Deployment with Render

### 🧳 Steps

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository containing this codebase
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
4. Use the following settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run dev` or `node dist/index.js`
   - **Instance Type**: Free or Starter (based on expected usage)

5. Add a `render.yaml` (optional) for infrastructure-as-code deployment

---

## 🌍 Production Recommendations

- Add input size limits via Multer
- Cache or store LLM responses to reduce API costs
- Add retry logic or exponential backoff on LLM failures
