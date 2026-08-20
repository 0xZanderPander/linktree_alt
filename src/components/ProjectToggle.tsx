"use client";

import { useState } from "react";
import { SubscribeModal, hasResourceAccess } from "./SubscribeModal";
import { ToggleFace } from "./ToggleFace";
import { siteConfig, type Resource } from "@/config/site.config";

function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * A single project as a collapsible toggle "window" - same visual language
 * as CardNav / ContactToggle (bright green title bar, charcoal `<`/`X`
 * toggle). The project name lives in the header; the expanded panel is
 * strictly image box -> description text -> link button, nothing else.
 */
export function ProjectToggle({ project }: { project: Resource }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { subscribeModal } = siteConfig.features;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (subscribeModal && !hasResourceAccess()) {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  return (
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
        aria-controls={`project-toggle-${project.id}`}
      >
        <span
          className="text-sm font-bold tracking-wide truncate toggle-title"
          style={{ color: "var(--color-charcoal)" }}
        >
          {project.title}
        </span>
        <ToggleFace isOpen={isOpen} />
      </button>

      <div
        id={`project-toggle-${project.id}`}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          background: "var(--color-charcoal)",
        }}
      >
        <div className="overflow-hidden">
          {/* Image box */}
          <div className="h-48 bg-[#132a17]" />

          {/* Text box - description only, no title */}
          <div className="p-4 flex flex-col gap-3">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-vanilla)", opacity: 0.85 }}
            >
              {project.description}
            </p>

            {/* Link box */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="card-button inline-flex items-center gap-2 font-medium self-start"
            >
              {project.buttonLabel}
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>

      {subscribeModal && (
        <SubscribeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSkip={() => setModalOpen(false)}
          resourceTitle={project.title}
          resourceHref={project.link}
        />
      )}
    </div>
  );
}
