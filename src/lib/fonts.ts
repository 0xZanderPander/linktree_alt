import localFont from "next/font/local";

/**
 * Helvetica Neue Extended (Bold + Heavy) - replaces JetBrains Mono as the
 * site's primary typeface. Heavy, wide, modern-meets-hacker-box instead of
 * a monospaced terminal feel.
 *
 * Only Bold (700) and Heavy (800) weights are available - there's no
 * regular/400 weight file. That's intentional: any text requesting a
 * lighter weight than 700 will fall back to the nearest declared face
 * (Bold), so the whole site reads consistently heavy rather than mixing
 * in a thin fallback font for body copy.
 *
 * Using next/font/local (rather than a raw @font-face + url() in CSS)
 * so the static export's GitHub Pages basePath is applied correctly to
 * the generated font URLs automatically.
 */
export const helveticaNeueExt = localFont({
  src: [
    {
      path: "../fonts/HelveticaNeueBoldExt.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueHeavyExt.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-ext",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});
