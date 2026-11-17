import { useState, type FormEvent } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Star,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { formatPriceDA, type Product } from '../data/storeData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

/* ---------------- Cart Slide-Over Drawer ---------------- */
interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    const orderNum = `NX-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(orderNum);
    onClearCart();
    setCheckoutMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#0C192C]/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Panier d'achat"
        className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#F97316]" />
            <h2 className="text-[17px] font-extrabold text-[#132238]">Mon Panier</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panier"
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {confirmedOrderId ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#132238]">
                Commande #{confirmedOrderId} confirmée !
              </h3>
              <p className="text-[13.5px] text-slate-600 max-w-xs mx-auto leading-relaxed">
                Merci {customerName || 'pour votre confiance'}. Notre équipe prépare votre colis pour
                une livraison rapide à {customerCity || 'votre adresse'}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrderId(null);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-semibold hover:bg-[#EA580C] cursor-pointer"
              >
                Continuer mes achats
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <p className="text-[15px] font-bold text-[#132238]">Votre panier est vide</p>
              <p className="text-[13px] text-slate-500">
                Explorez nos meilleures ventes et ajoutez vos produits favoris.
              </p>
            </div>
          ) : checkoutMode ? (
            <form id="nexora-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="rounded-xl bg-orange-50/70 border border-orange-100 p-3.5 text-[12.5px] text-[#132238]">
                <strong>Paiement à la livraison (COD)</strong> ou par carte sécurisée à la réception.
                Livraison gratuite dès 500,00 DA.
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-[#132238] mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Yassine Benali"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-[#F97316]"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-[#132238] mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ex: +212 6 00 00 00 00"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-[#F97316]"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-[#132238] mb-1">
                  Ville &amp; Adresse de livraison
                </label>
                <input
                  type="text"
                  required
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="Ex: Casablanca, Maarif"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-[#F97316]"
                />
              </div>
              <button
                type="button"
                onClick={() => setCheckoutMode(false)}
                className="text-[12.5px] font-semibold text-slate-500 hover:text-[#132238] cursor-pointer"
              >
                ← Retour au panier
              </button>
            </form>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-[#FAFBFC]"
              >
                <div className="w-20 h-20 rounded-xl bg-white p-1.5 shrink-0 flex items-center justify-center border border-slate-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-[14px] font-bold text-[#132238] truncate">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label={`Supprimer ${item.product.name}`}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">{item.selectedColor}</p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[14px] font-extrabold text-[#F97316] tabular-nums">
                      {formatPriceDA(item.product.price * item.quantity)}
                    </span>
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        aria-label="Diminuer la quantité"
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-[#132238] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-[12.5px] font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        aria-label="Augmenter la quantité"
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-[#132238] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && !confirmedOrderId && (
          <div className="p-6 border-t border-slate-100 bg-white space-y-4">
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-slate-500 font-medium">Sous-total</span>
              <span className="text-[18px] font-extrabold text-[#132238] tabular-nums">
                {formatPriceDA(subtotal)}
              </span>
            </div>
            {checkoutMode ? (
              <button
                type="submit"
                form="nexora-checkout-form"
                className="w-full h-11 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Confirmer la commande
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCheckoutMode(true)}
                className="w-full h-11 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                Passer la commande
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

/* ---------------- Wishlist Drawer ---------------- */
interface WishlistDrawerProps {
  open: boolean;
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
}

export function WishlistDrawer({
  open,
  products,
  onClose,
  onRemove,
  onMoveToCart,
}: WishlistDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#0C192C]/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Mes favoris"
        className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#F97316] fill-[#F97316]" />
            <h2 className="text-[17px] font-extrabold text-[#132238]">Mes Favoris</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer les favoris"
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {products.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-[15px] font-bold text-[#132238]">Aucun favori pour le moment</p>
              <p className="text-[13px] text-slate-500">
                Cliquez sur le cœur d’un produit pour le sauvegarder ici.
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-[#FAFBFC]"
              >
                <div className="w-20 h-20 rounded-xl bg-white p-1.5 shrink-0 flex items-center justify-center border border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-[14px] font-bold text-[#132238] truncate">
                      {product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Retirer ${product.name}`}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[14px] font-extrabold text-[#F97316] mt-1 tabular-nums">
                    {formatPriceDA(product.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onMoveToCart(product)}
                    className="mt-2.5 px-4 py-1.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[12px] font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Product Quick-View Modal ---------------- */
interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string) => void;
}

