import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site.config";

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <PageShell>
      <section className="w-full max-w-md">
        <h1
          className="text-xl font-bold mb-2"
          style={{ color: "var(--color-vanilla)" }}
        >
          {contact.heading}
        </h1>
        <p
          className="text-sm mb-5"
          style={{ color: "var(--color-vanilla)", opacity: 0.7 }}
        >
          {contact.intro}
        </p>
        <ContactForm />
      </section>
    </PageShell>
  );
}
