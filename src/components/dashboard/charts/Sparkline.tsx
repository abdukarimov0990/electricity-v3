// Minimalist mini-grafik: nozik chiziq + juda yengil to'ldirish (SVG).
// Konteynerga cho'ziladi. `uid` - gradient id to'qnashuvining oldini oladi.
interface SparklineProps {
  data: number[];
  uid: string;
  color?: string;
  className?: string;
}

export function Sparkline({
  data,
  uid,
  color = "#007CD2",
  className,
}: SparklineProps) {
  const n = data.length || 1;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 100;
  const H = 30;
  const x = (i: number) => (i / (n - 1 || 1)) * W;
  const y = (v: number) => 4 + (1 - (v - min) / range) * (H - 8);

  const line = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`)
    .join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.14" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${uid})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
