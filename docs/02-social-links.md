# Social Links

<!-- AI_CONTEXT
Component: src/components/OurLinks.tsx
Config: siteConfig.socialLinks
CSS: src/app/globals.css (classes: .link-card, .link-card-icon, .our-links-carousel, .our-links-arrow)
Assets: None (icons are inline SVGs built into the component)
Constraints: Max 5 links recommended. The icon field must match a key in the iconMap (line 220-232 of OurLinks.tsx). Unsupported values fall back to "custom" (generic link icon).
-->

> **Component:** `src/components/OurLinks.tsx`
> **Config:** `siteConfig.socialLinks`

## What This Section Does

The Social Links section displays a row of square cards, each showing a platform icon, title, and handle. On mobile (under 600px) it becomes a horizontally scrollable carousel with gradient overlays and arrow navigation. On desktop it renders as an equal-width grid where all cards are visible at once. Each card links to an external URL.

## File Map

| File | Purpose |
|------|---------|
| `src/components/OurLinks.tsx` | Component logic, icon definitions, carousel/grid rendering |
| `src/config/site.config.ts` | `socialLinks` array |
| `src/app/globals.css` | `.link-card`, `.our-links-carousel`, `.our-links-arrow` styles |

## Configuration

### SocialLink interface

```ts
interface SocialLink {
  id: string;        // Unique identifier
  platform: string;  // Platform name (for reference, not displayed)
  title: string;     // Displayed name on the card (e.g., "Github")
  handle: string;    // Displayed handle below the name (e.g., "@opensesh")
  url: string;       // URL the card links to
  icon: string;      // Icon type — must match a supported value (see table below)
}
```

### Supported icon values

| Value | Platform |
|-------|----------|
| `github` | GitHub |
| `twitter` | Twitter / X |
| `linkedin` | LinkedIn |
| `instagram` | Instagram |
| `youtube` | YouTube |
| `tiktok` | TikTok |
| `substack` | Substack |
| `medium` | Medium |
| `figma` | Figma |
| `dribbble` | Dribbble |
| `custom` | Generic link icon (fallback) |

All icons are stroke-based SVGs built into the component. Using an unrecognized icon value automatically falls back to `custom`.

### Default values

```ts
socialLinks: [
  {
    id: "figma",
    platform: "figma",
    title: "Figma",
    handle: "@opensession",
    url: "https://link.opensession.co/website-figma",
    icon: "figma",
  },
  {
    id: "github",
    platform: "github",
    title: "Github",
    handle: "@opensesh",
    url: "https://link.opensession.co/website-github",
    icon: "github",
  },
  {
    id: "substack",
    platform: "substack",
    title: "Substack",
    handle: "@opensession",
    url: "https://link.opensession.co/website-substack",
    icon: "substack",
  },
  {
    id: "instagram",
    platform: "instagram",
    title: "Insta",
    handle: "@opensession.co",
    url: "https://link.opensession.co/website-instagram",
    icon: "instagram",
  },
  {
    id: "medium",
    platform: "medium",
    title: "Medium",
    handle: "@opensession",
    url: "https://link.opensession.co/website-medium",
    icon: "medium",
  },
],
```

## How to Customize

1. **Replace all social links** — Edit the `socialLinks` array in `src/config/site.config.ts`. Each object in the array becomes one card.
2. **Add or remove links** — Add or remove objects from the array. Up to 5 is recommended; more will work but cards become narrow on desktop.
3. **Change a platform icon** — Set the `icon` field to one of the supported values in the table above.
4. **Use an unsupported platform** — Set `icon` to `"custom"` for a generic link icon.
5. **Change the section heading** — The heading "Links" is hardcoded on line 307 of `OurLinks.tsx`. Edit the component directly to change it.

## Example AI Prompts

Copy-paste these to an AI assistant to customize this section:

> **Config-only** — "Replace all social links with just three: Twitter (@myhandle, https://twitter.com/myhandle), GitHub (@myuser, https://github.com/myuser), and LinkedIn (/in/myname, https://linkedin.com/in/myname)."

> **Config-only** — "Add a YouTube link as the 5th social card. My channel URL is https://youtube.com/@mychannel, display name 'YouTube', handle '@mychannel'."

> **Config-only** — "Change the Instagram handle from @opensession.co to @mynewhandle and update the URL to https://instagram.com/mynewhandle."

> **Config-only** — "Add a link to my personal website using the custom icon. Title it 'Website', handle '@me', URL https://example.com."

> **Component edit** — "Change the social links section heading from 'Links' to 'Connect With Me'."

---

*[Back to index](README.md)*
