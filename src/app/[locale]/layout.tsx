import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `Abdulaziz Hatamov — ${t("role")}`,
    description: t("tagline"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "uz" | "ru")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
