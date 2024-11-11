import { Suspense } from 'react'
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Problem from "../../components/Problem";
import FeaturesAccordion from "../../components/FeaturesAccordion";
import Pricing from "../../components/Pricing";
import FAQ from "../../components/FAQ";
// import CTA from "@/components/CTA";
// import Dashboard from './dashboard/page'; // Updated import path
import Footer from "../../components/Footer";
import { unstable_setRequestLocale } from 'next-intl/server';
import { Imprima } from 'next/font/google';
import GameDisplay from '../../components/GameDisplay';

export const dynamic = 'force-dynamic';

export default function HomePage({ params }) {
  const locale = params?.locale || 'en'; // Provide a default locale if params.locale is undefined
  unstable_setRequestLocale(locale);
  
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <GameDisplay />
        {/* <Dashboard locale={locale} /> */}
        <Hero />
        <Problem />
        {/* <Pricing /> */}
        <FAQ />
        {/*<CTA />*/}
      </main>
      <Footer />
    </>
  );
}

// 如果你有 generateStaticParams，也要更新它
export function generateStaticParams() {
  return ['en','de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'sv', 'da', 'fi'].map((locale) => ({ locale }));
}