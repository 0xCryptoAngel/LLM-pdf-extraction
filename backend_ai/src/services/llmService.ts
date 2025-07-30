import dotenv from "dotenv";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { ContentBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

import { ExtractedReport } from "../utils/types";
import { systemPrompt, userPrompt } from "../utils/constants";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

function safeNumber(value: any): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function emptyExtractedReport(): ExtractedReport {
  return {
    summary: { totalGoals: 0, totalBMPs: 0, completionRate: 0 },
    goals: [],
    bmps: [],
    implementation: [],
    monitoring: [],
    outreach: [],
    geographicAreas: [],
  };
}

function ensureExtractedReportShape(obj: any): ExtractedReport {
  return {
    summary: {
      totalGoals: safeNumber(obj?.summary?.totalGoals),
      totalBMPs: safeNumber(obj?.summary?.totalBMPs),
      completionRate: safeNumber(obj?.summary?.completionRate),
    },
    goals: Array.isArray(obj?.goals) ? obj.goals : [],
    bmps: Array.isArray(obj?.bmps) ? obj.bmps : [],
    implementation: Array.isArray(obj?.implementation) ? obj.implementation : [],
    monitoring: Array.isArray(obj?.monitoring) ? obj.monitoring : [],
    outreach: Array.isArray(obj?.outreach) ? obj.outreach : [],
    geographicAreas: Array.isArray(obj?.geographicAreas) ? obj.geographicAreas : [],
  };
}

function parseLLMResponse(content: string, modelName: string): ExtractedReport {
  try {
    const cleaned = content
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "");

    const parsed = JSON.parse(cleaned);
    return ensureExtractedReportShape(parsed);
  } catch (err) {
    console.warn(`${modelName} JSON parse failed. Returning empty report.`, err);
    return emptyExtractedReport();
  }
}

export async function extractStructuredData(text: string): Promise<ExtractedReport> {
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `${userPrompt}${text}` },
      ],
    });

    const content = resp.choices[0].message?.content || "{}";
    return parseLLMResponse(content, "OpenAI GPT-4o");
  } catch (err) {
    console.warn("OpenAI GPT-4o request failed. Returning empty report.", err);
    return emptyExtractedReport();
  }
}

export async function extractStructuredDataClaude(text: string): Promise<ExtractedReport> {
  try {
    const completion = await anthropic.messages.create({
      model: "claude-opus-4-20250514",
      max_tokens: 4000,
      temperature: 0,
      system: systemPrompt,
      messages: [{ role: "user", content: `${userPrompt}${text}` }],
    });

    const contentBlock = completion.content.find(
      (block: ContentBlock) => block.type === "text"
    );

    const content = contentBlock && "text" in contentBlock ? contentBlock.text : "{}";
    return parseLLMResponse(content, "Claude Opus");
  } catch (err) {
    console.warn("Claude Opus request failed. Returning empty report.", err);
    return emptyExtractedReport();
  }
}
