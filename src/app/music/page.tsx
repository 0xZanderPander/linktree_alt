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
          className="text-xl font-bold mb-2"
          style={{ color: "var(--color-vanilla)" }}
        >
          music_
        </h1>
        <p
          className="text-sm mb-5"
          style={{ color: "var(--color-vanilla)", opacity: 0.7 }}
        >
          &gt; now playing_
        </p>

        <div className="max-w-md flex flex-col gap-3">
          <SoundCloudPlayer url={music.soundcloudUrl} />

          <div>
            <p
              className="text-xs font-medium mb-2"
              style={{ color: "var(--color-vanilla)", opacity: 0.7 }}
            >
              &gt; listen on_
            </p>
            <PlatformLinksRow links={music.profileLinks} />
          </div>
        </div>
      </section>

      <section className="w-full">
        <h2
          className="text-lg font-bold mb-3 sm:mb-4"
          style={{ color: "var(--color-vanilla)" }}
        >
          releases_
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {music.releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
