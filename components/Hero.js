'use client';

import {useTranslations} from 'next-intl';
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import dynamic from 'next/dynamic';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
      {/* <a href="https://theresanaiforthat.com/ai/ai-pattern/?ref=featured&v=1423950" target="_blank" rel="nofollow"><img width="300" src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"/></a> */}
        
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          {t('title')}
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          {t('description')}
        </p>
        <a href="https://apps.apple.com/us/app/pok%C3%A9mon-tcg-pocket/id6479970832?mt=8">
          <button className="btn btn-primary btn-wide">
            {t('getButton', { appName: config.appName })}
          </button>
        </a>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full aspect-video">
        <iframe
          src="https://www.youtube.com/embed/haDmDhQmFMk"
          title="YouTube video player"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Hero;
