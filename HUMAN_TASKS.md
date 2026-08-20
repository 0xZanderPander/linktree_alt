# Human Tasks Checklist

Everything below is content or accounts only you can supply. The code is wired up to use these the moment you drop them into `src/config/site.config.ts` (or the noted file). Nothing here blocks the site from building/deploying — it'll just show placeholder text/links until filled in.

## 1. Music
- Real public SoundCloud track or playlist/set URL → `siteConfig.music.soundcloudUrl` (currently a generic SoundCloud community placeholder).
- For each release in `siteConfig.music.releases`: title, cover image, and per-platform links (Spotify, Apple Music, SoundCloud, Bandcamp). Currently one placeholder entry with all links set to `#`.
- Cover art files, if you have them — I can drop them into `public/images/` once you send them.

## 2. Projects / Resources
- Real one-two sentence descriptions + links for: Memory Palace, Teenage Violence, Hyperstructure.
- Confirm the final name: **Hyperstructure** or **GLM**? (currently shown as "Hyperstructure").
- File: `src/config/site.config.ts` → `resources`

## 3. Social links / profile URLs
- GitHub: `https://github.com/0xZanderPander` ✓
- Substack: `https://substack.com/@bratboymusic` ✓
- Instagram: `https://www.instagram.com/brat_boy_music` ✓
- Website: currently pointing at `https://example.com`, handle still shows `@handle` — either supply a real site URL, or swap this slot for YouTube later as you mentioned
- Also placeholder: `branding.websiteUrl` (`https://example.com`), `branding.email` (`hello@example.com`), `branding.copyrightYear` (`2024`)
- File: `src/config/site.config.ts` → `socialLinks`

## 4. Blog (Substack)
- Feed + subscribe URLs are set to `teenageviolence.substack.com` ✓ — the subscribe modal is now live.
- REMAINING (code task, not content): `RecentBlogs.tsx` is still the template's **static placeholder** — it shows one dummy card with `href="#"` and ignores `blog.feedUrl`. To show real posts, swap in the dynamic RSS version from `docs/04-recent-blogs.md` (uses rss2json.com, no API key). Ask me to do this.

## 5. Music profile links
- `siteConfig.music.profileLinks` (Spotify/Apple Music/SoundCloud/Bandcamp) — your overall artist-profile URLs on each platform, shown as a "listen on" row on `/music`. Currently all `#`.
- File: `src/config/site.config.ts` → `music.profileLinks`

---

Nothing on this list blocks you from seeing/using the site — it's all placeholder-safe. Fill in whatever you have handy and send it over (or edit `site.config.ts` directly) and I'll fold it in.
