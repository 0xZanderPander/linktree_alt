"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ToggleFace } from "./ToggleFace";
import { siteConfig, withBasePath } from "@/config/site.config";

export function CardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { nav, branding } = siteConfig;

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const tl = gsap.timeline();

    if (isOpen) {
      // Desktop uses fixed height to align with OurLinks, mobile/tablet uses auto
      const isDesktop = window.innerWidth >= 1024;
      const targetHeight = isDesktop ? 172 : "auto";

      // Expand animation
      tl.to(containerRef.current, {
        height: targetHeight,
        duration: 0.4,
        ease: "power2.out",
      })
        .fromTo(
          cardsRef.current.children,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      // Collapse animation
      tl.to(cardsRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      }).to(containerRef.current, {
        height: 44,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Background blur overlay animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              visibility: "hidden",
              pointerEvents: "none",
            });
          }
        },
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Background blur overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }}
        onClick={() => setIsOpen(false)}
      />

      <nav className="w-full relative z-50">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <div
            ref={containerRef}
            className="overflow-hidden"
            style={{
              background: "var(--color-vanilla)",
              border: "2px solid var(--color-charcoal)",
              boxShadow: "3px 3px 0 rgba(0, 255, 65, 0.35)",
              height: 44,
            }}
          >
            {/* Title bar row - the WHOLE bar toggles, matching ProjectToggle
                and ContactToggle. Previously only the small glyph box did. */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative w-full flex items-center justify-between h-[44px] px-3 text-left"
            >
              {/* Window "title" - logo or wordmark */}
              <div className="flex items-center gap-2 min-w-0">
                {branding.logo ? (
                  <img
                    src={withBasePath(branding.logo)}
                    alt={branding.logoAlt}
                    className="h-[22px] w-auto"
                  />
                ) : (
                  <span
                    className="text-sm font-bold tracking-wide truncate toggle-title"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {branding.logoAlt}
                  </span>
                )}
              </div>

              {/* Decorative - the bar itself is the button */}
              <ToggleFace isOpen={isOpen} />
            </button>

            {/* Menu items */}
            <div
              ref={cardsRef}
              className="px-3 pb-3 grid gap-2 md:grid-cols-4 grid-cols-2 overflow-hidden"
            >
              {nav.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="nav-card group relative flex flex-col justify-between p-4 text-left font-accent text-lg font-bold min-h-[92px]"
                  style={{
                    background: "var(--color-charcoal)",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Menu marker - top right */}
                  <div className="flex justify-end">
                    <span className="nav-card-arrow text-sm transition-colors duration-150">
                      &gt;
                    </span>
                  </div>
                  {/* Label - bottom left */}
                  <span className="nav-card-text transition-colors duration-150">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
