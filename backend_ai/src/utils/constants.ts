export const systemPrompt = `
You are a data-extraction engine that converts unstructured environmental or agricultural PDF text
into structured JSON following the ExtractedReport TypeScript interface.

Rules:
- Return ONLY JSON. No markdown, no commentary.
- If a field is unknown, use an empty array ([]) or 0/0.0 as appropriate.
- Deduplicate similar goal statements.
- Capture numeric targets (acres, %, counts) when present.
- Do not hallucinate. If unsure, omit.
`;

export const userPrompt = `
Extract data from the following text. Respond with strict JSON matching this TypeScript type:

interface ExtractedReport {
  summary: { totalGoals: number; totalBMPs: number; completionRate: number };
  goals: Goal[];
  bmps: BMP[];
  implementation: ImplementationActivity[];
  monitoring: MonitoringMetric[];
  outreach: OutreachActivity[];
  geographicAreas: GeographicArea[];
}

type Goal = { id: string; title: string; description?: string; targetValue?: number; targetUnit?: string; };
type BMP = { id: string; name: string; description?: string; unit?: string; planned?: number; completed?: number; };
type ImplementationActivity = { id: string; description: string; startDate?: string; endDate?: string; status?: string; };
type MonitoringMetric = { id: string; metric: string; value?: number; unit?: string; location?: string; frequency?: string; };
type OutreachActivity = { id: string; audience?: string; activity: string; count?: number; notes?: string; };
type GeographicArea = { id: string; name: string; county?: string; state?: string; lat?: number; lon?: number; notes?: string; };

Text to extract:\n\n
`;
