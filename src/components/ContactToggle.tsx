"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/config/site.config";

/**
 * Homepage contact widget - a toggle-open "window" in the same Windows-lite
 * language as CardNav (bright green title bar, charcoal `<`/`X` toggle).
 * Click the bar to expand a panel containing the full contact form inline,
 * no navigation to /contact required.
 */
export function ContactToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { contact } = siteConfig;

  return (
    <section className="w-full">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        <div
          style={{
            border: "2px solid var(--color-charcoal)",
            boxShadow: "3px 3px 0 rgba(0, 255, 65, 0.35)",
          }}
        >
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 h-[44px]"
            style={{ background: "var(--color-vanilla)" }}
            aria-expanded={isOpen}
            aria-controls="contact-toggle-panel"
          >
            <span
              className="text-sm font-bold tracking-wide"
              style={{ color: "var(--color-charcoal)" }}
            >
              {contact.heading}
            </span>
            <span
              className="flex items-center justify-center w-[28px] h-[28px] flex-shrink-0 font-bold text-base leading-none"
              style={{
                color: "var(--color-charcoal)",
                border: "2px solid var(--color-charcoal)",
                background: isOpen ? "var(--color-charcoal)" : "transparent",
              }}
            >
              <span style={{ color: isOpen ? "var(--color-vanilla)" : "var(--color-charcoal)" }}>
                {isOpen ? "X" : "<"}
              </span>
            </span>
          </button>

          <div
            id="contact-toggle-panel"
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              background: "var(--color-charcoal)",
            }}
          >
            <div className="overflow-hidden">
              <div className="p-4">
                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--color-vanilla)", opacity: 0.7 }}
                >
                  {contact.intro}
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
