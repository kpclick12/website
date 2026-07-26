/**
 * The site wordmark: (x)plain
 *
 * Reads as "explain" — x is pronounced "ex" — while the parentheses and the
 * italic variable are ordinary mathematical notation. Italic x is deliberate:
 * that is how a variable is set, so the maths reads as maths.
 *
 * The glyphs carry no accessible text on their own, so callers pass
 * aria-label="explain" on the wrapping element.
 */
export function Wordmark() {
  return (
    <span className="wm">
      <span className="wm-paren">(</span>
      <span className="wm-var">x</span>
      <span className="wm-paren">)</span>
      <span className="wm-word">plain</span>
    </span>
  );
}
