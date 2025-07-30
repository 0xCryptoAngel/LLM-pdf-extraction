import React from "react";
import type { ExtractedReport } from "../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Section = ({
  title,
  items,
  render,
}: {
  title: string;
  items: any[];
  render?: (x: any, i: number) => React.ReactNode;
}) => {
  if (!items?.length) return null;
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((x, i) => (
          <li key={i}>{render ? render(x, i) : JSON.stringify(x)}</li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard: React.FC<{ report: ExtractedReport }> = ({ report }) => {
  const pieData = [
    { name: "Goals", value: report.summary.totalGoals || 0 },
    { name: "BMPs", value: report.summary.totalBMPs || 0 },
    { name: "Completion", value: report.summary.completionRate || 0 },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Report Summary</h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={pieData} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Section
        title="Goals"
        items={report.goals}
        render={(g: any) => g?.title || g}
      />
      <Section
        title="BMPs"
        items={report.bmps}
        render={(b: any) => b?.name || b}
      />
      <Section
        title="Implementation Activities"
        items={report.implementation}
      />
      <Section title="Monitoring Metrics" items={report.monitoring} />
      <Section title="Outreach Activities" items={report.outreach} />
      <Section
        title="Geographic Areas"
        items={report.geographicAreas}
        render={(a: any) => a?.name || a}
      />
    </div>
  );
};

export default Dashboard;
