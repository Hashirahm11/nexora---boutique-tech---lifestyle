import { ArrowRight } from 'lucide-react';
import { PROMO_IMAGE } from '../data/storeData';

interface PromoBannerProps {
  onShowPromoOffers: () => void;
}

export function PromoBanner({ onShowPromoOffers }: PromoBannerProps) {
  return (
    <section className="py-5 sm:py-7">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[22px] overflow-hidden bg-[#0C1B33] min-h-[250px] sm:min-h-[275px] flex items-center shadow-md">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={PROMO_IMAGE}
              alt="Offre spéciale console gaming et ordinateur portable jusqu'à -30%"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-right"
            />
            {/* Smooth Navy Left Scrim for WCAG AA legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1B33] via-[#0C1B33]/92 sm:via-[#0C1B33]/78 to-transparent" />
          </div>

          {/* Handwritten script accent on the right */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-1/2 -translate-y-1/2 right-8 lg:right-12 z-10 pointer-events-none -rotate-6 text-right"
          >
            <span className="font-script text-[32px] lg:text-[38px] leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)] block">
              Tech
              <br />
              &amp; Style
            </span>
          </div>

          {/* Left Content */}
          <div className="relative z-10 w-full md:w-[58%] px-7 sm:px-12 py-8 sm:py-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/15 text-white text-[11.5px] font-semibold mb-4">
              Offre spéciale
            </span>

            <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white leading-[1.12] tracking-tight [text-wrap:balance]">
              Jusqu’à <span className="text-[#F97316]">-30%</span>
              <span className="block text-[22px] sm:text-[27px] font-bold mt-1">
                sur une sélection de produits
              </span>
            </h2>

            <p className="mt-3 text-[13.5px] sm:text-[14.5px] text-slate-200 max-w-[380px] leading-relaxed">
              Équipez-vous avec les meilleures marques et profitez de nos offres illimitées !
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={onShowPromoOffers}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[13.5px] font-semibold shadow-md shadow-[#F97316]/25 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>Voir l’offre</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
