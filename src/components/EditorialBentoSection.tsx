import { useState } from 'react';
import { ShoppingBag, ArrowRight, Plus, Check } from 'lucide-react';
import {
  WORKSPACE_IMAGE,
  AUDIO_LIFESTYLE_IMAGE,
  PRODUCTS,
  formatPriceDA,
  type Product,
} from '../data/storeData';

interface EditorialBentoSectionProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

interface HotspotItem {
  id: string;
  productId: string;
  x: string;
  y: string;
  label: string;
}

const WORKSPACE_HOTSPOTS: HotspotItem[] = [
  { id: 'pin-laptop', productId: 'macbook-air-m2', x: '44%', y: '53%', label: 'MacBook Air M2' },
  { id: 'pin-phone', productId: 'iphone-15-pro', x: '67%', y: '75%', label: 'iPhone 15 Pro' },
  { id: 'pin-watch', productId: 'samsung-galaxy-watch-6', x: '77%', y: '80%', label: 'Galaxy Watch 6' },
  { id: 'pin-audio', productId: 'nexora-studio-anc', x: '84%', y: '62%', label: 'Nexora Sound Pro' },
];

export function EditorialBentoSection({
  onAddToCart,
  onQuickView,
}: EditorialBentoSectionProps) {
  const [activePinId, setActivePinId] = useState<string>('pin-laptop');
  const [bundleAdded, setBundleAdded] = useState(false);

  const activePin = WORKSPACE_HOTSPOTS.find((h) => h.id === activePinId) || WORKSPACE_HOTSPOTS[0];
  const activeProduct = PRODUCTS.find((p) => p.id === activePin.productId) || PRODUCTS[1];
  const audioHeadphone = PRODUCTS.find((p) => p.id === 'nexora-studio-anc') || PRODUCTS[4];

  const handleAddWorkspacePack = () => {
    const packIds = ['macbook-air-m2', 'nexora-studio-anc', 'samsung-galaxy-watch-6'];
    packIds.forEach((id) => {
      const found = PRODUCTS.find((p) => p.id === id);
      if (found) onAddToCart(found);
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 1800);
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#F97316] rounded-full" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
                INSPIRATION SETUP
              </span>
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#132238] tracking-tight">
              Composez votre espace connecté
            </h2>
          </div>
          <p className="text-[13.5px] text-slate-500 max-w-md">
            Cliquez sur les points interactifs de la scène pour découvrir et commander chaque pièce du setup.
          </p>
        </div>

        {/* Asymmetric 12-Col Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left 7 cols: Interactive Hotspot Workspace Photo */}
          <div className="lg:col-span-7 relative rounded-[22px] overflow-hidden bg-[#132238] min-h-[360px] sm:min-h-[430px] shadow-sm group">
            <img
              src={WORKSPACE_IMAGE}
              alt="Setup bureau connecté Nexora"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C192C]/85 via-transparent to-[#0C192C]/15 pointer-events-none" />

            {/* Interactive Hotspot Pins */}
            {WORKSPACE_HOTSPOTS.map((pin) => {
              const isSelected = pin.id === activePinId;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActivePinId(pin.id)}
                  style={{ left: pin.x, top: pin.y }}
                  aria-label={`Sélectionner ${pin.label}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-150 cursor-pointer shadow-lg ${
                    isSelected
                      ? 'bg-[#F97316] text-white scale-115 ring-4 ring-white/40'
                      : 'bg-white/95 text-[#132238] hover:scale-110'
                  }`}
                >
                  <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
                </button>
              );
            })}

            {/* Bottom Selected Product Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[340px] z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/60 flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-xl bg-[#F4F5F7] p-1.5 shrink-0 flex items-center justify-center">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#F97316]">
                  {activeProduct.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={() => onQuickView(activeProduct)}
                  className="block text-left text-[14px] font-bold text-[#132238] hover:text-[#F97316] truncate w-full cursor-pointer"
                >
                  {activeProduct.name}
                </button>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-[14px] font-extrabold text-[#132238] tabular-nums">
                    {formatPriceDA(activeProduct.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart(activeProduct)}
                    className="px-3 py-1 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[11.5px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Audio Studio Card + Pack CTA */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative flex-1 rounded-[22px] overflow-hidden bg-[#0F1E34] min-h-[250px] shadow-sm">
              <img
                src={AUDIO_LIFESTYLE_IMAGE}
                alt="Édition Studio Audio Nexora"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C192C]/90 via-[#0C192C]/35 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange-300">
                  Acoustique Haute Fidélité
                </span>
                <h3 className="text-[20px] font-extrabold mt-1 leading-snug">
                  Série Studio Audio &amp; DAC
                </h3>
                <p className="text-[13px] text-slate-200 mt-1 leading-relaxed">
                  Casques à réduction de bruit active et matériaux nobles pour une écoute sans compromis.
                </p>
                <button
                  type="button"
                  onClick={() => onQuickView(audioHeadphone)}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  <span>Découvrir le casque studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Curated Setup Bundle Card */}
            <div className="rounded-[22px] bg-white border border-slate-100 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F97316]">
                  Pack Créateur · Économisez 20%
                </span>
                <h4 className="text-[16px] font-extrabold text-[#132238] mt-0.5">
                  MacBook + Casque + Montre
                </h4>
                <p className="text-[12.5px] text-slate-500 mt-0.5 tabular-nums">
                  Lot complet prêt à l’emploi — <strong className="text-[#132238]">2 337,00 DA</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddWorkspacePack}
                className={`shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  bundleAdded
                    ? 'bg-[#132238] text-white'
                    : 'bg-[#F97316] hover:bg-[#EA580C] text-white'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Pack ajouté</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter le pack</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
