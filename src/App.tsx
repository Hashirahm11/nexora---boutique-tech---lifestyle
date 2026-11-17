/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryStrip } from './components/CategoryStrip';
import { ProductGrid } from './components/ProductGrid';
import { EditorialBentoSection } from './components/EditorialBentoSection';
import { CuratedCollectionsSection } from './components/CuratedCollectionsSection';
import { PromoBanner } from './components/PromoBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { TrustStrip } from './components/TrustStrip';
import { Footer } from './components/Footer';
import {
  CartDrawer,
  WishlistDrawer,
  QuickViewModal,
  InfoModal,
  type CartItem,
} from './components/DrawersAndModals';
import { PRODUCTS, type CategoryId, type Product } from './data/storeData';

export default function App() {
  const [activeNav, setActiveNav] = useState('accueil');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [wishlistIds, setWishlistIds] = useState<string[]>([
    PRODUCTS[0].id,
    PRODUCTS[2].id,
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0],
    },
    {
      product: PRODUCTS[3],
      quantity: 1,
      selectedColor: PRODUCTS[3].colors[0],
    },
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [infoModal, setInfoModal] = useState<'account' | 'terms' | 'privacy' | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (onlyPromo && !p.isPromo) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.categoryLabel.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, onlyPromo, searchQuery]);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, color?: string) => {
    const chosenColor = color || product.colors[0] || 'Standard';
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: chosenColor }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSelectCategory = (cat: CategoryId) => {
    setOnlyPromo(false);
    setSelectedCategory(cat);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setOnlyPromo(false);
    setSearchQuery('');
  };

  const handleShowPromoOffers = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlyPromo(true);
    document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNavigateSection = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-[#132238]">
      <Header
        activeNav={activeNav}
        onNavigate={setActiveNav}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAccount={() => setInfoModal('account')}
      />

      <main className="flex-1">
        <HeroBanner onSelectCollection={handleSelectCategory} />

        <CategoryStrip
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onlyPromo={onlyPromo}
          searchQuery={searchQuery}
          wishlistIds={wishlistIds}
          onResetFilters={handleResetFilters}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(product) => handleAddToCart(product)}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        <EditorialBentoSection
          onAddToCart={(product) => handleAddToCart(product)}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        <CuratedCollectionsSection
          onAddToCart={(product) => handleAddToCart(product)}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        <PromoBanner onShowPromoOffers={handleShowPromoOffers} />

        <TestimonialsSection />

        <FaqSection />

        <TrustStrip />
      </main>

      <Footer
        onOpenLegal={(type) => setInfoModal(type)}
        onNavigateSection={handleNavigateSection}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        open={wishlistOpen}
        products={wishlistProducts}
        onClose={() => setWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onMoveToCart={(product) => {
          handleAddToCart(product);
          setWishlistOpen(false);
          setCartOpen(true);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <InfoModal mode={infoModal} onClose={() => setInfoModal(null)} />
    </div>
  );
}
