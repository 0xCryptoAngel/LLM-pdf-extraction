export interface ExtractedReport {
  summary: { totalGoals: number; totalBMPs: number; completionRate: number };
  goals: Goal[];
  bmps: BMP[];
  implementation: ImplementationActivity[];
  monitoring: MonitoringMetric[];
  outreach: OutreachActivity[];
  geographicAreas: GeographicArea[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetValue?: number;
  targetUnit?: string;
}

export interface BMP {
  id: string;
  name: string;
  description?: string;
  unit?: string;
  planned?: number;
  completed?: number;
}

export interface ImplementationActivity {
  id: string;
  description: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface MonitoringMetric {
  id: string;
  metric: string;
  value?: number;
  unit?: string;
  location?: string;
  frequency?: string;
}

export interface OutreachActivity {
  id: string;
  audience?: string;
  activity: string;
  count?: number;
  notes?: string;
}

export interface GeographicArea {
  id: string;
  name: string;
  county?: string;
  state?: string;
  lat?: number;
  lon?: number;
  notes?: string;
}
