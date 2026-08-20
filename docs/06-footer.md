# Footer

<!-- AI_CONTEXT
Component: src/components/Footer.tsx
Config: siteConfig.branding (tagline, email, websiteUrl, copyrightYear)
CSS: Styled inline and with Tailwind — no custom CSS classes
Assets: None
Constraints: The link text "Website link here" on line 22 of Footer.tsx is hardcoded — not configurable from site.config.ts. Changing it requires editing the component. The "Made with love™" text is also hardcoded.
-->

> **Component:** `src/components/Footer.tsx`
> **Config:** `siteConfig.branding`

## What This Section Does

The Footer is a full-width charcoal bar at the bottom of the page with two columns. The left column shows your tagline with an inline link to your website (with an animated arrow icon on hover), plus your email as a clickable `mailto:` link. The right column displays "Made with love(tm)" and a copyright line. On mobile the columns stack vertically.

## File Map

| File | Purpose |
|------|---------|
| `src/components/Footer.tsx` | Footer component (52 lines) |
| `src/config/site.config.ts` | `branding` object fields used by footer |

## Configuration

### Branding fields used by the Footer

```ts
branding: {
  tagline: string;       // Left column tagline text
  email: string;         // Contact email (rendered as mailto: link)
  websiteUrl: string;    // URL linked from the inline website text
  copyrightYear: string; // Year in copyright line (e.g., "2024")
}
```

### Default values

```ts
branding: {
  tagline: "Your tagline goes here.",
  email: "hello@example.com",
  websiteUrl: "https://opensession.co",
  copyrightYear: "2024",
}
```

## Hardcoded Text

Two pieces of text in the footer are **not** configurable from the config file:

1. **"Website link here"** (line 22) — The anchor text for the website link that appears after the tagline. To change this, edit `src/components/Footer.tsx` directly.
2. **"Made with love(tm)"** — The branding text in the right column. To change this, edit the component directly.

## How to Customize

1. **Update tagline** — Change `branding.tagline` in `site.config.ts`.
2. **Update email** — Change `branding.email`. It renders as a clickable `mailto:` link.
3. **Update website URL** — Change `branding.websiteUrl`. This is the link target for the inline text after the tagline.
4. **Update copyright year** — Change `branding.copyrightYear` (e.g., `"2025"` or `"2024-2025"`).
5. **Change the website link text** — Edit line 22 of `src/components/Footer.tsx`, replacing `"Website link here"` with your desired text.

## Example AI Prompts

Copy-paste these to an AI assistant to customize this section:

> **Config-only** — "Update the footer with my tagline 'Building tools for creators', email 'contact@mybrand.com', website URL 'https://mybrand.com', and copyright year '2025'."

> **Component edit** — "Change the footer's 'Website link here' text to say 'Visit our website' in src/components/Footer.tsx."

> **Component edit** — "Replace the 'Made with love™' text in the footer with 'Built by My Team'."

> **Config-only** — "Change the footer email to hello@studio.dev and the copyright year to 2024-2025."

---

*[Back to index](README.md)*
