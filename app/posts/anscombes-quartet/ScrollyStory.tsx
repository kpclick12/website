"use client";

import { AnscombeFigure } from "@/components/AnscombeFigure";
import { ReadingBar, Scrolly } from "@/components/Scrolly";
import { datasets } from "@/data/anscombe";

/**
 * The scroll-driven middle of the piece. Step order has to stay in sync with the
 * `step` mapping documented in AnscombeFigure.
 */
export function ScrollyStory() {
  return (
    <>
      <ReadingBar />
      <Scrolly
        figure={(step) => <AnscombeFigure step={step} />}
        steps={[
          <>
            <p className="step-label">Dataset I</p>
            <p>
              Eleven points. x runs from 4 to 14, y from about 4 to 11. Nothing
              unusual — the kind of scatter you would happily fit a line through.
            </p>
          </>,
          <>
            <p className="step-label">The fit</p>
            <p>
              So fit one: <strong>y = 3 + 0.5x</strong>. It sits where you would
              expect. Correlation is 0.816, which most people would call a decent
              linear relationship and move on.
            </p>
          </>,
          <>
            <p className="step-label">The summaries</p>
            <p>
              Here is every number you would normally report. Hold on to them,
              because they are about to stop being useful.
            </p>
            <p>
              All four of Anscombe&rsquo;s datasets produce{" "}
              <strong>exactly these values</strong>.
            </p>
          </>,
          <>
            <p className="step-label">Dataset II</p>
            <p>{datasets[1].shape}</p>
            <p>
              The fit line is unchanged, and it is now describing something that
              plainly is not a line. A model that misses this is not slightly off;
              it is answering a different question.
            </p>
          </>,
          <>
            <p className="step-label">Dataset III</p>
            <p>{datasets[2].shape}</p>
            <p>
              Ten of these points would give you a near-perfect straight fit. The
              eleventh tilts the line away from every one of them — and the
              correlation still reads 0.816.
            </p>
          </>,
          <>
            <p className="step-label">Dataset IV</p>
            <p>{datasets[3].shape}</p>
            <p>
              There is no relationship between x and y here at all. There cannot
              be — x barely varies. The slope is manufactured entirely by one point
              standing far to the right.
            </p>
          </>,
          <>
            <p className="step-label">All four</p>
            <p>
              Same mean, same variance, same correlation, same fit line. A curve, a
              line with an outlier, a vertical stack, and one genuinely linear
              cloud.
            </p>
            <p>
              The statistics agreed the whole way down. Only the picture
              disagreed.
            </p>
          </>,
        ]}
      />
    </>
  );
}
