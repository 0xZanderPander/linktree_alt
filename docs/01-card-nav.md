# Card Nav Header

<!-- AI_CONTEXT
Component: src/components/CardNav.tsx
Config: siteConfig.nav, siteConfig.branding (logo, logoAlt, websiteUrl)
CSS: src/app/globals.css (classes: .nav-card, .nav-card-text, .nav-card-arrow)
Assets: public/images/ (logo files)
Constraints: Exactly 3 nav items for the desktop grid layout (md:grid-cols-3). branding.logo can be a string path or null.
-->

> **Component:** `src/components/CardNav.tsx`
> **Config:** `siteConfig.nav` and `siteConfig.branding`

## What This Section Does

The Card Nav is a fixed-position header bar with three elements: a hamburger menu (left), a centered logo, and a globe icon (right). Clicking the hamburger animates it into an X and expands a panel revealing navigation cards — one card per nav item. On desktop the panel is a 3-column grid; on mobile the cards stack vertically. A blurred overlay covers the page behind the open menu.

## File Map

| File | Purpose |
|------|---------|
| `src/components/CardNav.tsx` | Component logic and GSAP animations |
| `src/config/site.config.ts` | `nav` array and `branding` object |
| `src/app/globals.css` | `.nav-card`, `.nav-card-text`, `.nav-card-arrow` hover styles |
| `public/images/` | Logo image files |

## Configuration

### NavItem interface

```ts
interface NavItem {
  id: string;    // Unique identifier
  label: string; // Text displayed on the card
  href: string;  // URL the card links to (opens in new tab)
}
```

### Branding fields used by CardNav

```ts
branding: {
  logo: string | null;  // Path to logo image, or null to show text
  logoAlt: string;      // Alt text for logo / fallback text when logo is null
  websiteUrl: string;   // URL linked from the globe icon
}
```

### Default values

```ts
nav: [
  { id: "nav-1", label: "Insert", href: "#" },
  { id: "nav-2", label: "Insert", href: "#" },
  { id: "nav-3", label: "Insert", href: "#" },
],

branding: {
  logo: "/images/logo_wordmark_charcoal.svg",
  logoAlt: "Open Session",
  websiteUrl: "https://opensession.co",
}
```

## How to Customize

1. **Replace the logo** — Drop your logo file in `public/images/` and update `branding.logo` to its path (e.g., `"/images/my-logo.svg"`). The logo renders at 32px height on mobile, 36px on desktop.
2. **Use text instead of a logo** — Set `branding.logo` to `null`. The component will display `branding.logoAlt` as bold text instead.
3. **Update nav card labels and links** — Edit the `nav` array in `site.config.ts`. Each entry becomes one card. Keep exactly 3 entries for the desktop grid layout.
4. **Change the globe icon link** — Update `branding.websiteUrl` to your website URL.

## Example AI Prompts

Copy-paste these to an AI assistant to customize this section:

> **Config-only** — "Update the three navigation cards to: 'About' linking to https://example.com/about, 'Portfolio' linking to https://example.com/work, and 'Contact' linking to https://example.com/contact."

> **Config + Assets** — "Replace the header logo with my logo file `my-brand.svg` (I've added it to public/images/). Set the alt text to 'My Brand' and the globe icon to link to https://mybrand.com."

> **Config-only** — "Remove the logo and show my brand name 'Alex Studio' as text in the header instead."

> **Component edit** — "Change the header background from vanilla to charcoal, and make the hamburger lines and logo text vanilla-colored instead."

---

*[Back to index](README.md)*
