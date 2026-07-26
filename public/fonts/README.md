# Fonts

Computer Modern (CMU Unicode), Donald Knuth's TeX typeface as digitised by the
CM-Unicode project. This is why the site reads like a paper.

- **Licence:** SIL Open Font License (OFL).
  <https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL>
- **Upstream:** <https://cm-unicode.sourceforge.io/>
- **Webfont conversion:** the `computer-modern` npm package
  (<https://github.com/stevenpetryk/computer-modern>), which repackages the
  originals as WOFF2 without modifying the outlines.

## What's here

Self-hosted so nothing is fetched from a third party at runtime.

**In use — Concrete Roman.** Knuth cut Concrete for *Concrete Mathematics*
because Computer Modern's hairlines were too light on the page; the same is true
on a backlit screen. Same skeleton, sturdier strokes.

| File | Face |
|---|---|
| `cmu-concrete-regular.woff2` | Concrete roman — body text |
| `cmu-concrete-italic.woff2` | Concrete italic — emphasis, math variables |
| `cmu-concrete-bold.woff2` | Concrete bold — headings |
| `cmu-typewriter-regular.woff2` | CMU Typewriter Text — metadata, labels, code |

**Also present, not in use — plain Computer Modern.** Kept so the choice is
reversible: swap `"CMU Concrete"` for `"CMU Serif"` in the `--display` and
`--prose` tokens in `app/globals.css`, and repoint the two preload links in
`app/layout.tsx`. Browsers don't download a declared face that nothing uses, so
these cost nothing at runtime.

| File | Face |
|---|---|
| `cmu-serif-regular.woff2` | CMU Serif roman |
| `cmu-serif-italic.woff2` | CMU Serif italic |
| `cmu-serif-bold.woff2` | CMU Serif bold |

## Why `font-display: optional`

Not `swap`. With `swap`, text painted in the fallback serif and then reflowed
when the real face arrived; the two have different advance widths, so the reflow
changed line breaks — a measurable layout shift (0.014 on the article page with
fonts delayed 700ms).

`optional` lets the browser use a face only if it arrives before paint, and
forbids swapping afterwards, so the shift cannot occur on any device. Measured
0.000 on both pages after the change, with the real faces still in use.

The alternative was a metrics-matched fallback (`size-adjust`, `ascent-override`).
Rejected: the correct `size-adjust` depends on which serif the reader's OS
supplies — Georgia, Times and Noto Serif all differ — so it can only ever be
tuned for one of them. And since the stylesheet sets `line-height` as a unitless
number throughout, line boxes are already independent of font metrics, so the
vertical overrides would have bought nothing.

The trade-off: on a genuinely slow first load the page renders in a fallback
serif for that view. All four faces are preloaded in `app/layout.tsx` to keep
that rare, and once cached the real faces are always used.

## Subsetting

These are subsets, not the full fonts: 792 KB reduced to 180 KB. Regenerate with
`pyftsubset` (`pip install fonttools brotli`) if you need more coverage:

```sh
pyftsubset cmu-serif-500-roman.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+0370-03FF,U+2000-206F,U+20AC,U+2122,U+2190-21FF,U+2200-22FF,U+2C60-2C7F" \
  --layout-features="kern,liga" --flavor=woff2 --output-file=cmu-serif-regular.woff2
```

The range covers Latin-1 (so Swedish vowels work), Greek (π, θ, Σ), general
punctuation, arrows, and mathematical operators.

**Known gaps:** the upstream fonts have no `∑` (U+2211), `≤`, `≥`, `≠`, or `∈` —
TeX keeps those in separate math fonts. They fall back to a system serif. Use the
Greek `Σ` (U+03A3) instead of `∑`, which is what `components/MathPanel.tsx` does.
