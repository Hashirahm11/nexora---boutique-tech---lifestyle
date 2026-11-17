import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Check,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CATEGORIES,
  formatPriceDA,
  type CategoryId,
  type Product,
} from '../data/storeData';

interface ProductGridProps {
  products: Product[];
  selectedCategory: CategoryId;
  onlyPromo: boolean;
  searchQuery: string;
  wishlistIds: string[];
  onResetFilters: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

type QuickFilter = 'all' | 'new' | 'promo';
type SortMode = 'featured' | 'price-asc' | 'price-desc' | 'discount';

export function ProductGrid({
  products,
  selectedCategory,
  onlyPromo,
  searchQuery,
  wishlistIds,
  onResetFilters,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}: ProductGridProps) {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const refinedProducts = useMemo(() => {
    let list = [...products];
    if (quickFilter === 'new') {
      list = list.filter((p) => p.isNew);
    } else if (quickFilter === 'promo') {
      list = list.filter((p) => p.discountPercent >= 20);
    }

    if (sortMode === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortMode === 'discount') {
      list.sort((a, b) => b.discountPercent - a.discountPercent);
    }
    return list;
  }, [products, quickFilter, sortMode]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(refinedProducts.length / pageSize));
  const safePage = page >= totalPages ? 0 : page;
  const visibleProducts = showAll
    ? refinedProducts
    : refinedProducts.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const activeCategoryName =
    selectedCategory === 'all'
      ? null
      : CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? null;

  const isFiltered =
    selectedCategory !== 'all' ||
    onlyPromo ||
    searchQuery.trim().length > 0 ||
    quickFilter !== 'all';

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1100);
  };

  return (
    <section id="boutique" className="py-6 sm:py-8">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[2px] bg-[#F97316] rounded-full" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
                PRODUITS PHARES
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#132238] tracking-tight">
                {onlyPromo
                  ? 'Offres spéciales jusqu’à -30%'
                  : activeCategoryName
                    ? activeCategoryName
                    : 'Les meilleures ventes'}
              </h2>
              <span className="text-[13px] font-medium text-slate-400 tabular-nums">
                ({refinedProducts.length} articles)
              </span>
              {isFiltered && (
                <button
                  type="button"
                  onClick={() => {
                    setPage(0);
                    setQuickFilter('all');
                    onResetFilters();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[12px] font-semibold text-[#132238] transition-colors cursor-pointer"
                >
                  <span>Tout afficher</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: Quick Filter Tabs + Sort + Pagination */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200/80 shadow-2xs">
              {(
                [
                  { id: 'all', label: 'Tous' },
                  { id: 'new', label: 'Nouveautés' },
                  { id: 'promo', label: 'Promos -20%+' },
                ] as { id: QuickFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setQuickFilter(tab.id);
                    setPage(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    quickFilter === tab.id
                      ? 'bg-[#132238] text-white'
                      : 'text-slate-600 hover:text-[#132238]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative inline-flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                aria-label="Trier les produits"
                className="h-9 pl-8 pr-3 rounded-full bg-white border border-slate-200 text-[12.5px] font-semibold text-[#132238] focus:outline-none focus:border-[#F97316] cursor-pointer"
              >
                <option value="featured">Populaires</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="discount">Meilleures remises</option>
              </select>
            </div>

            {!showAll && totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                  aria-label="Produits précédents"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#132238] hover:border-[#F97316] hover:text-[#F97316] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => (p + 1) % totalPages)}
                  aria-label="Produits suivants"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#132238] hover:border-[#F97316] hover:text-[#F97316] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-100 p-12 text-center">
            <p className="text-[16px] font-semibold text-[#132238]">
              Aucun produit ne correspond à votre recherche.
            </p>
            <p className="text-[13.5px] text-slate-500 mt-1">
              Essayez un autre mot-clé ou réinitialisez les filtres pour voir tout le catalogue.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuickFilter('all');
                onResetFilters();
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-semibold hover:bg-[#EA580C] transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);
                const isAdded = addedId === product.id;

                return (
                  <article
                    key={product.id}
                    className="group bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3.6] rounded-xl bg-[#F4F5F7] overflow-hidden mb-3.5">
                      {/* Discount Badge */}
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-[#F97316] text-white text-[11px] font-bold tabular-nums shadow-xs">
                        -{product.discountPercent}%
                      </span>

                      {/* Wishlist Heart Button */}
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        aria-label={
                          isWishlisted
                            ? `Retirer ${product.name} des favoris`
                            : `Ajouter ${product.name} aux favoris`
                        }
                        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-xs flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isWishlisted
                              ? 'fill-[#F97316] text-[#F97316]'
                              : 'text-slate-600 hover:text-[#F97316]'
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="w-full h-full flex items-center justify-center p-3 cursor-pointer focus-visible:outline-none"
                        aria-label={`Voir les détails de ${product.name}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-1 px-1">
                      <span className="text-[11px] font-medium text-slate-400 mb-0.5">
                        {product.categoryLabel}
                        {product.isNew ? ' · Nouveauté' : ''}
                      </span>

                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="text-left text-[15px] font-bold text-[#132238] hover:text-[#F97316] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </button>

                      {/* Rating */}
                      <div className="mt-1.5 flex items-center gap-1">
                        <div className="flex items-center gap-0.5 text-[#F97316]" aria-label={`${product.rating} sur 5`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < product.rating ? 'fill-[#F97316] text-[#F97316]' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11.5px] text-slate-400 font-medium tabular-nums ml-0.5">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-2.5 flex items-baseline gap-2 tabular-nums">
                        <span className="text-[16px] font-extrabold text-[#F97316]">
                          {formatPriceDA(product.price)}
                        </span>
                        <span className="text-[12px] text-slate-400 line-through">
                          {formatPriceDA(product.oldPrice)}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`mt-3.5 w-full h-10 rounded-full text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer active:scale-[0.98] whitespace-nowrap ${
                          isAdded
                            ? 'bg-[#132238] text-white'
                            : 'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-xs shadow-[#F97316]/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Ajouté au panier</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Ajouter au panier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {refinedProducts.length > pageSize && (
              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="px-6 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#F97316] text-[13px] font-semibold text-[#132238] hover:text-[#F97316] transition-colors shadow-2xs cursor-pointer"
                >
                  {showAll
                    ? 'Réduire la vue'
                    : `Voir tout le catalogue (${refinedProducts.length} produits)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
