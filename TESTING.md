# Testing and Validation

This document outlines how the accuracy of LLM-generated extractions was tested using EPA (Environmental Protection Agency) reports.

---

## ✅ Test Documents

- 10 real EPA planning and implementation PDFs from:
  - Watershed planning reports
  - BMP (Best Management Practices) evaluations
  - Monitoring summaries

---

## 🧪 Test Strategy

1. **Manual Ground Truth**
   - Key metrics (e.g., total goals, BMP count, completion rate) were manually extracted from each PDF.

2. **Automated Runs**
   - Each PDF was uploaded via `/upload` endpoint.
   - Both Claude and OpenAI were tested independently.

3. **Validation Criteria**
   - **Field Presence**: All required keys exist in output.
   - **Value Accuracy**: Numeric fields within 10% deviation.
   - **Consistency**: Arrays (e.g., goals, bmps) were contextually correct.

---

## 📊 Sample Output Evaluation

Example comparison for EPA Report #5:

| Field               | Ground Truth | GPT-4o Output | Claude Output |
|--------------------|--------------|---------------|----------------|
| totalGoals         | 8            | 8             | 7              |
| totalBMPs          | 32           | 30            | 32             |
| completionRate (%) | 87.5         | 85            | 87.5           |

> Claude was more accurate in structured fields; GPT-4o better at textual sections like outreach and implementation.

---

## 🧩 Edge Cases Tested

- PDFs with multiple columns and rotated text
- Scanned images (flagged as non-supported)
- Bullet lists and tables in the PDF

---

## 🔁 Suggestions for Improvement

- Introduce PDF OCR fallback for image-based PDFs
- Enhance prompts to explicitly request arrays as fallback when LLM is uncertain
