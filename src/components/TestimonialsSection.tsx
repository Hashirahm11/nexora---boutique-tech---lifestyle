import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/storeData';

const METRICS = [
  { value: '4,9 / 5', label: 'Note moyenne sur 1 420+ avis vérifiés' },
  { value: '24–48h', label: 'Expédition express partout au Maroc' },
  { value: '98,4%', label: 'Clients satisfaits et livrés dans les délais' },
];

export function TestimonialsSection() {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#F97316] rounded-full" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
                AVIS VÉRIFIÉS
              </span>
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#132238] tracking-tight">
              Ils font confiance à Nexora
            </h2>
          </div>

          {/* 3 Tabular Key Figures */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {METRICS.map((m) => (
              <div key={m.value}>
                <div className="text-[20px] font-extrabold text-[#132238] tabular-nums leading-none">
                  {m.value}
                </div>
                <div className="text-[11.5px] text-slate-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-0.5 text-[#F97316] mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F97316]" />
                  ))}
                </div>
                <p className="text-[14px] text-slate-700 leading-relaxed">
                  « {review.quote} »
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-[12.5px]">
                <div>
                  <div className="font-bold text-[#132238]">{review.name}</div>
                  <div className="text-slate-400">
                    {review.city} · {review.product}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">Achat vérifié</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
