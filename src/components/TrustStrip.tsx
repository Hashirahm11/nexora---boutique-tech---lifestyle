import { BadgeCheck, Truck, ShieldCheck, Headset } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: BadgeCheck,
    title: 'Produits originaux',
    subtitle: 'Garantie constructeur',
  },
  {
    icon: Truck,
    title: 'Livraison rapide',
    subtitle: 'Partout au Maroc',
  },
  {
    icon: ShieldCheck,
    title: 'Paiement sécurisé',
    subtitle: '100% fiable',
  },
  {
    icon: Headset,
    title: 'Support client',
    subtitle: 'Toujours à votre écoute',
  },
];

export function TrustStrip() {
  return (
    <section id="apropos" className="py-5 sm:py-8">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-100 px-5 py-4.5 shadow-2xs flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#132238] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
