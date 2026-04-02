import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/sections/ContactForm";
import { breadcrumbJsonLd } from "@/lib/jsonld";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const title = t("title");
  const description = t("cta_subtitle");

  return {
    title,
    description,
    keywords: [
      "hire frontend developer",
      "contact Abdulaziz Hatamov",
      "freelance developer",
      "React developer for hire",
      "web development services",
    ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        uz: `${BASE_URL}/uz/contact`,
        ru: `${BASE_URL}/ru/contact`,
        "x-default": `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/contact`,
      type: "website",
    },
    twitter: { title, description },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ldBreadcrumb = breadcrumbJsonLd([
    { name: "Home", item: `${BASE_URL}/${locale}` },
    { name: "Contact", item: `${BASE_URL}/${locale}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <ContactForm />
    </>
  );
}
