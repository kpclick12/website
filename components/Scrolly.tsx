"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ScrollyProps = {
  /**
   * Renders the pinned graphic. Receives the index of the step currently
   * centred in the viewport, so the figure can respond to narrative position.
   */
  figure: (activeStep: number) => ReactNode;
  /** One entry per step, in reading order. */
  steps: ReactNode[];
};

/**
 * Sticky-figure scrollytelling.
 *
 * The figure is pinned for the height of the step stack; each step reports when
 * it crosses the middle of the viewport and the newest crossing wins. Uses a
 * band around the viewport midline rather than a single line so that short steps
 * on small screens still register.
 */
export function Scrolly({ figure, steps }: ScrollyProps) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      stepRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const nodes = stepRefs.current.filter((n): n is HTMLDivElement => !!n);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Of everything currently intersecting the midline band, take the last
        // in document order — that's the one the reader has scrolled into.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.stepIndex))
          .filter((n) => !Number.isNaN(n));

        if (visible.length > 0) {
          setActive(Math.max(...visible));
        }
      },
      {
        // A thin horizontal band across the vertical centre of the viewport.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="scrolly">
      <div className="scrolly-figure" aria-hidden="true">
        {figure(active)}
      </div>

      <div className="scrolly-steps">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={setStepRef(i)}
            data-step-index={i}
            data-active={i === active}
            className="scrolly-step"
          >
            <div>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Thin progress bar showing how far through the article the reader is. */
export function ReadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="reading-bar"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-label="Article progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
