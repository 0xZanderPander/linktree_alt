import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { FaultyTerminal } from "@/components/FaultyTerminal";
import { siteConfig, withBasePath } from "@/config/site.config";
import { helveticaNeueExt } from "@/lib/fonts";

// Generate metadata from config
export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  icons: {
    icon: [
      { url: withBasePath(siteConfig.metadata.favicon), type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { analytics, features } = siteConfig;
  const hasAnalytics = analytics.googleAnalyticsId.length > 0;

  return (
    <html lang="en" className={`dark ${helveticaNeueExt.variable}`}>
      <head>
        {/* Google Analytics - only if configured */}
        {hasAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analytics.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        {/* Background layer - solid black, fixed, behind all content */}
        <div className="fixed inset-0 z-0 bg-black" aria-hidden="true" />

        {/* Optional animated digit-rain shader - off by default (see
            siteConfig.features.crtEffect), the plain black backdrop above
            plus the faint scanline/vignette texture below reads as CRT
            without the visual noise. */}
        {features.crtEffect && (
          <div className="fixed inset-0 z-0" aria-hidden="true">
            <FaultyTerminal
              tint={features.crtTint}
              brightness={features.crtBrightness}
              curvature={0.4}
              mouseReact={true}
              mouseStrength={1.5}
              scale={1.2}
              scanlineIntensity={0.5}
              noiseAmp={1}
              chromaticAberration={0.5}
              dither={0.3}
              pageLoadAnimation={true}
            />
          </div>
        )}

        {/* CRT scanline + vignette overlays - always on, very subtle -
            sit above the background, below content */}
        <div className="crt-scanlines crt-flicker" aria-hidden="true" />
        <div className="crt-vignette" aria-hidden="true" />

        {/* Content layer - above background */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
