import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './index.js';

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/en': '/', // Add this line to make '/en' the default path
    '/pathnames': {
      en: '/en', // Change this to '/en'
      de: '/de'
      // Add other language-specific paths as needed
    },
    '/api/:path*': '/api/:path*' // This ensures API routes are not localized
  }
});

export const Pathnames = Object.keys(routing.pathnames);
export const Locale = routing.locales;

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation(routing);