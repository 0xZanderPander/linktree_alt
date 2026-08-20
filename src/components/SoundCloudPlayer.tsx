"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Minimal shape of the SoundCloud Widget API we use.
// (SoundCloud doesn't ship official TS types for this.)
interface SCSound {
  title?: string;
  user?: { username?: string };
  duration?: number;
}
interface SCWidget {
  bind: (event: string, cb: (data?: unknown) => void) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (ms: number) => void;
  getCurrentSound: (cb: (sound: SCSound) => void) => void;
  getDuration: (cb: (duration: number) => void) => void;
}
declare global {
  interface Window {
    SC?: {
      Widget: {
        (el: HTMLIFrameElement): SCWidget;
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          PLAY_PROGRESS: string;
        };
      };
    };
  }
}

const SC_SCRIPT_SRC = "https://w.soundcloud.com/player/api.js";

function loadSoundCloudScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if (window.SC) return resolve();
    const existing = document.querySelector(`script[src="${SC_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = SC_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

function formatTime(ms: number) {
  if (!ms || Number.isNaN(ms)) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * A fully custom-skinned audio player backed by SoundCloud's Widget API.
 * The actual SoundCloud iframe is rendered at 0 height (SoundCloud requires
 * it to exist in the DOM, but we never show its default chrome) - all
 * playback controls below are our own UI, driven via widget.play()/pause()/
 * next()/prev()/seekTo() and the widget's event bindings.
 */
export function SoundCloudPlayer({ url }: { url: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let cancelled = false;

    loadSoundCloudScript().then(() => {
      if (cancelled || !iframeRef.current || !window.SC) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        setIsReady(true);
        widget.getCurrentSound((sound) => {
          setTrackTitle(sound?.title || "");
          setTrackArtist(sound?.user?.username || "");
        });
        widget.getDuration((d) => setDuration(d));
      });

      widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true));
      widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
      widget.bind(window.SC.Widget.Events.FINISH, () => setIsPlaying(false));
      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
        const d = data as { currentPosition?: number } | undefined;
        if (d?.currentPosition !== undefined) setPosition(d.currentPosition);
        widget.getCurrentSound((sound) => {
          setTrackTitle(sound?.title || "");
          setTrackArtist(sound?.user?.username || "");
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [url]);

  const togglePlay = useCallback(() => {
    widgetRef.current?.toggle();
  }, []);

  const goNext = useCallback(() => {
    widgetRef.current?.next();
  }, []);

  const goPrev = useCallback(() => {
    widgetRef.current?.prev();
  }, []);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      widgetRef.current?.seekTo(Math.max(0, Math.min(1, ratio)) * duration);
    },
    [duration]
  );

  const progressPct = duration ? (position / duration) * 100 : 0;

  return (
    <div
      className="w-full p-4"
      style={{
        background: "var(--color-charcoal)",
        border: "2px solid var(--color-vanilla)",
      }}
    >
      {/* SoundCloud iframe - required by the Widget API, rendered invisible.
          All UI below is custom. */}
      <iframe
        ref={iframeRef}
        title="soundcloud-player"
        width="100%"
        height="0"
        style={{ display: "none" }}
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          url
        )}&auto_play=false&show_artwork=false&visual=false`}
      />

      {/* Track info */}
      <div className="mb-3 min-h-[36px]">
        <p
          className="text-sm font-bold truncate"
          style={{ color: "var(--color-vanilla)" }}
        >
          {isReady ? trackTitle || "loading track_" : "connecting to soundcloud_"}
        </p>
        {trackArtist && (
          <p
            className="text-xs truncate"
            style={{ color: "var(--color-vanilla)", opacity: 0.85 }}
          >
            {trackArtist}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div
        onClick={handleSeek}
        className="w-full h-2 mb-1 cursor-pointer"
        style={{ background: "rgba(57, 255, 110, 0.15)" }}
      >
        <div
          className="h-full"
          style={{ width: `${progressPct}%`, background: "var(--color-vanilla)" }}
        />
      </div>
      <div className="flex justify-between text-[10px] mb-3" style={{ color: "var(--color-vanilla)", opacity: 0.85 }}>
        <span>{formatTime(position)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Transport controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          aria-label="Previous track"
          className="w-9 h-9 flex items-center justify-center font-bold"
          style={{ border: "1px solid var(--color-vanilla)", color: "var(--color-vanilla)" }}
        >
          &lt;&lt;
        </button>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={!isReady}
          className="h-9 px-4 min-w-[68px] flex items-center justify-center font-bold disabled:opacity-50"
          style={{
            background: "var(--color-vanilla)",
            color: "var(--color-charcoal)",
          }}
        >
          {isPlaying ? "||" : "PLAY"}
        </button>
        <button
          onClick={goNext}
          aria-label="Next track"
          className="w-9 h-9 flex items-center justify-center font-bold"
          style={{ border: "1px solid var(--color-vanilla)", color: "var(--color-vanilla)" }}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
