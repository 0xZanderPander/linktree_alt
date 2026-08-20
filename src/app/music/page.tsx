import { PageShell } from "@/components/PageShell";
import { SoundCloudPlayer } from "@/components/SoundCloudPlayer";
import { siteConfig, type MusicRelease } from "@/config/site.config";

type PlatformLinks = Pick<
  MusicRelease,
  "spotifyUrl" | "appleMusicUrl" | "soundcloudUrl" | "bandcampUrl"
>;

const PLATFORM_LINKS: { key: keyof PlatformLinks; label: string }[] = [
  { key: "spotifyUrl", label: "Spotify" },
  { key: "appleMusicUrl", label: "Apple Music" },
  { key: "soundcloudUrl", label: "SoundCloud" },
  { key: "bandcampUrl", label: "Bandcamp" },
];

function PlatformLinksRow({ links }: { links: PlatformLinks }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORM_LINKS.map(({ key, label }) => {
        const href = links[key];
        const isConfigured = href && href !== "#";
        return (
          <a
            key={key}
            href={isConfigured ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!isConfigured}
            className="px-3 py-1.5 text-xs font-medium"
            style={{
              border: "1px solid var(--color-vanilla)",
              color: "var(--color-vanilla)",
              opacity: isConfigured ? 1 : 0.35,
              pointerEvents: isConfigured ? "auto" : "none",
            }}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}

function ReleaseCard({ release }: { release: MusicRelease }) {
  return (
    <div
      className="w-full flex flex-col"
      style={{
        background: "var(--color-charcoal)",
        border: "2px solid var(--color-vanilla)",
      }}
    >
      <div className="h-40 relative bg-[#132a17]" />
      <div className="p-4 flex flex-col gap-3">
        <h3
          className="text-base font-bold"
          style={{ color: "var(--color-vanilla)" }}
        >
          {release.title}
        </h3>
        <PlatformLinksRow links={release} />
      </div>
    </div>
  );
}

export default function MusicPage() {
  const { music } = siteConfig;

  return (
    <PageShell>
      <section className="w-full">
        <h1
          className="text-xl font-bold section-heading"
          style={{ color: "var(--color-vanilla)" }}
        >
          music
        </h1>
        <div className="w-full flex flex-col gap-3">
          <SoundCloudPlayer url={music.soundcloudUrl} />

          <PlatformLinksRow links={music.profileLinks} />
        </div>
      </section>

      <section className="w-full">
        <h2
          className="text-lg font-bold section-heading"
          style={{ color: "var(--color-vanilla)" }}
        >
          releases
        </h2>
        {/* Full-width stack, matching the homepage's project rhythm - the
            old md:grid-cols-2 made release cards narrower than the column. */}
        <div className="flex flex-col gap-4">
          {music.releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
