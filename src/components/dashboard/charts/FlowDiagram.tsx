// Energiya oqimi - soddalashtirilgan sankey (SVG). Chapdagi manba o'ngdagi
// tarmoqlarga bo'linadi; band kengligi ulushga proporsional.
import type { balanceFlow } from "../data";

interface FlowDiagramProps {
  flow: typeof balanceFlow;
  height?: number;
}

const W = 720;
const NODE_W = 16;
const PAD_T = 20;
const PAD_B = 20;

export function FlowDiagram({ flow, height = 300 }: FlowDiagramProps) {
  const H = height;
  const top = PAD_T;
  const usable = H - PAD_T - PAD_B;
  const gap = 8;
  const totalGap = gap * (flow.branches.length - 1);
  const scale = (usable - totalGap) / 100; // px per %

  const xL = 40;
  const xR = W - 40 - NODE_W;

  // Chap manba: to'liq balandlik (segmentlarsiz). Ofsetlar mutatsiyasiz
  // (oldingi segmentlar yig'indisi) hisoblanadi.
  const heights = flow.branches.map((b) => b.pct * scale);
  const bands = flow.branches.map((b, i) => {
    const before = heights.slice(0, i).reduce((a, h) => a + h, 0);
    const sy0 = top + before;
    const ty0 = top + before + gap * i;
    return { ...b, sy0, sy1: sy0 + heights[i]!, ty0, ty1: ty0 + heights[i]! };
  });

  const xm = (xL + NODE_W + xR) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      {/* Bandlar */}
      {bands.map((b) => (
        <path
          key={b.key}
          d={`M ${xL + NODE_W} ${b.sy0}
              C ${xm} ${b.sy0}, ${xm} ${b.ty0}, ${xR} ${b.ty0}
              L ${xR} ${b.ty1}
              C ${xm} ${b.ty1}, ${xm} ${b.sy1}, ${xL + NODE_W} ${b.sy1} Z`}
          fill={b.color}
          opacity={0.35}
        />
      ))}

      {/* Chap manba tuguni */}
      <rect x={xL} y={top} width={NODE_W} height={usable} rx={3} fill="#3B82F6" />
      <text
        x={xL - 6}
        y={top + usable / 2}
        textAnchor="end"
        fontSize="12"
        fill="#6B7178"
        fontFamily="Geist, system-ui, sans-serif"
      >
        <tspan x={xL - 6} dy="-6">Tarmoqqa</tspan>
        <tspan x={xL - 6} dy="14">kirgan</tspan>
      </text>

      {/* O'ng tugunlar + belgilar */}
      {bands.map((b) => (
        <g key={b.key}>
          <rect
            x={xR}
            y={b.ty0}
            width={NODE_W}
            height={Math.max(b.ty1 - b.ty0, 2)}
            rx={3}
            fill={b.color}
          />
          <text
            x={xR + NODE_W + 8}
            y={(b.ty0 + b.ty1) / 2 + 4}
            fontSize="12"
            fill="#333333"
            fontFamily="Geist, system-ui, sans-serif"
          >
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
