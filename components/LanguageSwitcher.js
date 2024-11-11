"use client";

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageSwitcher');

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments.length > 0 && locales.includes(segments[0]) ? segments[0] : 'en';

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;

    if (newLocale === currentLocale) {
      // 强制刷新页面
      router.replace(pathname);
    } else {
      let newPathname;
      if (newLocale === 'en') {
        // 切换到英语时，先跳转到 /en 再跳转到 /
        newPathname = `/${newLocale}${pathname.replace(`/${currentLocale}`, '')}`;
        router.push(newPathname).then(() => {
          router.push('/');
        });
      } else {
        // 切换到其他语言时，添加新的语言前缀
        newPathname = `/${newLocale}${pathname.replace(`/${currentLocale}`, '')}`;
        router.push(newPathname);
      }
    }
  };

  return (
    <select onChange={handleLanguageChange} value={currentLocale} className="select select-bordered select-sm">
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {t(`language.${locale}`)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;