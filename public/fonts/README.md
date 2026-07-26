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

Four faces, self-hosted so nothing is fetched from a third party at runtime:

| File | Face |
|---|---|
| `cmu-serif-regular.woff2` | CMU Serif roman — body text |
| `cmu-serif-italic.woff2` | CMU Serif italic — emphasis, math variables |
| `cmu-serif-bold.woff2` | CMU Serif bold — headings |
| `cmu-typewriter-regular.woff2` | CMU Typewriter Text — metadata, labels, code |

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
