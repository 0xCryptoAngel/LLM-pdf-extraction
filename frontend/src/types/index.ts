export interface ExtractedReport {
  summary: { totalGoals: number; totalBMPs: number; completionRate: number };
  goals: string[] | any[];
  bmps: string[] | any[];
  implementation: string[] | any[];
  monitoring: string[] | any[];
  outreach: string[] | any[];
  geographicAreas: string[] | any[];
}
