/**
 * Site Configuration
 *
 * This file contains all customizable content for your link portal.
 * Edit the values below to personalize your site.
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  title: string;
  handle: string;
  url: string;
  /** Icon type: "github" | "twitter" | "instagram" | "linkedin" | "youtube" | "tiktok" | "substack" | "medium" | "figma" | "dribbble" | "music" | "website" | "custom" */
  icon: string;
}

export interface MusicRelease {
  id: string;
  title: string;
  coverImage: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  soundcloudUrl: string;
  bandcampUrl: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  buttonLabel: string;
}

export interface SiteConfig {
  metadata: {
    title: string;
    description: string;
    /** Path to favicon (relative to /public) */
    favicon: string;
  };
  analytics: {
    /** Google Analytics Measurement ID (leave empty to disable) */
    googleAnalyticsId: string;
  };
  branding: {
    /** Path to logo image (relative to basePath, or null to hide) */
    logo: string | null;
    /** Alt text for logo */
    logoAlt: string;
    /** Main website URL (linked from globe icon) */
    websiteUrl: string;
    /** Tagline displayed in footer */
    tagline: string;
    /** Contact email displayed in footer */
    email: string;
    /** Copyright year(s) */
    copyrightYear: string;
  };
  features: {
    /** Enable the CRT terminal background effect */
    crtEffect: boolean;
    /** CRT effect tint color (hex) */
    crtTint: string;
    /** CRT effect brightness (0-1) */
    crtBrightness: number;
    /** Enable the subscribe modal for resources */
    subscribeModal: boolean;
  };
  theme: {
    /** Primary accent color (hex) - used for CTAs, links, badges */
    accentColor: string;
    /** Dark background color (hex) */
    darkBg: string;
    /** Light background color (hex) */
    lightBg: string;
  };
  /** Navigation items shown in expandable header menu */
  nav: NavItem[];
  /** Social media links (max 5 recommended) */
  socialLinks: SocialLink[];
  /** Featured resources/projects (max 3 recommended) */
  resources: Resource[];
  blog: {
    /** Enable the blog section */
    enabled: boolean;
    /** RSS feed URL (e.g., Substack, Medium, or any RSS feed) */
    feedUrl: string;
    /** Section title */
    title: string;
    /** Substack subscribe URL (for newsletter form, leave empty to hide) */
    subscribeUrl: string;
  };
  /** Music section - homepage player + /music breakout page */
  music: {
    /** A public SoundCloud track or set/playlist URL. Powers the custom player. */
    soundcloudUrl: string;
    /** Artist-profile-level "listen on" links, shown as a row right below
     * the player on /music (separate from the per-release links below). */
    profileLinks: {
      spotifyUrl: string;
      appleMusicUrl: string;
      soundcloudUrl: string;
      bandcampUrl: string;
    };
    /** Releases shown on the /music page, each with per-platform links */
    releases: MusicRelease[];
  };
  /** /about page content */
  about: {
    heading: string;
    bio: string[];
  };
  /** /contact page - wired to Web3Forms (https://web3forms.com) */
  contact: {
    /** Your Web3Forms access key - see https://web3forms.com to create one (free) */
    web3formsAccessKey: string;
    heading: string;
    intro: string;
  };
}

// ============================================
// CONFIGURATION
// ============================================

