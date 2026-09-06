// Ko'p qatorli chiziqli grafik (SVG), ixtiyoriy maydon (area) to'ldirish bilan.
// Iste'mol grafigi va balans dinamikasi uchun. Kutubxonasiz.

export interface ChartSeries {
  key: string;
  data: number[];
  color: string;
  area?: boolean;
}

interface AreaLineChartProps {
  series: ChartSeries[];
  height?: number;
  yTicks?: number;
  format?: (n: number) => string;
  className?: string;
}

const W = 640;
const PAD_L = 44;
const PAD_R = 12;
const PAD_T = 12;
const PAD_B = 18;

export function AreaLineChart({
  series,
  height = 240,
  yTicks = 4,
  format = (n) => `${n}`,
  className,
}: AreaLineChartProps) {
  const H = height;
  const all = series.flatMap((s) => s.data);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const lo = Math.floor(min * 0.9);
  const hi = Math.ceil(max * 1.05);
  const range = hi - lo || 1;
  const n = Math.max(...series.map((s) => s.data.length), 1);

  const x = (i: number) => PAD_L + (i / (n - 1 || 1)) * (W - PAD_L - PAD_R);
  const y = (v: number) => PAD_T + (1 - (v - lo) / range) * (H - PAD_T - PAD_B);

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => lo + (range / yTicks) * i);

  const linePath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const areaPath = (data: number[]) =>
    `${linePath(data)} L ${x(data.length - 1).toFixed(1)} ${y(lo).toFixed(1)} L ${x(0).toFixed(1)} ${y(lo).toFixed(1)} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="none"
      role="img"
    >
      <defs>
        {series
          .filter((s) => s.area)
          .map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity="0.10" />
              <stop offset="1" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
      </defs>

      {/* Grid + y belgilar */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={y(t)}
            y2={y(t)}
            stroke="#F3F4F6"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={PAD_L - 8}
            y={y(t) + 3}
            textAnchor="end"
            fontSize="9.5"
            fill="#B4BAC1"
            fontFamily="Geist, system-ui, sans-serif"
          >
            {format(Math.round(t))}
          </text>
        </g>
      ))}

      {series
        .filter((s) => s.area)
        .map((s) => (
          <path key={s.key} d={areaPath(s.data)} fill={`url(#grad-${s.key})`} />
        ))}

      {series.map((s) => (
        <path
          key={s.key}
          d={linePath(s.data)}
          fill="none"
          stroke={s.color}
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
