/**
 * The shared open/close affordance for every "window" toggle (CardNav,
 * ProjectToggle, ContactToggle). Replaces the old `<` / `X` glyph box.
 *
 * Closed: outlined circle, dot eyes, smile - charcoal on vanilla.
 * Open:   the same face inverted (filled charcoal disc, vanilla features)
 *         with the eyes crossed out.
 *
 * Purely decorative: the parent element is the real button, so this is
 * always aria-hidden and never focusable.
 */
export function ToggleFace({ isOpen, size = 28 }: { isOpen: boolean; size?: number }) {
  const ink = isOpen ? "var(--color-vanilla)" : "var(--color-charcoal)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="toggle-face flex-shrink-0"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={isOpen ? "var(--color-charcoal)" : "transparent"}
        stroke="var(--color-charcoal)"
        strokeWidth="2"
      />

      {isOpen ? (
        <g stroke={ink} strokeWidth="1.8" strokeLinecap="round">
          <line x1="7" y1="8" x2="10" y2="11" />
          <line x1="10" y1="8" x2="7" y2="11" />
          <line x1="14" y1="8" x2="17" y2="11" />
          <line x1="17" y1="8" x2="14" y2="11" />
        </g>
      ) : (
        <g fill={ink}>
          <circle cx="8.5" cy="9.5" r="1.4" />
          <circle cx="15.5" cy="9.5" r="1.4" />
        </g>
      )}

      <path
        d="M7.5 14.2 Q12 18.2 16.5 14.2"
        stroke={ink}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
