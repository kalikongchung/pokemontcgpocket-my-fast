import {NextIntlClientProvider} from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';


export function generateStaticParams() {
  return [
    {locale: 'en'}, {locale: 'de'}, {locale: 'fr'}, {locale: 'es'}, 
    {locale: 'it'}, {locale: 'pt'}, {locale: 'nl'}, {locale: 'pl'}, 
    {locale: 'ru'}, {locale: 'ja'}, {locale: 'ko'}, {locale: 'zh'}, 
    {locale: 'ar'}, {locale: 'hi'}, {locale: 'tr'}, {locale: 'sv'}, 
    {locale: 'da'}, {locale: 'fi'}
  ];
}

export default async function LocaleLayout({children, params: {locale}}) {
  unstable_setRequestLocale(locale);
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Instead of calling notFound(), we'll use a default locale
    console.error(`Failed to load messages for locale ${locale}:`, error);
    messages = (await import(`../../messages/en.json`)).default; // Fallback to English
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}