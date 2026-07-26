import { Fragment } from "react";

import { datasets, fit, sharedStats, type Dataset, type Point } from "@/data/anscombe";

const X_MAX = 20;
const Y_MAX = 14;

const BOX = { w: 320, h: 240 };
const PAD = { top: 10, right: 12, bottom: 26, left: 30 };

const plotW = BOX.w - PAD.left - PAD.right;
const plotH = BOX.h - PAD.top - PAD.bottom;

const sx = (x: number) => PAD.left + (x / X_MAX) * plotW;
const sy = (y: number) => PAD.top + plotH - (y / Y_MAX) * plotH;

const X_TICKS = [0, 5, 10, 15, 20];
const Y_TICKS = [0, 5, 10];

type ScatterProps = {
  points: Point[];
  showFit: boolean;
  /** Compact variant for the small-multiples grid. */
  small?: boolean;
  labelFit?: boolean;
};

function Scatter({ points, showFit, small = false, labelFit = false }: ScatterProps) {
  /* The small-multiple SVGs render at roughly two-thirds scale, so the radius and
     stroke are pre-divided to keep markers at or above the 8px minimum on screen. */
  const r = small ? 6.5 : 4.5;
  const fitWidth = small ? 3 : 2;

  return (
    <svg
      className="figure-svg"
      viewBox={`0 0 ${BOX.w} ${BOX.h}`}
      role="img"
      aria-label="Scatterplot"
    >
      {/* Recessive grid — reference only, never competing with the marks. */}
      <g stroke="var(--viz-grid)" strokeWidth={1}>
        {Y_TICKS.map((t) => (
          <line key={`y${t}`} x1={PAD.left} x2={PAD.left + plotW} y1={sy(t)} y2={sy(t)} />
        ))}
      </g>

      {!small && (
        <g
          fill="var(--ink-muted)"
          fontSize={9}
          fontFamily="var(--mono)"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {Y_TICKS.map((t) => (
            <text key={`yl${t}`} x={PAD.left - 7} y={sy(t) + 3} textAnchor="end">
              {t}
            </text>
          ))}
          {X_TICKS.map((t) => (
            <text key={`xl${t}`} x={sx(t)} y={BOX.h - PAD.bottom + 14} textAnchor="middle">
              {t}
            </text>
          ))}
          <text x={PAD.left + plotW / 2} y={BOX.h - 2} textAnchor="middle" fontSize={8.5}>
            x
          </text>
          <text
            x={10}
            y={PAD.top + plotH / 2}
            textAnchor="middle"
            fontSize={8.5}
            transform={`rotate(-90 10 ${PAD.top + plotH / 2})`}
          >
            y
          </text>
        </g>
      )}

      {/* The shared least-squares fit, identical for all four datasets. */}
      {showFit && (
        <line
          x1={sx(0)}
          y1={sy(fit.intercept)}
          x2={sx(X_MAX)}
          y2={sy(fit.intercept + fit.slope * X_MAX)}
          stroke="var(--viz-series-2)"
          strokeWidth={fitWidth}
          strokeLinecap="round"
        />
      )}

      {showFit && labelFit && !small && (
        <text
          x={sx(X_MAX) - 4}
          y={sy(fit.intercept + fit.slope * X_MAX) - 8}
          textAnchor="end"
          fontSize={9}
          fontFamily="var(--mono)"
          fill="var(--viz-series-2)"
        >
          y = 3 + 0.5x
        </text>
      )}

      {/* Dots last so they sit above the line, each with a surface ring. */}
      <g fill="var(--viz-series-1)" stroke="var(--viz-surface)" strokeWidth={small ? 3 : 2}>
        {points.map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={r}>
            <title>{`x ${p.x}, y ${p.y}`}</title>
          </circle>
        ))}
      </g>
    </svg>
  );
}

function Legend({ withFit }: { withFit: boolean }) {
  return (
    <ul className="figure-legend">
      <li>
        <span className="legend-swatch" style={{ background: "var(--viz-series-1)" }} />
        Observations
      </li>
      {withFit && (
        <li>
          <span
            className="legend-swatch is-line"
            style={{ background: "var(--viz-series-2)" }}
          />
          Least-squares fit
        </li>
      )}
    </ul>
  );
}

function Card({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="figure-card">
      <p className="figure-title">{title}</p>
      <p className="figure-sub">{sub}</p>
      {children}
    </div>
  );
}

/**
 * The figure for the Anscombe piece. `step` maps to narrative position:
 *   0  dataset I, bare
 *   1  dataset I with the fit line
 *   2  the identical summary statistics
 *   3  dataset II
 *   4  dataset III
 *   5  dataset IV
 *   6+ all four together
 */
export function AnscombeFigure({ step }: { step: number }) {
  if (step === 2) {
    return (
      <Card title="Summary statistics" sub="Identical across all four datasets">
        <dl className="stat-grid">
          {sharedStats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    );
  }

  if (step >= 6) {
    return (
      <Card title="All four at once" sub="Same statistics, four different stories">
        <div className="small-multiples">
          {datasets.map((d) => (
            <div key={d.id}>
              <p className="figure-sub" style={{ margin: "0 0 0.15rem" }}>
                {d.label}
              </p>
              <Scatter points={d.points} showFit small />
            </div>
          ))}
        </div>
        <Legend withFit />
      </Card>
    );
  }

  const byStep: Record<number, Dataset> = {
    0: datasets[0],
    1: datasets[0],
    3: datasets[1],
    4: datasets[2],
    5: datasets[3],
  };
  const active = byStep[step] ?? datasets[0];
  const showFit = step !== 0;

  return (
    <Card
      title={active.label}
      sub={showFit ? "With the shared fit line" : "Eleven observations"}
    >
      <Scatter points={active.points} showFit={showFit} labelFit={step === 1} />
      <Legend withFit={showFit} />
    </Card>
  );
}

/** The table read of the whole quartet — the accessible equivalent of the figures. */
export function AnscombeTable() {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <caption>
          Anscombe&rsquo;s quartet in full. Every dataset has eleven x/y pairs.
        </caption>
        <thead>
          <tr>
            <th scope="col">n</th>
            {datasets.map((d) => (
              <th key={d.id} scope="col" colSpan={2}>
                {d.label}
              </th>
            ))}
          </tr>
          <tr>
            {/* Corner cell heads nothing — a th here reads as an empty header. */}
            <td />
            {datasets.map((d) => (
              <Fragment key={d.id}>
                <th scope="col">x</th>
                <th scope="col">y</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {datasets[0].points.map((_, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              {datasets.map((d) => (
                <Fragment key={d.id}>
                  <td>{d.points[i].x}</td>
                  <td>{d.points[i].y}</td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
