"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-(--color-accent) dark:bg-(--color-accent-dark)" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-accent) dark:text-(--color-accent-dark)">
            {t("title")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) mb-3">
          {t("cta_title")}
        </h1>
        <p className="text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
          {t("cta_subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label={t("form_name")}
            type="text"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            required
          />
          <Field
            label={t("form_email")}
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            required
          />
        </div>

        <Field
          label={t("form_subject")}
          type="text"
          value={form.subject}
          onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-(--color-text) dark:text-(--color-text-dark)">
            {t("form_message")}
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={6}
            required
            className="w-full rounded-(--radius-lg) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 py-3 text-sm text-(--color-text) dark:text-(--color-text-dark) placeholder:text-(--color-muted) dark:placeholder:text-(--color-muted-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) focus:ring-2 focus:ring-(--color-accent)/10 dark:focus:ring-(--color-accent-dark)/10 transition-all resize-none"
          />
        </div>

        {/* Status messages */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2.5 rounded-(--radius-lg) border border-(--color-accent)/25 dark:border-(--color-accent-dark)/25 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-4 py-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
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
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2.5 rounded-(--radius-lg) border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                {t("form_error")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 pt-1">
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex h-11 items-center gap-2 rounded-(--radius-lg) bg-(--color-accent) dark:bg-(--color-accent-dark) px-7 text-sm font-semibold text-white dark:text-(--color-bg-dark) hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-(--color-accent)/25 dark:shadow-(--color-accent-dark)/20"
          >
            {status === "sending" ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </motion.span>
                {t("form_sending")}
              </>
            ) : (
              <>
                {t("form_send")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-(--color-text) dark:text-(--color-text-dark)">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="h-11 rounded-(--radius-lg) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 text-sm text-(--color-text) dark:text-(--color-text-dark) placeholder:text-(--color-muted) dark:placeholder:text-(--color-muted-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) focus:ring-2 focus:ring-(--color-accent)/10 dark:focus:ring-(--color-accent-dark)/10 transition-all"
      />
    </div>
  );
}
