"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20 pt-32 pb-24">
      {/* Header */}
      <div className="flex items-center gap-5 mb-14">
        <span className="font-mono text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">06</span>
        <div className="flex-1 h-px bg-(--color-border) dark:bg-(--color-border-dark)" />
        <h1 className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark) shrink-0">
          {t("title")}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-5xl">
        {/* Left: intro */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2
            className="font-black leading-[0.9] tracking-[-0.03em] text-(--color-text) dark:text-(--color-text-dark)"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {t("cta_title")}
          </h2>
          <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
            {t("cta_subtitle")}
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-(--color-muted) dark:text-(--color-muted-dark)">EMAIL</span>
            <a
              href="mailto:abdulazizkhatamov@hotmail.com"
              className="font-mono text-sm text-(--color-accent) dark:text-(--color-accent-dark) hover:opacity-75 transition-opacity break-all"
            >
              abdulazizkhatamov@hotmail.com
            </a>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label={t("form_name")}  type="text"  value={form.name}    onChange={(v) => setForm((f) => ({ ...f, name: v }))}    required />
            <Field label={t("form_email")} type="email" value={form.email}   onChange={(v) => setForm((f) => ({ ...f, email: v }))}   required />
          </div>

          <Field label={t("form_subject")} type="text" value={form.subject} onChange={(v) => setForm((f) => ({ ...f, subject: v }))} required />

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-(--color-muted) dark:text-(--color-muted-dark)">
              {t("form_message")}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={6}
              required
              className="w-full border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 py-3 text-sm text-(--color-text) dark:text-(--color-text-dark) placeholder:text-(--color-muted) dark:placeholder:text-(--color-muted-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors resize-none"
              style={{ borderRadius: "var(--radius-sm)" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 border border-(--color-accent)/30 dark:border-(--color-accent-dark)/25 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-4 py-3"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-sm font-medium text-(--color-accent) dark:text-(--color-accent-dark)">
                  {t("form_success")}
                </p>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">{t("form_error")}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-1">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-11 items-center gap-2.5 bg-(--color-text) dark:bg-(--color-text-dark) text-(--color-bg) dark:text-(--color-bg-dark) px-7 text-sm font-semibold hover:bg-(--color-accent) dark:hover:bg-(--color-accent-dark) hover:text-white dark:hover:text-(--color-bg-dark) disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ borderRadius: "var(--radius-sm)" }}
            >
              {status === "sending" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </motion.span>
                  {t("form_sending")}
                </>
              ) : (
                <>
                  {t("form_send")}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label, type, value, onChange, required,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-(--color-muted) dark:text-(--color-muted-dark)">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="h-11 border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 text-sm text-(--color-text) dark:text-(--color-text-dark) placeholder:text-(--color-muted) dark:placeholder:text-(--color-muted-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors"
        style={{ borderRadius: "var(--radius-sm)" }}
      />
    </div>
  );
}
