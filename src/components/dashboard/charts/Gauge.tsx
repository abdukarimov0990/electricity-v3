// Yarim doira gauge (Energiya samaradorlik indeksi). Oq chiziq quyuq fon ustida.
interface GaugeProps {
  value: number;
  max: number;
  size?: number;
  color?: string;
  trackColor?: string;
}

export function Gauge({
  value,
  max,
  size = 150,
  color = "#007CD2",
  trackColor = "#EEF1F4",
}: GaugeProps) {
  const stroke = size * 0.09;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const pct = Math.max(0, Math.min(1, value / max));

  // Yarim doira (180°): chapdan o'ngga.
  const a0 = Math.PI; // 180°
  const a1 = Math.PI - pct * Math.PI; // qiymatgacha
  const p = (a: number) => `${cx + r * Math.cos(a)} ${cy - r * Math.sin(a)}`;
  const large = 0;
  const track = `M ${p(Math.PI)} A ${r} ${r} 0 0 1 ${p(0)}`;
  const fill = `M ${p(a0)} A ${r} ${r} 0 ${large} 1 ${p(a1)}`;

  return (
    <svg
      width={size}
      height={size / 2 + stroke}
      viewBox={`0 0 ${size} ${size / 2 + stroke}`}
    >
      <path
        d={track}
        fill="none"
        stroke={trackColor}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <path
        d={fill}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}
