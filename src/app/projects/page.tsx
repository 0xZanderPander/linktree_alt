import { PageShell } from "@/components/PageShell";
import { ProjectToggle } from "@/components/ProjectToggle";
import { siteConfig } from "@/config/site.config";

export default function ProjectsPage() {
  const projects = siteConfig.resources;

  return (
    <PageShell>
      <section className="w-full">
        <h1
          className="text-xl font-bold mb-4"
          style={{ color: "var(--color-vanilla)" }}
        >
          projects_
        </h1>
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectToggle key={project.id} project={project} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
