import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const axisStyle = { fontSize: 11, fill: "var(--muted-foreground)" };
const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid var(--border)",
  fontSize: 12,
};

/** Horizontal bar chart (e.g. Top Chronic Conditions, Claims Category). */
export function HorizontalBar({
  data,
  color = "var(--chart-1)",
  xLabel,
  yLabel,
  height = 280,
  valueFormatter,
  xTickFormatter,
  domain,
}: {
  data: { name: string; value: number }[];
  color?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  valueFormatter?: (v: number) => string;
  xTickFormatter?: (v: number) => string;
  domain?: [number, number];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 48, bottom: 24, left: 8 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          type="number"
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          domain={domain}
          tickFormatter={xTickFormatter}
          label={xLabel ? { value: xLabel, position: "bottom", style: axisStyle } : undefined}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={110}
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", style: axisStyle } : undefined}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={18}>
          <LabelList
            dataKey="value"
            position="right"
            style={{ fontSize: 11, fill: "var(--chart-2)" }}
            formatter={valueFormatter}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Grouped/vertical bar chart with multiple series. */
export function GroupedBar({
  data,
  series,
  height = 300,
}: {
  data: Record<string, number | string>[];
  series: { key: string; name: string; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[3, 3, 0, 0]} barSize={28} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Simple vertical bar chart, optional per-bar colors (e.g. CSAT distribution). */
export function VerticalBar({
  data,
  colors,
  height = 280,
  xLabel,
  yLabel,
}: {
  data: { name: string; value: number; color?: string }[];
  colors?: string[];
  height?: number;
  xLabel?: string;
  yLabel?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 16, bottom: 24, left: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={xLabel ? { value: xLabel, position: "bottom", style: axisStyle } : undefined}
        />
        <YAxis
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", style: axisStyle } : undefined}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={36}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color ?? colors?.[i % colors.length] ?? "var(--chart-1)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Filled area trend over time (e.g. Encounters / Prescriptions over years). */
export function AreaTrend({
  data,
  series,
  height = 320,
  xLabel,
  yLabel,
  domain,
  yTickFormatter,
}: {
  data: Record<string, number | string>[];
  series: { key: string; name: string; color: string }[];
  height?: number;
  xLabel?: string;
  yLabel?: string;
  domain?: [number, number];
  yTickFormatter?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 24, bottom: 24, left: 8 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={xLabel ? { value: xLabel, position: "bottom", style: axisStyle } : undefined}
        />
        <YAxis
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          domain={domain}
          tickFormatter={yTickFormatter}
          label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", style: axisStyle } : undefined}
        />
        <Tooltip contentStyle={tooltipStyle} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#grad-${s.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Line trend (e.g. CSAT score trend). */
export function LineTrend({
  data,
  color = "var(--chart-1)",
  height = 280,
  xLabel,
  yLabel,
}: {
  data: { name: string; value: number }[];
  color?: string;
  height?: number;
  xLabel?: string;
  yLabel?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 24, bottom: 24, left: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={xLabel ? { value: xLabel, position: "bottom", style: axisStyle } : undefined}
        />
        <YAxis
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft", style: axisStyle } : undefined}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Pie / donut breakdown. */
export function PieBreakdown({
  data,
  height = 300,
  donut = false,
}: {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  donut?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={donut ? 60 : 0}
          paddingAngle={1}
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color ?? CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Tiny inline sparkline for table cells (e.g. SEO rank analysis). */
export function Sparkline({
  data,
  color = "var(--chart-1)",
  width = 84,
  height = 28,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
