

import {
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts/types/polar/Pie";

export const contactsByCategory = [
  { name: "Family", value: 8 },
  { name: "Work", value: 14 },
  { name: "Clients", value: 22 },
  { name: "Others", value: 6 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number }> | undefined;
}) {
  if (active && payload && payload.length) {
    const p = payload[0];
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow">
        <div className="font-medium text-gray-800">{p.name}</div>
        <div className="text-gray-600">
          Contacts: <span className="font-semibold">{p.value}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function ContactsPieChart({
  data = contactsByCategory,
  height = 300,
}: {
  data?: { name: string; value: number }[];
  height?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);


  const renderLabel = (props: PieLabelRenderProps) => {
    const payload = (props.payload || {}) as { name?: string };
    const value = (props as unknown as { value?: number }).value ?? 0;
    const name = payload.name ?? "";
    const pct = total ? Math.round((value / total) * 100) : 0;
    return `${name} ${pct}%`;
  };

  return (
    <div className="w-full mt-6 ml-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md  duration-200">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        📊 Contacts by Category
      </h2>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <RPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              labelLine={false}
              label={renderLabel} 
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </RPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
