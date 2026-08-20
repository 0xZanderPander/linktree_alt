"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", siteConfig.contact.web3formsAccessKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Try again.");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--color-charcoal)",
    border: "1px solid var(--color-vanilla)",
    color: "var(--color-vanilla)",
  };

  if (status === "success") {
    return (
      <div
        className="p-5"
        style={{
          background: "var(--color-charcoal)",
          border: "1px solid var(--color-vanilla)",
        }}
      >
        <p className="text-sm font-bold" style={{ color: "var(--color-vanilla)" }}>
          &gt; transmission received_
        </p>
        <p className="text-sm mt-2" style={{ color: "var(--color-vanilla)", opacity: 0.7 }}>
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Honeypot field for basic spam protection */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-medium" style={{ color: "var(--color-vanilla)" }}>
          name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="px-3 py-2 text-sm rounded-none focus:outline-none"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs font-medium" style={{ color: "var(--color-vanilla)" }}>
          email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="px-3 py-2 text-sm rounded-none focus:outline-none"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-xs font-medium" style={{ color: "var(--color-vanilla)" }}>
          message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="px-3 py-2 text-sm rounded-none focus:outline-none resize-none"
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 px-4 py-2 text-sm font-bold rounded-none self-start disabled:opacity-60"
        style={{
          background: "var(--color-vanilla)",
          color: "var(--color-charcoal)",
        }}
      >
        {status === "sending" ? "sending..." : "send_"}
      </button>

      {status === "error" && (
        <p className="text-xs" style={{ color: "#ff6b6b" }}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
