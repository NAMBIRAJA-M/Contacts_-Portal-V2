import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const contactsPerMonth = [
  { month: "Jan", contacts: 10 },
  { month: "Feb", contacts: 15 },
  { month: "Mar", contacts: 8 },
  { month: "Apr", contacts: 20 },
  { month: "May", contacts: 12 },
  { month: "Jun", contacts: 18 },
  { month: "Jul", contacts: 10 },
  { month: "Aug", contacts: 15 },
  { month: "Sep", contacts: 8 },
  { month: "Oct", contacts: 10 },
  { month: "Nov", contacts: 12 },
  { month: "Dec", contacts: 18 },
];

const formatNumber = (n: number) => Intl.NumberFormat().format(n);

const getTotals = (data: { month: string; contacts: number }[]) => {
  const total = data.reduce((a, b) => a + b.contacts, 0);
  const best = data.reduce(
    (acc, cur) => (cur.contacts > acc.contacts ? cur : acc),
    data[0] ?? { month: "-", contacts: 0 }
  );
  return { total, best };
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow dark:bg-slate-900 dark:border-slate-700">
        <div className="font-medium text-gray-800 dark:text-slate-100">{label}</div>
        <div className="text-gray-600 dark:text-slate-300">
          Contacts: <span className="font-semibold">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function ContactBarChart() {

    
  const data = contactsPerMonth;
  const { total, best } = getTotals(data);

  return (
    <div className="w-full mt-4 ml-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700">
        
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
              Contacts Added Per Month
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Jan – Dec overview</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 px-3 py-2 text-right dark:bg-slate-700">
              <div className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-slate-400">
                Total
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                {formatNumber(total)}
              </div>
            </div>
            <div className="rounded-lg bg-indigo-50 px-3 py-2 text-right dark:bg-indigo-950">
              <div className="text-[10px] uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                Best Month
              </div>
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                {best.month} • {best.contacts}
              </div>
            </div>
          </div>
        </div>

      
        <div className="h-[300px] w-[500px]">
          <svg width="0" height="0">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 12, left: 4, bottom: 6 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                className="dark:fill-slate-400"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                width={30}
                className="dark:fill-slate-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="contacts"
                fill="url(#barGradient)"
                radius={[8, 8, 4, 4]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