export const siteConfig: SiteConfig = {
  // ============================================
  // METADATA
  // ============================================
  metadata: {
    title: "guest@terminal:~$ links",
    description: "> whoami && cat links.txt",
    favicon: "/favicon.png",
  },

  // ============================================
  // ANALYTICS
  // ============================================
  analytics: {
    // Leave empty to disable Google Analytics
    googleAnalyticsId: "",
  },

  // ============================================
  // BRANDING
  // ============================================
  branding: {
    // Set to null to hide logo, or provide path like "/images/logo.svg"
    logo: null,
    logoAlt: "SYSTEM_",
    websiteUrl: "https://example.com",
    tagline: "> connection established. all systems nominal_",
    email: "hello@example.com",
    copyrightYear: "2024",
  },

  // ============================================
  // FEATURES
  // ============================================
  features: {
    // Toggle the animated digit-rain shader background (off by default -
    // it read as too busy/noisy; a plain black backdrop + faint scanlines
    // gives the CRT feel without the visual noise. Flip to true to bring
    // the animated shader back).
    crtEffect: false,
    crtTint: "#39FF6E",
    crtBrightness: 0.08,
    // Show subscribe modal before opening resources
    subscribeModal: false,
  },

  // ============================================
  // THEME COLORS
  // ============================================
  theme: {
    // Primary accent color (used for buttons, links, highlights)
    accentColor: "#00FF41", // Hacker Green - change to your brand color
    // Dark mode background
    darkBg: "#000000",
    // Light mode background
    lightBg: "#000000",
  },

  // ============================================
  // NAVIGATION - real routes, not anchors
  // ============================================
  nav: [
    { id: "nav-about", label: "about_", href: "/about" },
    { id: "nav-music", label: "music_", href: "/music" },
    { id: "nav-contact", label: "contact_", href: "/contact" },
    { id: "nav-projects", label: "projects_", href: "/projects" },
  ],

  // ============================================
  // SOCIAL LINKS (max 5)
  // ============================================
  socialLinks: [
    {
      id: "music",
      platform: "music",
      title: "Music",
      handle: "listen now",
      url: "/music",
      icon: "music",
    },
    {
      id: "github",
      platform: "github",
      title: "Github",
      handle: "@handle",
      url: "https://github.com/0xZanderPander",
      icon: "github",
    },
    {
      id: "substack",
      platform: "substack",
      title: "Substack",
      handle: "@handle",
      url: "#", // TODO: your Substack publication URL
      icon: "substack",
    },
    {
      id: "instagram",
      platform: "instagram",
      title: "Insta",
      handle: "@handle",
      url: "#", // TODO: your Instagram profile URL
      icon: "instagram",
    },
    {
      id: "website",
      platform: "website",
      title: "Website",
      handle: "@handle",
      url: "https://example.com", // TODO: replace with your site (or later: YouTube)
      icon: "website",
    },
  ],

  // ============================================
  // RESOURCES / PROJECTS - shown on homepage (featured)
  // and in full on /projects
  // ============================================
  resources: [
    {
      id: "memory-palace",
      title: "Memory Palace",
      description:
        "TODO: one or two sentences on what this is.", // TODO: replace with real description
      link: "#", // TODO: project link
      buttonLabel: "Link",
    },
    {
      id: "teenage-violence",
      title: "Teenage Violence",
      description:
        "TODO: one or two sentences on what this is.", // TODO: replace with real description
      link: "#", // TODO: project link
      buttonLabel: "Link",
    },
    {
      id: "hyperstructure",
      title: "Hyperstructure", // TODO: confirm final name (Hyperstructure vs GLM)
      description:
        "TODO: one or two sentences on what this is.", // TODO: replace with real description
      link: "#", // TODO: project link
      buttonLabel: "Link",
    },
  ],

  // ============================================
  // BLOG / RSS FEED - publishing on Substack, cross-posted to
  // Medium, but this site only links out to Substack
  // ============================================
  blog: {
    enabled: true,
    // TODO: your Substack feed URL, e.g. "https://yourname.substack.com/feed"
    feedUrl: "",
    title: "Recent Writing",
    // TODO: your Substack URL, e.g. "https://yourname.substack.com"
    subscribeUrl: "",
  },

  // ============================================
  // MUSIC - homepage player + /music breakout page
  // ============================================
  music: {
    // TODO: replace with your real SoundCloud track or set/playlist URL
    // (must be public). Powers the custom-skinned player via SoundCloud's
    // Widget API - see /music/page.tsx.
    soundcloudUrl: "https://soundcloud.com/soundcloud/sets/soundcloud-community",
    // TODO: your artist-profile URLs on each platform (not a specific
    // release - your overall Spotify/Apple/SoundCloud/Bandcamp profile).
    profileLinks: {
      spotifyUrl: "#",
      appleMusicUrl: "#",
      soundcloudUrl: "#",
      bandcampUrl: "#",
    },
    releases: [
      {
        id: "release-1",
        title: "Insert release title", // TODO
        coverImage: "/images/placeholder-resource-01.svg", // TODO: real cover art
        spotifyUrl: "#", // TODO
        appleMusicUrl: "#", // TODO
        soundcloudUrl: "#", // TODO
        bandcampUrl: "#", // TODO
      },
    ],
  },

  // ============================================
  // ABOUT
  // ============================================
  about: {
    heading: "about_",
    bio: [
      "TODO: write your bio here.", // TODO
      "TODO: second paragraph, if you want one.", // TODO
    ],
  },

  // ============================================
  // CONTACT - wired to Web3Forms (https://web3forms.com, free)
  // ============================================
  contact: {
    // TODO: paste your Web3Forms access key from https://web3forms.com
    web3formsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
    heading: "contact_",
    intro: "> send a transmission_",
  },
};

// ============================================
// HELPER EXPORTS
// ============================================

/** Get the base path for assets (used in components) */
export const getBasePath = () => {
  // In development or when basePath is not set, return empty string
  // In production with GitHub Pages, this should match next.config.ts basePath
  return process.env.NODE_ENV === "production" ? "/linktree-alternative" : "";
};

/** Prepend base path to asset URLs */
export const withBasePath = (path: string) => {
  const basePath = getBasePath();
  // If path already starts with basePath or is external URL, return as-is
  if (path.startsWith(basePath) || path.startsWith("http")) {
    return path;
  }
  return `${basePath}${path}`;
};
