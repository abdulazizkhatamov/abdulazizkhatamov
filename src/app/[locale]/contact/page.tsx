import { setRequestLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/sections/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: `${t("title")} — Abdulaziz Hatamov` };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactForm />;
}