export function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0] || 'Standard';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#0C192C]/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer l'aperçu"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white shadow-sm hover:bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-[#F4F5F7] p-8 flex items-center justify-center min-h-[260px]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full max-h-[260px] object-contain"
          />
        </div>

        <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F97316]">
              {product.categoryLabel}
            </span>
            <h3 className="text-[22px] font-extrabold text-[#132238] mt-1">{product.name}</h3>

            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-[#F97316]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F97316]" />
                ))}
              </div>
              <span className="text-[12px] text-slate-500 tabular-nums">
                ({product.reviews} avis clients)
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2.5 tabular-nums">
              <span className="text-[22px] font-extrabold text-[#F97316]">
                {formatPriceDA(product.price)}
              </span>
              <span className="text-[14px] text-slate-400 line-through">
                {formatPriceDA(product.oldPrice)}
              </span>
            </div>

            <p className="mt-3 text-[13.5px] text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Variants */}
            <div className="mt-4">
              <span className="block text-[12px] font-bold text-[#132238] mb-2">
                Finition : {activeColor}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-colors cursor-pointer ${
                      activeColor === color
                        ? 'border-[#F97316] bg-orange-50 text-[#F97316]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4 text-[12px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#F97316]" /> Livraison 24-48h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" /> Garantie 1 an
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToCart(product, activeColor);
                onClose();
              }}
              className="w-full h-11 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Account & Legal Modal ---------------- */
interface InfoModalProps {
  mode: 'account' | 'terms' | 'privacy' | null;
  onClose: () => void;
}

export function InfoModal({ mode, onClose }: InfoModalProps) {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');

  if (!mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#0C192C]/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {mode === 'account' && (
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-[20px] font-extrabold text-[#132238]">Espace Client Nexora</h3>
            {signedIn ? (
              <div className="space-y-3">
                <p className="text-[13.5px] text-slate-600">
                  Connecté en tant que <strong>{email}</strong>. Vos commandes et favoris sont
                  synchronisés sur cet appareil.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSignedIn(false);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[13px] font-semibold text-[#132238] cursor-pointer"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSignedIn(true);
                }}
                className="space-y-3"
              >
                <p className="text-[13px] text-slate-500">
                  Accédez au suivi de vos commandes et à vos adresses enregistrées.
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-[#F97316]"
                />
                <input
                  type="password"
                  required
                  placeholder="Mot de passe"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-[#F97316]"
                />
                <button
                  type="submit"
                  className="w-full h-10 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[13.5px] font-semibold cursor-pointer"
                >
                  Se connecter
                </button>
              </form>
            )}
          </div>
        )}

        {mode === 'terms' && (
          <div className="space-y-3">
            <h3 className="text-[19px] font-extrabold text-[#132238]">Conditions générales</h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Tous les produits proposés sur Nexora sont neufs, authentiques et couverts par une
              garantie constructeur de 12 à 24 mois. Les livraisons sont assurées partout au Maroc
              sous 24 à 72 heures ouvrées avec retour gratuit sous 14 jours.
            </p>
          </div>
        )}

        {mode === 'privacy' && (
          <div className="space-y-3">
            <h3 className="text-[19px] font-extrabold text-[#132238]">
              Politique de confidentialité
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Nexora respecte la confidentialité de vos données personnelles. Vos informations de
              livraison et de paiement sont chiffrées et utilisées uniquement pour le traitement et
              le suivi de vos commandes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
