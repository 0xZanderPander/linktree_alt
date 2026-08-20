# Tools / Tech Stack

<!-- AI_CONTEXT
Component: src/components/TechStack.tsx
Config: siteConfig.tools (array of Tool objects with TagData), also CATEGORY_COLORS and COMMON_TAG_STYLES constants in site.config.ts
CSS: No custom CSS classes — styled inline and with Tailwind
Assets: public/icons/tech/command/ (tool icons, PNG recommended, 100x100px or larger)
Constraints: Up to 16 tool slots. Default selection is index 7 (or last item if fewer). Icons should be PNG at 100x100+ for sharp rendering. The smallIcon flag renders unselected icons at 57x57px instead of filling the 72px container.
-->

> **Component:** `src/components/TechStack.tsx`
> **Config:** `siteConfig.tools`

## What This Section Does

The Tools section is an iOS Command Center-style carousel. A horizontal strip of tool icons sits at the top — the selected icon is larger (100px) while others are smaller (72px). Below the icons, a detail panel shows the selected tool's name (which links to its URL), a description, and colored category tags. Users can navigate with left/right arrows, click icons directly, use arrow keys, or scroll/swipe the icon strip. The selection auto-centers with a smooth scroll animation.

## File Map

| File | Purpose |
|------|---------|
| `src/components/TechStack.tsx` | Carousel component with Framer Motion and scroll-snap |
| `src/config/site.config.ts` | `tools` array, `CATEGORY_COLORS`, `COMMON_TAG_STYLES` |
| `public/icons/tech/command/` | Tool icon files |

## Configuration

### Tool interface

```ts
interface Tool {
  id: string;           // Unique identifier
  name: string;         // Tool name (displayed in detail panel, links to url)
  icon: string;         // Path to icon file (relative to public/)
  url: string;          // URL opened when the tool name is clicked
  description: string;  // 2-3 sentence description
  tags: TagData[];      // Category tags (see below)
  smallIcon?: boolean;  // Optional: render unselected icon at 57x57px
}

interface TagData {
  label: string;  // Tag text (e.g., "Productivity")
  bg: string;     // Background color (hex)
  text: string;   // Text color (hex)
}
```

### Pre-defined tag helpers

The config file includes two helpers for consistent tag styling:

```ts
// Category colors for primary tags (white text on colored background)
const CATEGORY_COLORS = {
  Productivity: "#5326ab",  // Purple
  Design: "#e64400",        // Orange
  Coding: "#007acc",        // Blue
  Content: "#158f4a",       // Green
};

// Neutral style for secondary tags (dark text on light background)
const COMMON_TAG_STYLES = { bg: "#f5f5f5", text: "#414651" };
```

Use them like this:

```ts
tags: [
  { label: "Productivity", bg: CATEGORY_COLORS.Productivity, text: "#fff" },
  { label: "Notes", ...COMMON_TAG_STYLES },
]
```

### Default values (first 3 shown)

```ts
tools: [
  {
    id: "claude",
    name: "Claude",
    icon: "/icons/tech/command/claude.png",
    url: "https://claude.ai",
    description: "Go-to AI assistant for coding, writing, and research.",
    tags: [
      { label: "Productivity", bg: "#5326ab", text: "#fff" },
      { label: "AI", bg: "#f5f5f5", text: "#414651" },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "/icons/tech/command/cursor.png",
    url: "https://cursor.com",
    description: "Primary IDE with AI-powered code completion.",
    tags: [
      { label: "Coding", bg: "#007acc", text: "#fff" },
      { label: "IDE", bg: "#f5f5f5", text: "#414651" },
    ],
  },
  // ... up to 16 total
]
```

## Icon Requirements

- **Format:** PNG recommended (renders as-is with no color transformations). SVGs work but get a CSS invert filter applied.
- **Size:** 100x100px or larger for sharp display at the selected-state size.
- **Location:** Place files in `public/icons/tech/command/`.
- **Path in config:** Use the path relative to `public/` (e.g., `"/icons/tech/command/my-tool.png"`).
- **`smallIcon` flag:** Set to `true` for icons that have built-in padding. This renders unselected icons at 57x57px instead of filling the full 72px container, preventing visual bloat.

## How to Customize

1. **Replace the tool list** — Edit the `tools` array in `site.config.ts`. Each object becomes one icon in the carousel.
2. **Add a tool** — Add a new object to the array and drop the icon PNG in `public/icons/tech/command/`.
3. **Remove a tool** — Delete the object from the array.
4. **Change tag colors** — Edit `CATEGORY_COLORS` values in `site.config.ts`, or use inline hex values on individual tags.
5. **Add a new category** — Add a new key to `CATEGORY_COLORS` (e.g., `Marketing: "#d946ef"`) and reference it in tag objects.
6. **Change the default selection** — The component defaults to index 7. Edit line 12 of `TechStack.tsx` to change: `const defaultIndex = Math.min(YOUR_INDEX, techStack.length - 1);`
7. **Change the section heading** — The heading "Tools" is hardcoded on line 154 of `TechStack.tsx`. Edit the component directly to change it.

## Example AI Prompts

Copy-paste these to an AI assistant to customize this section:

> **Config + Assets** — "Replace the entire tech stack with these 8 tools: VS Code, Figma, Notion, Slack, Linear, Vercel, Supabase, and Tailwind CSS. I've added icon PNGs for each to public/icons/tech/command/. Use 'Coding' category for VS Code, Vercel, Supabase, and Tailwind. Use 'Design' for Figma. Use 'Productivity' for Notion, Slack, and Linear."

> **Config + Assets** — "Add a new tool called 'Raycast' with icon raycast.png (already in public/icons/tech/command/). URL is https://raycast.com. Description: 'Productivity launcher with AI commands and snippets.' Tags: Productivity (primary) and 'Launcher' (secondary/neutral)."

> **Config-only** — "Change the Design category color from orange (#e64400) to blue (#2563eb) in the CATEGORY_COLORS constant."

> **Config-only** — "Remove all tools and add just 4: Figma, GitHub, Claude, and Notion with their existing config. Keep the current icons and descriptions."

> **Component edit** — "Change the tools section heading from 'Tools' to 'My Stack'."

---

*[Back to index](README.md)*
