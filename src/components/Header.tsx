import { useState, useRef, useEffect } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { NexoraLogo } from './NexoraLogo';
import { CATEGORIES, type CategoryId } from '../data/storeData';

interface HeaderProps {
  activeNav: string;
  onNavigate: (section: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

export function Header({
  activeNav,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryPick = (id: CategoryId) => {
    onSelectCategory(id);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('boutique');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 h-[74px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Left: Brand */}
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            onNavigate('accueil');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-lg"
          aria-label="Nexora Accueil"
        >
          <NexoraLogo variant="dark" showTagline />
        </a>

        {/* Center: Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-slate-600">
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('accueil');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'accueil'
                ? 'text-[#132238] font-semibold'
                : 'hover:text-[#132238]'
            }`}
          >
            Accueil
            {activeNav === 'accueil' && (
              <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-[#F97316] rounded-full" />
            )}
          </a>

          <a
            href="#boutique"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('boutique');
              document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'boutique'
                ? 'text-[#132238] font-semibold'
                : 'hover:text-[#132238]'
            }`}
          >
            Boutique
            {activeNav === 'boutique' && (
              <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-[#F97316] rounded-full" />
            )}
          </a>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              className="inline-flex items-center gap-1 py-1 whitespace-nowrap shrink-0 hover:text-[#132238] transition-colors cursor-pointer"
            >
              <span>Catégories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                <button
                  type="button"
                  onClick={() => handleCategoryPick('all')}
                  className={`w-full px-4 py-2.5 text-left text-[13px] flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedCategory === 'all' ? 'text-[#F97316] font-semibold' : 'text-[#132238]'
                  }`}
                >
                  <span>Toutes les catégories</span>
                  <span className="text-[11px] text-slate-400 tabular-nums">102</span>
                </button>
                <div className="my-1 border-t border-slate-100" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryPick(cat.id)}
                    className={`w-full px-4 py-2 text-left text-[13px] flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      selectedCategory === cat.id
                        ? 'text-[#F97316] font-semibold bg-orange-50/50'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400 tabular-nums">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#apropos"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('apropos');
              document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'apropos'
                ? 'text-[#132238] font-semibold'
                : 'hover:text-[#132238]'
            }`}
          >
            À propos
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'contact'
                ? 'text-[#132238] font-semibold'
                : 'hover:text-[#132238]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative w-[210px] xl:w-[240px]">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim().length > 0) {
                  document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }}
              placeholder="Rechercher un produit..."
              aria-label="Rechercher un produit"
              className="w-full h-10 pl-4 pr-10 rounded-full bg-[#F3F4F6] text-[13px] text-[#132238] placeholder:text-slate-400 border border-transparent focus:border-[#F97316]/40 focus:bg-white focus:outline-none transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Effacer la recherche"
                className="absolute right-3 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-slate-500 absolute right-3.5 pointer-events-none" />
            )}
          </div>

          {/* Account */}
          <button
            type="button"
            onClick={onOpenAccount}
            aria-label="Mon compte"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#132238] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <User className="w-[19px] h-[19px]" strokeWidth={1.8} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label="Mes favoris"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#132238] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Heart className="w-[19px] h-[19px]" strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Mon panier"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#132238] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-[19px] h-[19px]" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#132238] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#132238] hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full h-10 pl-4 pr-10 rounded-full bg-[#F3F4F6] text-[13px] text-[#132238] placeholder:text-slate-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[14px] font-medium">
            <a
              href="#accueil"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-orange-50 text-[#F97316] font-semibold"
            >
              Accueil
            </a>
            <a
              href="#boutique"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 text-[#132238]"
            >
              Boutique
            </a>
            <a
              href="#apropos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 text-[#132238]"
            >
              À propos
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 text-[#132238]"
            >
              Contact
            </a>
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryPick(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#F97316] text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
