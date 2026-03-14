"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) mb-10">
        {t("title")}
      </h1>

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

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-(--color-text) dark:text-(--color-text-dark)">
            {t("form_message")}
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={6}
            required
            className="w-full rounded-(--radius-md) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 py-3 text-sm text-(--color-text) dark:text-(--color-text-dark) placeholder:text-(--color-muted) dark:placeholder:text-(--color-muted-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors resize-none"
          />
        </div>

        {status === "success" && (
          <p className="text-sm text-(--color-accent) dark:text-(--color-accent-dark)">
            {t("form_success")}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500">{t("form_error")}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="self-start inline-flex h-10 items-center gap-2 rounded-(--radius-md) bg-(--color-accent) dark:bg-(--color-accent-dark) px-6 text-sm font-medium text-white dark:text-(--color-bg-dark) hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) disabled:opacity-60 transition-colors"
        >
          {status === "sending" ? t("form_sending") : t("form_send")}
        </button>
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
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-(--color-text) dark:text-(--color-text-dark)">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="h-10 rounded-(--radius-md) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 text-sm text-(--color-text) dark:text-(--color-text-dark) placeholder:text-(--color-muted) dark:placeholder:text-(--color-muted-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors"
      />
    </div>
  );
}
