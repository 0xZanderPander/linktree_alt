import { CardNav } from "@/components/CardNav";
import { Footer } from "@/components/Footer";

/**
 * Shared chrome for content pages (about / music / contact / projects).
 * The homepage keeps its own fixed/clipped scroll layout (see app/page.tsx);
 * this is a simpler, normal-document-flow layout for everything else.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <div className="sticky top-4 z-50 px-[clamp(1rem,4vw,3rem)] pb-4">
        <CardNav />
      </div>
      {/* Padding lives on this outer wrapper only (matches CardNav's own
          wrapper) so the content column below lines up exactly with the
          nav's width instead of double-padding down to a narrower box.
          gap-6 sm:gap-8 matches the homepage's section rhythm - individual
          page sections should not carry their own mt-* margins on top of it. */}
      <div className="px-[clamp(1rem,4vw,3rem)] pb-6">
        <main className="flex flex-col gap-6 sm:gap-8 max-w-[var(--content-max-width)] mx-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
