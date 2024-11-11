import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

//set defaulut /en is /
const localePrefix = 'as-needed';
const middleware = createMiddleware({ ...routing, localePrefix });

export default function (request) {
  const { pathname } = request.nextUrl;

  // Remove the condition for '/en' redirection
  

  return middleware(request);
}

export const config = {
  matcher: [
    // Include the root '/' here
    '/',

    // Updated pattern with 18 additional language codes
    '/(de|en|es|fr|it|pt|ru|zh|ja|ko|ar|hi|nl|pl|sv|tr|id|th|vi|)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // Exclude /api/* routes from locale redirects
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};