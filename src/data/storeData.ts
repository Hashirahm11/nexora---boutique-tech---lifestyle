import heroHeadphones from '../assets/images/hero_headphones_1794761217819.jpg';
import promoTechBundle from '../assets/images/promo_tech_bundle_1794761219181.jpg';
import prodIphone15Pro from '../assets/images/prod_iphone_15_pro_1794761218793.jpg';
import prodMacbookAir from '../assets/images/prod_macbook_air_1794761219822.jpg';
import prodGalaxyWatch from '../assets/images/prod_galaxy_watch_1794761219934.jpg';
import prodNikeSneaker from '../assets/images/prod_nike_sneaker_1794761220536.jpg';
import catAudioHeadphones from '../assets/images/cat_audio_headphones_1794761221534.jpg';
import catGamingController from '../assets/images/cat_gaming_controller_1794761221575.jpg';
import catBackpack from '../assets/images/cat_backpack_1794761221514.jpg';
import prodEarbudsPro from '../assets/images/prod_earbuds_pro_1794761619714.jpg';
import prodMechanicalKeyboard from '../assets/images/prod_mechanical_keyboard_1794761620982.jpg';
import prodIpadTablet from '../assets/images/prod_ipad_tablet_1794761620282.jpg';
import prodBluetoothSpeaker from '../assets/images/prod_bluetooth_speaker_1794761620930.jpg';
import prodRunningSneakers from '../assets/images/prod_running_sneakers_1794761621646.jpg';
import prodWeekenderBag from '../assets/images/prod_laptop_sleeve_1794761622744.jpg';
import editorialWorkspaceBanner from '../assets/images/editorial_workspace_banner_1794761623270.jpg';
import bentoAudioLifestyle from '../assets/images/bento_audio_lifestyle_1794761623997.jpg';

export type CategoryId =
  | 'all'
  | 'smartphones'
  | 'ordinateurs'
  | 'audio'
  | 'montres'
  | 'gaming'
  | 'sacs'
  | 'chaussures';

export interface CategoryItem {
  id: Exclude<CategoryId, 'all'>;
  name: string;
  image: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  price: number;
  oldPrice: number;
  discountPercent: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  colors: string[];
  tag?: string;
  isPromo?: boolean;
  isNew?: boolean;
}

