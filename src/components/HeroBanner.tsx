import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Headphones,
  ShieldCheck,
  Headset,
} from 'lucide-react';
import { HERO_SLIDES, type CategoryId } from '../data/storeData';

interface HeroBannerProps {
  onSelectCollection: (cat: CategoryId) => void;
}

export function HeroBanner({ onSelectCollection }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentIndex];
  const isDark = Boolean(slide.darkTheme);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="accueil" className="pt-4 pb-8 sm:pt-5 sm:pb-10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div
          className={`relative rounded-[24px] overflow-hidden min-h-[430px] sm:min-h-[470px] flex items-center shadow-sm border border-slate-200/60 transition-colors duration-300 ${
            isDark ? 'bg-[#0C1B33]' : 'bg-[#FBF6EE]'
          }`}
        >
          {/* Background Image positioned cleanly on the right */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={`${slide.titleLine1} ${slide.titleHighlight} ${slide.titleLine3}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center lg:object-right transition-opacity duration-500"
            />
            {/* Seamless Left Scrim matching screenshot */}
            <div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-gradient-to-r from-[#0C1B33] via-[#0C1B33]/92 sm:via-[#0C1B33]/75 to-transparent'
                  : 'bg-gradient-to-r from-[#FBF6EE] via-[#FBF6EE]/95 sm:via-[#FBF6EE]/85 to-transparent'
              }`}
            />
          </div>

          {/* Handwritten script accent on upper right */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-14 right-12 lg:right-16 z-10 pointer-events-none -rotate-6"
          >
            <span className="font-script text-[32px] lg:text-[36px] text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]">
              {slide.scriptText}
            </span>
          </div>

          {/* Left Content Column */}
          <div className="relative z-10 w-full lg:w-[56%] px-7 sm:px-14 lg:px-16 py-10 sm:py-12">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xs shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" aria-hidden="true" />
              <span className="text-[12px] font-semibold text-[#132238] tracking-tight">
                {slide.tag}
              </span>
            </div>

            {/* Hero Headline */}
            <h1
              className={`text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold leading-[1.08] tracking-[-0.025em] max-w-[520px] [text-wrap:balance] ${
                isDark ? 'text-white' : 'text-[#132238]'
              }`}
            >
              <span className="block">{slide.titleLine1}</span>
              <span className="block text-[#F97316]">{slide.titleHighlight}</span>
              <span className="block">{slide.titleLine3}</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-4 text-[14.5px] sm:text-[15.5px] leading-[1.6] max-w-[440px] ${
                isDark ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              {slide.description}
            </p>

            {/* Primary CTA */}
            <div className="mt-7">
              <button
                type="button"
                onClick={() => {
                  onSelectCollection(slide.targetCategory);
                  document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[14px] font-semibold shadow-md shadow-[#F97316]/25 transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom 3 micro-trust features */}
            <div
              className={`mt-9 pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[490px] ${
                isDark ? 'text-slate-200' : 'text-[#132238]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-white/80 text-[#132238] flex items-center justify-center shrink-0 shadow-2xs">
                  <Headphones className="w-4 h-4" />
                </span>
                <div className="leading-tight">
                  <div className="text-[11.5px] font-bold">Livraison rapide</div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    partout au Maroc
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-white/80 text-[#132238] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div className="leading-tight">
                  <div className="text-[11.5px] font-bold">Paiement sécurisé</div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    100% fiable
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-white/80 text-[#132238] flex items-center justify-center shrink-0 shadow-2xs">
                  <Headset className="w-4 h-4" />
                </span>
                <div className="leading-tight">
                  <div className="text-[11.5px] font-bold">Service client</div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    7j/7
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Carousel Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Diapositive précédente"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#132238] shadow-md items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Carousel Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Diapositive suivante"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#132238] shadow-md items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Bottom Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Aller à la diapositive ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-5 bg-[#F97316]'
                    : 'w-2 bg-slate-300/90 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
