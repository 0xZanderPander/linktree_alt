import { siteConfig } from "@/config/site.config";
import { ProjectToggle } from "./ProjectToggle";

/**
 * Homepage "Current Projects" section - a teaser list (first 3) of
 * collapsible project toggles. Full list lives on /projects, reusing the
 * same ProjectToggle component.
 */
export function CurrentProjects() {
  const projects = siteConfig.resources.slice(0, 3);

  return (
    <section className="w-full">
      {/* Container with max-width */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between section-heading">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Current Projects
          </h2>
          {siteConfig.resources.length > 3 && (
            <a
              href="/projects"
              className="text-xs font-medium"
              style={{ color: "var(--fg-brand-primary)" }}
            >
              view all &gt;
            </a>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectToggle key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