export interface HeroSlide {
  id: string;
  tag: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine3: string;
  description: string;
  ctaLabel: string;
  targetCategory: CategoryId;
  image: string;
  scriptText: string;
  darkTheme?: boolean;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-audio',
    tag: 'Nouveauté',
    titleLine1: 'Le son qui',
    titleHighlight: 'vous accompagne',
    titleLine3: 'partout',
    description:
      "Découvrez notre nouvelle collection d'écouteurs haut de gamme avec une qualité sonore exceptionnelle et un design moderne.",
    ctaLabel: 'Découvrir la collection',
    targetCategory: 'audio',
    image: heroHeadphones,
    scriptText: 'Feel the sound',
  },
  {
    id: 'slide-tech',
    tag: 'Offre spéciale',
    titleLine1: 'La tech qui',
    titleHighlight: 'sublime votre',
    titleLine3: 'quotidien',
    description:
      'Performances de pointe, autonomie longue durée et finitions premium sur nos ordinateurs portables et consoles nouvelle génération.',
    ctaLabel: 'Explorer le catalogue',
    targetCategory: 'ordinateurs',
    image: promoTechBundle,
    scriptText: 'Tech & Style',
    darkTheme: true,
  },
  {
    id: 'slide-workspace',
    tag: 'Édition Studio 2025',
    titleLine1: 'Votre espace',
    titleHighlight: 'créatif pensé',
    titleLine3: 'pour durer',
    description:
      'Ordinateurs, tablettes Pro, claviers mécaniques et audio de précision réunis dans une sélection exigeante livrée chez vous.',
    ctaLabel: 'Voir les nouveautés',
    targetCategory: 'ordinateurs',
    image: editorialWorkspaceBanner,
    scriptText: 'Smart Setup',
    darkTheme: true,
  },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    image: prodIphone15Pro,
    count: 14,
  },
  {
    id: 'ordinateurs',
    name: 'Ordinateurs',
    image: prodMacbookAir,
    count: 12,
  },
  {
    id: 'audio',
    name: 'Accessoires audio',
    image: catAudioHeadphones,
    count: 18,
  },
  {
    id: 'montres',
    name: 'Montres connectées',
    image: prodGalaxyWatch,
    count: 11,
  },
  {
    id: 'gaming',
    name: 'Gaming',
    image: catGamingController,
    count: 16,
  },
  {
    id: 'sacs',
    name: 'Sacs & Bagages',
    image: catBackpack,
    count: 12,
  },
  {
    id: 'chaussures',
    name: 'Chaussures',
    image: prodNikeSneaker,
    count: 22,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 999,
    oldPrice: 1130,
    discountPercent: 12,
    rating: 5,
    reviews: 124,
    image: prodIphone15Pro,
    description:
      'Châssis en titane de qualité aérospatiale, puce A17 Pro ultra-rapide et système photo professionnel triple capteur 48 Mpx.',
    colors: ['Titane Bleu', 'Titane Naturel', 'Titane Noir'],
    tag: 'Best-seller',
    isPromo: true,
  },
  {
    id: 'macbook-air-m2',
    name: 'MacBook Air M2',
    category: 'ordinateurs',
    categoryLabel: 'Ordinateurs',
    price: 1299,
    oldPrice: 1499,
    discountPercent: 15,
    rating: 5,
    reviews: 96,
    image: prodMacbookAir,
    description:
      'Design ultra-fin en aluminium recyclé, écran Liquid Retina 13,6 pouces et jusqu’à 18 heures d’autonomie silencieuse.',
    colors: ['Argent', 'Minuit', 'Lumière stellaire'],
    tag: 'Populaire',
    isPromo: true,
  },
  {
    id: 'samsung-galaxy-watch-6',
    name: 'Samsung Galaxy Watch 6',
    category: 'montres',
    categoryLabel: 'Montres connectées',
    price: 649,
    oldPrice: 810,
    discountPercent: 20,
    rating: 5,
    reviews: 76,
    image: prodGalaxyWatch,
    description:
      'Suivi avancé du sommeil et de la fréquence cardiaque, écran AMOLED saphir haute luminosité et étanchéité 5 ATM.',
    colors: ['Bleu Nuit', 'Noir Graphite'],
    isPromo: true,
  },
  {
    id: 'nike-air-force-1',
    name: 'Nike Air Force 1',
    category: 'chaussures',
    categoryLabel: 'Chaussures',
    price: 449,
    oldPrice: 499,
    discountPercent: 10,
    rating: 5,
    reviews: 63,
    image: prodNikeSneaker,
    description:
      'Cuir pleine fleur structuré, amorti Air emblématique au talon et semelle extérieure en caoutchouc à adhérence optimale.',
    colors: ['Blanc / Bleu / Orange', 'Blanc Classique'],
  },
  {
    id: 'nexora-buds-pro',
    name: 'Nexora Buds Pro ANC',
    category: 'audio',
    categoryLabel: 'Accessoires audio',
    price: 299,
    oldPrice: 399,
    discountPercent: 25,
    rating: 5,
    reviews: 158,
    image: prodEarbudsPro,
    description:
      'Écouteurs intra-auriculaires à réduction de bruit adaptative 45 dB, audio spatial et boîtier USB-C à charge rapide.',
    colors: ['Noir Mat / Orange', 'Graphite'],
    tag: 'Nouveauté',
    isNew: true,
    isPromo: true,
  },
  {
    id: 'clavier-mecanique-k75',
    name: 'Clavier Mécanique K75 Pro',
    category: 'gaming',
    categoryLabel: 'Gaming',
    price: 349,
    oldPrice: 449,
    discountPercent: 22,
    rating: 5,
    reviews: 89,
    image: prodMechanicalKeyboard,
    description:
      'Châssis usiné en aluminium brossé, switches tactiles hot-swap silencieux et tri-mode sans fil Bluetooth / 2,4 GHz / USB-C.',
    colors: ['Navy & Orange', 'Argent Classique'],
    tag: 'Nouveauté',
    isNew: true,
    isPromo: true,
  },
  {
    id: 'ipad-pro-stylet',
    name: 'Tablette Studio Pro 11" + Stylet',
    category: 'ordinateurs',
    categoryLabel: 'Ordinateurs',
    price: 1049,
    oldPrice: 1299,
    discountPercent: 19,
    rating: 5,
    reviews: 71,
    image: prodIpadTablet,
    description:
      'Écran ProMotion 120 Hz calibré pour la création, stylet magnétique à faible latence inclus et autonomie journée complète.',
    colors: ['Argent Sidéral', 'Gris Espace'],
    isNew: true,
    isPromo: true,
  },
  {
    id: 'enceinte-pulse-360',
    name: 'Enceinte Portable Pulse 360',
    category: 'audio',
    categoryLabel: 'Accessoires audio',
    price: 249,
    oldPrice: 329,
    discountPercent: 24,
    rating: 5,
    reviews: 112,
    image: prodBluetoothSpeaker,
    description:
      'Son omnidirectionnel puissant avec basses profondes, tissu acoustique déperlant IP67 et 24 heures d’autonomie.',
    colors: ['Bleu Marine / Orange', 'Noir Carbone'],
    isNew: true,
  },
  {
    id: 'nexora-studio-anc',
    name: 'Nexora Sound Pro ANC',
    category: 'audio',
    categoryLabel: 'Accessoires audio',
    price: 389,
    oldPrice: 549,
    discountPercent: 29,
    rating: 5,
    reviews: 142,
    image: catAudioHeadphones,
    description:
      'Réduction de bruit active hybride -42 dB, haut-parleurs 40 mm haute fidélité et 45 heures d’écoute continue en Bluetooth 5.3.',
    colors: ['Noir Mat', 'Noir / Orange'],
    isPromo: true,
  },
  {
    id: 'manette-pro-wireless',
    name: 'Manette Pro Wireless',
    category: 'gaming',
    categoryLabel: 'Gaming',
    price: 279,
    oldPrice: 399,
    discountPercent: 30,
    rating: 5,
    reviews: 88,
    image: catGamingController,
    description:
      'Ergonomie texturée antidérapante, gâchettes à retour haptique précis et double connectivité sans fil ultra-faible latence.',
    colors: ['Noir Carbone', 'Blanc Glacier'],
    isPromo: true,
  },
  {
    id: 'sac-a-dos-urban-tech',
    name: 'Sac à Dos Urban Tech 16"',
    category: 'sacs',
    categoryLabel: 'Sacs & Bagages',
    price: 219,
    oldPrice: 279,
    discountPercent: 22,
    rating: 5,
    reviews: 54,
    image: catBackpack,
    description:
      'Tissu déperlant haute densité, compartiment matelassé pour ordinateur jusqu’à 16 pouces et port de charge USB intégré.',
    colors: ['Bleu Marine', 'Gris Anthracite'],
    isPromo: true,
  },
  {
    id: 'nike-velocity-runner',
    name: 'Sneakers Velocity Knit',
    category: 'chaussures',
    categoryLabel: 'Chaussures',
    price: 399,
    oldPrice: 489,
    discountPercent: 18,
    rating: 5,
    reviews: 47,
    image: prodRunningSneakers,
    description:
      'Maille technique respirante, semelle intermédiaire à rebond dynamique et renfort talon haute stabilité.',
    colors: ['Marine / Orange', 'Noir / Blanc'],
    isNew: true,
  },
  {
    id: 'sac-weekender-nomad',
    name: 'Sac Weekender Tech Nomad',
    category: 'sacs',
    categoryLabel: 'Sacs & Bagages',
    price: 329,
    oldPrice: 420,
    discountPercent: 22,
    rating: 5,
    reviews: 39,
    image: prodWeekenderBag,
    description:
      'Format cabine optimisé avec poche dédiée ordinateur 16", sangles renforcées et fermetures étanches.',
    colors: ['Bleu Nuit / Orange'],
    isNew: true,
    isPromo: true,
  },
  {
    id: 'pack-gaming-setup-pro',
    name: 'Pack Console & Laptop Pro',
    category: 'gaming',
    categoryLabel: 'Gaming',
    price: 1899,
    oldPrice: 2690,
    discountPercent: 29,
    rating: 5,
    reviews: 41,
    image: promoTechBundle,
    description:
      'Offre groupée exclusive incluant console nouvelle génération, manette sans fil et station portable haute performance.',
    colors: ['Édition Spéciale'],
    isPromo: true,
  },
];

