/**
 * Anscombe's quartet — F. J. Anscombe, "Graphs in Statistical Analysis",
 * The American Statistician 27 (1) 1973, pp. 17-21.
 *
 * Four x/y sets constructed so that every standard summary statistic agrees:
 * mean x = 9, mean y = 7.50, sample variance x = 11, sample variance y ~ 4.13,
 * Pearson r ~ 0.816, and least-squares fit y = 3 + 0.5x for all four.
 * Real published figures, reproduced exactly — not synthesised.
 */

export type Point = { x: number; y: number };

const xCommon = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];

function zip(xs: number[], ys: number[]): Point[] {
  return xs.map((x, i) => ({ x, y: ys[i] }));
}

export type Dataset = {
  id: string;
  label: string;
  /** What the eye sees that the statistics hide. */
  shape: string;
  points: Point[];
};

export const datasets: Dataset[] = [
  {
    id: "i",
    label: "Dataset I",
    shape: "A plain, slightly noisy linear relationship — the one everybody assumes they have.",
    points: zip(
      xCommon,
      [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68],
    ),
  },
  {
    id: "ii",
    label: "Dataset II",
    shape: "A clean curve. There is a perfect relationship here, and it is not a straight one.",
    points: zip(
      xCommon,
      [9.14, 8.14, 8.74, 8.77, 9.26, 8.1, 6.13, 3.1, 9.13, 7.26, 4.74],
    ),
  },
  {
    id: "iii",
    label: "Dataset III",
    shape: "Ten points on an exact line, plus one outlier that drags the fit off it.",
    points: zip(
      xCommon,
      [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73],
    ),
  },
  {
    id: "iv",
    label: "Dataset IV",
    shape: "Every x is 8 except one. A single point at x = 19 invents the entire slope.",
    points: zip(
      [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8],
      [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.5, 5.56, 7.91, 6.89],
    ),
  },
];

/** The shared least-squares fit: y = 3 + 0.5x. */
export const fit = { intercept: 3, slope: 0.5 };

/** The summary statistics that are identical across all four sets. */
export const sharedStats = [
  { label: "Mean of x", value: "9.00" },
  { label: "Mean of y", value: "7.50" },
  { label: "Variance of x", value: "11.00" },
  { label: "Variance of y", value: "4.13" },
  { label: "Correlation", value: "0.816" },
  { label: "Fit line", value: "y = 3 + 0.5x" },
];
