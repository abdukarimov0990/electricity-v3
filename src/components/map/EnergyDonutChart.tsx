import { Section } from "./Section";
import type { DonutSegment } from "./data";

interface EnergyDonutChartProps {
  segments: readonly DonutSegment[];
  size?: number;
}

/**
 * "Hisobot" bo'limi - segmentli donut (Figma: outer 80, ring 16, teshik 48) +
 * o'ngda izoh. Segmentlar tutash (bo'shliqsiz), ranglar ma'lumotdan olinadi.
 */
export function EnergyDonutChart({ segments, size = 80 }: EnergyDonutChartProps) {
  const stroke = size * 0.2; // 80 -> 16
  const radius = (size - stroke) / 2;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const percents = segments.map((s) => (s.value / total) * 100);

  const arcs = segments.map((seg, i) => {
    const start = percents.slice(0, i).reduce((a, b) => a + b, 0);
    return {
      color: seg.color,
      dasharray: `${percents[i]} ${100 - percents[i]!}`,
      dashoffset: -start,
    };
  });

  return (
    <Section label="Hisobot">
      <div className="flex items-center gap-5 rounded-lg bg-[#F3F3F3] p-3">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0"
        >
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {arcs.map((arc, i) => (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={stroke}
                strokeLinecap="butt"
                pathLength={100}
                strokeDasharray={arc.dasharray}
                strokeDashoffset={arc.dashoffset}
              />
            ))}
          </g>
        </svg>

        <ul className="flex min-w-0 flex-1 flex-col gap-3">
          {segments.map((seg) => (
            <li key={seg.key} className="flex items-center gap-2.5">
              <span
                className="h-4 w-4 shrink-0 rounded-md"
                style={{ backgroundColor: seg.color }}
              />
              <div className="flex min-w-0 flex-col gap-1.5 leading-none">
                <span className="text-[14px] font-bold leading-[18px] text-[#999999]">
                  {seg.label}
                </span>
                <span className="truncate text-[16px] font-bold leading-[21px] text-black">
                  {seg.display}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