export const PROMO_IMAGE = promoTechBundle;
export const WORKSPACE_IMAGE = editorialWorkspaceBanner;
export const AUDIO_LIFESTYLE_IMAGE = bentoAudioLifestyle;

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Salma El Amrani',
    city: 'Casablanca',
    product: 'iPhone 15 Pro',
    quote:
      "Livraison reçue en 24h à Casablanca, emballage scellé d'origine et service client très réactif sur WhatsApp pour le suivi.",
  },
  {
    id: 'rev-2',
    name: 'Mehdi Benjelloun',
    city: 'Rabat',
    product: 'Clavier Mécanique K75 Pro',
    quote:
      "La qualité de fabrication du clavier et du casque audio est bluffante. Paiement à la livraison sans aucune mauvaise surprise.",
  },
  {
    id: 'rev-3',
    name: 'Kenza Tazi',
    city: 'Marrakech',
    product: 'MacBook Air M2',
    quote:
      "Mon outil de travail quotidien depuis trois mois. Prix imbattable pendant l'offre spéciale avec facture et garantie officielle.",
  },
];

export const FAQS = [
  {
    q: 'Quels sont les délais de livraison partout au Maroc ?',
    a: 'Les commandes validées avant 15h sont expédiées le jour même. La livraison s’effectue en 24h sur Casablanca et Rabat, et sous 48h à 72h ouvrées dans toutes les autres villes du Maroc.',
  },
  {
    q: 'Puis-je payer à la réception de ma commande ?',
    a: 'Oui, le paiement à la livraison (Cash on Delivery) est disponible partout au Maroc, avec possibilité d’inspecter le colis avant règlement. Le paiement par carte bancaire sécurisée est également accepté.',
  },
  {
    q: 'Les produits sont-ils neufs et couverts par une garantie ?',
    a: 'Tous les articles vendus sur Nexora sont 100 % neufs, scellés d’origine et accompagnés d’une garantie constructeur de 12 à 24 mois avec facture officielle.',
  },
  {
    q: 'Comment fonctionne le retour ou l’échange sous 14 jours ?',
    a: 'Si un produit ne correspond pas à vos attentes ou présente un défaut, vous disposez de 14 jours calendaires après réception pour demander un échange gratuit ou un remboursement intégral.',
  },
];

export function formatPriceDA(amount: number): string {
  const formatted = amount.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted.replace(/\u202f|\u00a0/g, ' ')} DA`;
}
