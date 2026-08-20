import { PageShell } from "@/components/PageShell";
import { OurLinks } from "@/components/OurLinks";
import { siteConfig } from "@/config/site.config";

export default function AboutPage() {
  const { about } = siteConfig;

  return (
    <PageShell>
      <section className="w-full">
        <h1
          className="text-xl font-bold section-heading"
          style={{ color: "var(--color-vanilla)" }}
        >
          {about.heading}
        </h1>
        <div
          className="p-5 flex flex-col gap-4"
          style={{
            background: "var(--color-charcoal)",
            border: "1px solid var(--color-vanilla)",
          }}
        >
          {about.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-vanilla)", opacity: 0.85 }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      <OurLinks showHeading={false} />
    </PageShell>
  );
}
