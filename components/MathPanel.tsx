/**
 * Decorative-but-honest math panel for the landing page.
 *
 * The figure is the unit circle in the complex plane: e^(iθ) traces it, so at
 * θ = π it lands exactly on −1 — which rearranges into Euler's identity typeset
 * below. Everything is hairline strokes at low opacity so it reads as texture
 * beside the text rather than competing with it.
 *
 * Purely ornamental to a screen reader (aria-hidden) — nothing here is content
 * the reader would miss.
 */

const CX = 190;
const CY = 205;
const R = 112;

/** Small serif label, math convention: variables italic, digits upright. */
function Tick({ x, y, children, anchor = "middle" }: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={12}
      fontFamily="var(--prose)"
      fontStyle="italic"
      fill="currentColor"
      opacity={0.75}
    >
      {children}
    </text>
  );
}

export function MathPanel() {
  return (
    <svg
      className="math-art"
      viewBox="0 0 380 600"
      aria-hidden="true"
      focusable="false"
    >
      {/* ---- unit circle in the complex plane ---- */}
      <g stroke="currentColor" fill="none">
        {/* axes, drawn past the circle so it sits in a plane not a box */}
        <g opacity={0.28} strokeWidth={1}>
          <line x1={CX - R - 34} y1={CY} x2={CX + R + 34} y2={CY} />
          <line x1={CX} y1={CY - R - 34} x2={CX} y2={CY + R + 34} />
        </g>

        {/* the circle itself */}
        <circle cx={CX} cy={CY} r={R} opacity={0.5} strokeWidth={1.25} />

        {/* faint inscribed square + diagonals — the geometry under the algebra */}
        <g opacity={0.13} strokeWidth={1}>
          <rect
            x={CX - R * Math.SQRT1_2}
            y={CY - R * Math.SQRT1_2}
            width={R * Math.SQRT2}
            height={R * Math.SQRT2}
          />
          <line
            x1={CX - R * Math.SQRT1_2}
            y1={CY - R * Math.SQRT1_2}
            x2={CX + R * Math.SQRT1_2}
            y2={CY + R * Math.SQRT1_2}
          />
          <line
            x1={CX - R * Math.SQRT1_2}
            y1={CY + R * Math.SQRT1_2}
            x2={CX + R * Math.SQRT1_2}
            y2={CY - R * Math.SQRT1_2}
          />
        </g>

        {/* the rotating radius — e^(iθ) sweeping the circle */}
        <g className="orbit" opacity={0.55}>
          <line x1={CX} y1={CY} x2={CX + R} y2={CY} strokeWidth={1.25} />
          <circle
            cx={CX + R}
            cy={CY}
            r={3.5}
            fill="var(--accent)"
            stroke="none"
            opacity={0.9}
          />
        </g>
      </g>

      {/* axis labels */}
      <g>
        <Tick x={CX + R + 16} y={CY - 8}>
          1
        </Tick>
        <Tick x={CX - R - 16} y={CY - 8}>
          −1
        </Tick>
        <Tick x={CX + 14} y={CY - R - 14}>
          i
        </Tick>
        <Tick x={CX + 16} y={CY + R + 22}>
          −i
        </Tick>
      </g>

      {/* θ = π lands on −1: the whole point, marked on the figure */}
      <circle cx={CX - R} cy={CY} r={3.5} fill="currentColor" opacity={0.8} />
      <text
        x={CX - R - 4}
        y={CY + 26}
        textAnchor="end"
        fontSize={13}
        fontFamily="var(--prose)"
        fontStyle="italic"
        fill="currentColor"
        opacity={0.65}
      >
        e
        <tspan dy={-5} fontSize={9}>
          iπ
        </tspan>
      </text>

      {/* ---- Euler's identity ---- */}
      <text
        x={190}
        y={392}
        textAnchor="middle"
        fontSize={34}
        fontFamily="var(--prose)"
        fill="currentColor"
        opacity={0.85}
      >
        <tspan fontStyle="italic">e</tspan>
        <tspan dy={-13} fontSize={20} fontStyle="italic">
          iπ
        </tspan>
        <tspan dy={13}> + 1 = 0</tspan>
      </text>

      {/* ---- two more, quieter ---- */}
      <g
        fontFamily="var(--prose)"
        fill="currentColor"
        textAnchor="middle"
        opacity={0.34}
      >
        <text x={190} y={468} fontSize={15}>
          <tspan fontStyle="italic">x</tspan>
          <tspan dy={-6} fontSize={10} fontStyle="italic">
            n
          </tspan>
          <tspan dy={6}> + </tspan>
          <tspan fontStyle="italic">y</tspan>
          <tspan dy={-6} fontSize={10} fontStyle="italic">
            n
          </tspan>
          <tspan dy={6}> = </tspan>
          <tspan fontStyle="italic">z</tspan>
          <tspan dy={-6} fontSize={10} fontStyle="italic">
            n
          </tspan>
        </text>
        <text x={190} y={492} fontSize={10} fontFamily="var(--mono)" opacity={0.8}>
          no solutions for n &gt; 2
        </text>

        <text x={190} y={548} fontSize={15}>
          <tspan fontSize={19}>Σ</tspan>
          <tspan> 1/</tspan>
          <tspan fontStyle="italic">n</tspan>
          <tspan dy={-6} fontSize={10}>
            2
          </tspan>
          <tspan dy={6}> = π</tspan>
          <tspan dy={-6} fontSize={10}>
            2
          </tspan>
          <tspan dy={6}>/6</tspan>
        </text>
      </g>
    </svg>
  );
}
