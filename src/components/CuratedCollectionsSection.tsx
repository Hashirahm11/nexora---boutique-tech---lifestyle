import { useState } from 'react';
import { ShoppingCart, ArrowUpRight, Check } from 'lucide-react';
import { PRODUCTS, formatPriceDA, type Product } from '../data/storeData';

interface CuratedCollectionsSectionProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

interface LifestyleTab {
  id: 'work' | 'audio' | 'mobility';
  label: string;
  headline: string;
  description: string;
  highlights: string[];
  productIds: string[];
}

const LIFESTYLE_TABS: LifestyleTab[] = [
  {
    id: 'work',
    label: 'Bureau & Création',
    headline: 'Productivité fluide du matin au soir',
    description:
      'Des outils légers, endurants et silencieux pensés pour les créatifs, développeurs et étudiants exigeants.',
    highlights: ['Autonomie jusqu’à 18h', 'Écrans calibrés haute précision', 'Clavier tri-mode sans fil'],
    productIds: ['macbook-air-m2', 'ipad-pro-stylet', 'clavier-mecanique-k75'],
  },
  {
    id: 'audio',
    label: 'Audio & Immersion',
    headline: 'Chaque détail sonore restitué avec justesse',
    description:
      'Casques studio, écouteurs ANC de poche et enceintes 360° IP67 pour vos trajets et moments de détente.',
    highlights: ['Réduction de bruit jusqu’à -45 dB', 'Bluetooth 5.3 multipoint', 'Charge rapide USB-C'],
    productIds: ['nexora-buds-pro', 'nexora-studio-anc', 'enceinte-pulse-360'],
  },
  {
    id: 'mobility',
    label: 'Mobilité & Lifestyle',
    headline: 'Pensé pour bouger avec style et organisation',
    description:
      'Bagagerie technique déperlante, montres connectées et sneakers respirantes pour accompagner vos déplacements.',
    highlights: ['Tissus déperlants haute densité', 'Suivi santé & GPS précis', 'Confort longue distance'],
    productIds: ['sac-weekender-nomad', 'nike-velocity-runner', 'sac-a-dos-urban-tech'],
  },
];

export function CuratedCollectionsSection({
  onAddToCart,
  onQuickView,
}: CuratedCollectionsSectionProps) {
  const [activeTabId, setActiveTabId] = useState<LifestyleTab['id']>('work');
  const [addedId, setAddedId] = useState<string | null>(null);

  const activeTab = LIFESTYLE_TABS.find((t) => t.id === activeTabId) || LIFESTYLE_TABS[0];
  const tabProducts = activeTab.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId((curr) => (curr === product.id ? null : curr)), 1000);
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div className="rounded-[24px] bg-white border border-slate-100 p-6 sm:p-8 shadow-2xs">
          {/* Top Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-[2px] bg-[#F97316] rounded-full" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
                  SÉLECTIONS THÉMATIQUES
                </span>
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#132238] tracking-tight">
                Trouvez l’équipement adapté à votre rythme
              </h2>
            </div>

            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F4F5F7]">
              {LIFESTYLE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTabId === tab.id
                      ? 'bg-white text-[#132238] shadow-xs'
                      : 'text-slate-600 hover:text-[#132238]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-[20px] font-extrabold text-[#132238] leading-snug [text-wrap:balance]">
                {activeTab.headline}
              </h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed">
                {activeTab.description}
              </p>
              <ul className="space-y-2 pt-1">
                {activeTab.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] font-medium text-[#132238]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tabProducts.map((product) => {
                const isAdded = addedId === product.id;
                return (
                  <div
                    key={product.id}
                    className="group rounded-2xl bg-[#F8F9FB] border border-slate-100 p-3.5 flex flex-col hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="relative aspect-[4/3] rounded-xl bg-white p-2.5 flex items-center justify-center overflow-hidden mb-3 cursor-pointer"
                    >
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#F97316] text-white text-[10px] font-bold tabular-nums">
                        -{product.discountPercent}%
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="text-left text-[14px] font-bold text-[#132238] hover:text-[#F97316] line-clamp-1 flex items-center justify-between gap-1 cursor-pointer"
                    >
                      <span className="truncate">{product.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>

                    <div className="mt-1.5 flex items-baseline gap-2 tabular-nums">
                      <span className="text-[14.5px] font-extrabold text-[#F97316]">
                        {formatPriceDA(product.price)}
                      </span>
                      <span className="text-[11.5px] text-slate-400 line-through">
                        {formatPriceDA(product.oldPrice)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      className={`mt-3 w-full h-9 rounded-full text-[12px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isAdded
                          ? 'bg-[#132238] text-white'
                          : 'bg-white border border-slate-200 hover:border-[#F97316] hover:bg-[#F97316] hover:text-white text-[#132238]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
