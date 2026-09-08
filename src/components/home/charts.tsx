// Home dashboard grafiklari (sof SVG).

interface Line {
  data: number[];
  color: string;
}

const LW = 480;
const PADL = 34;
const PADR = 10;
const PADT = 10;
const PADB = 16;

/** Ko'p qatorli chiziqli grafik (Iste'mol dinamikasi). */
export function LineChart({ lines, height = 190 }: { lines: Line[]; height?: number }) {
  const all = lines.flatMap((l) => l.data);
  const max = Math.ceil(Math.max(...all) / 25) * 25;
  const min = 0;
  const n = Math.max(...lines.map((l) => l.data.length), 1);
  const x = (i: number) => PADL + (i / (n - 1)) * (LW - PADL - PADR);
  const y = (v: number) => PADT + (1 - (v - min) / (max - min)) * (height - PADT - PADB);
  const ticks = [0, 0.5, 1].map((f) => min + (max - min) * f);

  const path = (d: number[]) =>
    d.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${LW} ${height}`} className="w-full" preserveAspectRatio="none" role="img">
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={PADL} x2={LW - PADR} y1={y(t)} y2={y(t)} stroke="#F1F2F4" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <text x={PADL - 8} y={y(t) + 3} textAnchor="end" fontSize="10" fill="#AEB4BC" fontFamily="Geist, sans-serif">
            {Math.round(t)}
          </text>
        </g>
      ))}
      {lines.map((l, i) => (
        <path key={i} d={path(l.data)} fill="none" stroke={l.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/** Konsentrik radial bar chart (Qarzdorlik / Yo'qotish zarari). */
export function RadialChart({
  segments,
  size = 168,
}: {
  segments: { key: string; color: string; pct: number }[];
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 12;
  const gap = 6;
  const r0 = size / 2 - stroke / 2 - 2;

  const arc = (r: number, pct: number) => {
    const a = (Math.min(pct, 100) / 100) * 2 * Math.PI;
    const x0 = cx;
    const y0 = cy - r;
    const x1 = cx + r * Math.sin(a);
    const y1 = cy - r * Math.cos(a);
    const large = a > Math.PI ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {segments.map((s, i) => {
        const r = r0 - i * (stroke + gap);
        return (
          <g key={s.key}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F1F4" strokeWidth={stroke} />
            <path d={arc(r, s.pct)} fill="none" stroke={s.color} strokeWidth={stroke} strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

/** Rangli nuqta + label + qiymat ro'yxati (chart legend). */
export function Legend({
  items,
  className,
}: {
  items: { key: string; label: string; value: string; color: string }[];
  className?: string;
}) {
  return (
    <ul className={["flex flex-col gap-3", className ?? ""].join(" ")}>
      {items.map((it) => (
        <li key={it.key} className="flex items-start gap-2">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: it.color }} />
          <div className="min-w-0 leading-tight">
            <p className="text-[12px] text-[#8A9099]">{it.label}</p>
            <p className="text-[13px] font-bold text-[#16181B]">{it.value}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
