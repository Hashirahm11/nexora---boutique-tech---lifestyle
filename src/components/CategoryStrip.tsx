import { ArrowRight } from 'lucide-react';
import { CATEGORIES, type CategoryId } from '../data/storeData';

interface CategoryStripProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

export function CategoryStrip({ selectedCategory, onSelectCategory }: CategoryStripProps) {
  const handleSelect = (cat: CategoryId) => {
    onSelectCategory(cat === selectedCategory ? 'all' : cat);
    document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#F97316] rounded-full" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
                NOS CATÉGORIES
              </span>
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#132238] tracking-tight">
              Explorez nos univers
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#132238] hover:text-[#F97316] transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            <span>Voir toutes les catégories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelect(category.id)}
                className={`group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-2xl transition-all duration-150 cursor-pointer`}
              >
                <div
                  className={`w-full aspect-[4/3] rounded-2xl bg-white p-2.5 flex items-center justify-center border transition-all duration-200 shadow-2xs group-hover:-translate-y-0.5 group-hover:shadow-md ${
                    isActive
                      ? 'border-[#F97316] ring-2 ring-[#F97316]/20'
                      : 'border-slate-100 group-hover:border-slate-200'
                  }`}
                >
                  <div className="w-full h-full rounded-xl bg-[#F4F5F7] overflow-hidden flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-1.5 transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                </div>
                <span
                  className={`mt-2.5 text-[12.5px] font-semibold leading-snug transition-colors ${
                    isActive ? 'text-[#F97316]' : 'text-[#132238] group-hover:text-[#F97316]'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
