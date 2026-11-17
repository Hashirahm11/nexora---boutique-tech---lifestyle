import { useState, type FormEvent } from 'react';
import { ChevronRight, Check, Download } from 'lucide-react';
import { NexoraLogo } from './NexoraLogo';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  onNavigateSection: (id: string) => void;
}

export function Footer({ onOpenLegal, onNavigateSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer id="contact" className="relative mt-10 bg-[#0F1E34] text-white overflow-hidden">
      {/* Top Curved Wave Transition */}
      <div className="bg-[#F8F9FB] leading-none">
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Subtle Orange Accent Swooshes on Left & Right Edges */}
          <path
            d="M0 10C120 5 200 28 290 48C190 52 90 48 0 38V10Z"
            fill="#F97316"
          />
          <path
            d="M1440 8C1310 4 1230 30 1135 50C1245 55 1345 48 1440 36V8Z"
            fill="#F97316"
          />
          {/* Deep Navy Main Curve */}
          <path
            d="M0 32C320 68 580 12 880 28C1130 42 1300 44 1440 24V70H0V32Z"
            fill="#0F1E34"
          />
        </svg>
      </div>

      {/* Subtle Orange Botanical Leaf Accents matching screenshot */}
      <svg
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute bottom-0 left-0 w-24 h-36 opacity-90"
        viewBox="0 0 100 150"
        fill="none"
      >
        <path d="M-8 150C8 118 24 98 38 90C34 116 18 136 -8 150Z" fill="#EA580C" />
        <path d="M12 150C28 124 46 112 58 108C48 128 32 142 12 150Z" fill="#F97316" />
        <path d="M-10 118C4 92 16 74 22 64C22 86 10 105 -10 118Z" fill="#F97316" fillOpacity="0.85" />
      </svg>

      <svg
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute bottom-0 right-0 w-24 h-36 opacity-90"
        viewBox="0 0 100 150"
        fill="none"
      >
        <path d="M108 150C92 118 76 98 62 90C66 116 82 136 108 150Z" fill="#EA580C" />
        <path d="M88 150C72 124 54 112 42 108C52 128 68 142 88 150Z" fill="#F97316" />
        <path d="M110 118C96 92 84 74 78 64C78 86 90 105 110 118Z" fill="#F97316" fillOpacity="0.85" />
      </svg>

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 pt-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-4">
            <NexoraLogo variant="light" showTagline />
            <p className="text-[13px] text-slate-300 leading-relaxed max-w-[260px]">
              Votre boutique en ligne pour un quotidien plus simple et plus connecté.
            </p>
          </div>

          {/* Col 2: Liens utiles */}
          <div className="lg:col-span-2">
            <h3 className="text-[14px] font-bold text-white mb-4">Liens utiles</h3>
            <ul className="space-y-2.5 text-[13px] text-slate-300">
              <li>
                <a
                  href="#accueil"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F97316] transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#boutique"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('boutique');
                  }}
                  className="hover:text-[#F97316] transition-colors"
                >
                  Boutique
                </a>
              </li>
              <li>
                <a
                  href="#apropos"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('apropos');
                  }}
                  className="hover:text-[#F97316] transition-colors"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('contact');
                  }}
                  className="hover:text-[#F97316] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Suivez-nous */}
          <div className="lg:col-span-2">
            <h3 className="text-[14px] font-bold text-white mb-4">Suivez-nous</h3>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook Nexora"
                className="w-9 h-9 rounded-full bg-white text-[#0F1E34] hover:bg-[#F97316] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.4l.6-3H13v-1.5c0-.3.2-.5.5-.5Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram Nexora"
                className="w-9 h-9 rounded-full bg-white text-[#0F1E34] hover:bg-[#F97316] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="#tiktok"
                onClick={(e) => e.preventDefault()}
                aria-label="TikTok Nexora"
                className="w-9 h-9 rounded-full bg-white text-[#0F1E34] hover:bg-[#F97316] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.8 5.2A4.2 4.2 0 0 0 19.5 6v2.7a6.8 6.8 0 0 1-2.7-.6v6.2a5.3 5.3 0 1 1-4.6-5.3v2.8a2.5 2.5 0 1 0 1.8 2.4V3h2.8v2.2Z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube Nexora"
                className="w-9 h-9 rounded-full bg-white text-[#0F1E34] hover:bg-[#F97316] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-[14px] font-bold text-white mb-2">Newsletter</h3>
            <p className="text-[13px] text-slate-300 mb-3.5">
              Recevez nos offres exclusives et nos nouveautés !
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center max-w-[340px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail"
                aria-label="Votre adresse e-mail"
                className="w-full h-11 pl-4 pr-12 rounded-full bg-white text-[#132238] text-[13px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
              <button
                type="submit"
                aria-label="S'inscrire à la newsletter"
                className="absolute right-1.5 w-8 h-8 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[12px] text-orange-300 mt-2 font-medium">
                Merci ! Vous êtes bien inscrit(e) aux offres Nexora.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-400">
          <p>© 2025 Nexora. Tous droits réservés.</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Conditions générales
            </button>
            <span className="text-slate-600" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <span className="text-slate-600" aria-hidden="true">
              |
            </span>
            <a
              href="/nexora-landing.zip"
              download="nexora-landing.zip"
              className="inline-flex items-center gap-1.5 text-orange-300 hover:text-orange-200 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger (.zip)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
