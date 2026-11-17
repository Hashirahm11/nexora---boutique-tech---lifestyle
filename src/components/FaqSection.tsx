import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/storeData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#F97316] rounded-full" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
                AIDE &amp; LIVRAISON
              </span>
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#132238] tracking-tight">
              Questions fréquentes
            </h2>
            <p className="mt-2.5 text-[14px] text-slate-500 leading-relaxed">
              Tout savoir sur l’expédition rapide au Maroc, le paiement à la livraison et nos garanties constructeur.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-[14.5px] font-bold text-[#132238]">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#F97316] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
