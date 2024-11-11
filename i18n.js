import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'sv', 'da', 'fi'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));

