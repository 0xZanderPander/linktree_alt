import { CardNav } from "@/components/CardNav";
import { Footer } from "@/components/Footer";
import { OurLinks } from "@/components/OurLinks";
import { CurrentProjects } from "@/components/CurrentProjects";
import { RecentBlogs } from "@/components/RecentBlogs";
import { ContactToggle } from "@/components/ContactToggle";
import { SoundCloudPlayer } from "@/components/SoundCloudPlayer";
import { siteConfig } from "@/config/site.config";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* NAVCARD - fixed layer outside clipper */}
      <div className="fixed left-0 right-0 top-4 z-50 px-[clamp(1rem,4vw,3rem)]">
        <CardNav />
      </div>

      {/* CLIPPER - clips content at NavCard bottom, scrollbar at viewport edge */}
      <div
        className="fixed left-0 right-0 z-10 overflow-clip"
        style={{ top: "var(--clip-top)", height: "calc(100% - var(--clip-top))" }}
      >
        {/* SCROLLER - handles scrolling, scrollbar at viewport edge */}
        <div className="h-full overflow-y-auto overflow-x-hidden px-[clamp(1rem,4vw,3rem)]">
          {/* Section-to-section spacing lives entirely on this gap - individual
              sections below should not carry their own mt-* margins, or the
              rhythm goes uneven (see globals.css review notes). */}
          <main className="flex flex-col items-center pt-4 pb-2 gap-6 sm:gap-8 max-w-[var(--content-max-width)] mx-auto">
            <OurLinks />
            <section className="w-full max-w-[var(--content-max-width)]">
              <SoundCloudPlayer url={siteConfig.music.soundcloudUrl} />
              <a
                href="/music"
                className="mt-2 inline-block text-xs font-medium"
                style={{ color: "var(--fg-brand-primary)" }}
              >
                listen everywhere &gt;
              </a>
            </section>
            <CurrentProjects />
            <RecentBlogs />
            <ContactToggle />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
