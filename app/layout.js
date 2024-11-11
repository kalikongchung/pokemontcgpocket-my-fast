import { Inter } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import Script from 'next/script';
import {NextIntlClientProvider} from 'next-intl';

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default async function RootLayout({children, params: {locale}}) {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    // 处理错误，可能是重定向到默认语言
  }

  return (
    <html lang={locale}>
      {config.domainName && (
        <head>
          {/* Plausible Analytics */}
          <Script
            data-domain={config.domainName}
            src="https://app.pageview.app/js/script.js"
            strategy="afterInteractive"
          />
          
          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
            `}
          </Script>
          <link rel="canonical" href={`https://${config.domainName}`} />
        </head>
      )}
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
