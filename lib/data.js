/**
 * Harem Chocolate — central content file for the home page (English + Turkish).
 *
 * Every section reads from this file through `getContent(lang)`. Text is written
 * once per field as `L(english, turkish)`; prices, images and links are shared.
 *
 * Turkish copy is the live haremchocolate.com content (home, About, Stores,
 * Corporate pages). English is a translation of it; the story caption is the
 * brand guide's own English text. Proper brand/product names (Madlen, Merhaba,
 * Joy Selection, Grand Tablette) and postal addresses are not translated.
 * Links point at the live Shopify store, because only the home page is rebuilt.
 */

export const SITE_URL = "https://www.haremchocolate.com";
const shop = (path) => `${SITE_URL}${path}`;

/* ------------------------------------------------------------------ */
/* Locales                                                             */
/* ------------------------------------------------------------------ */
export const LOCALES = ["en", "tr"];
export const DEFAULT_LOCALE = "en";
export const hasLocale = (lang) => LOCALES.includes(lang);
export const localeMeta = {
  en: { short: "EN", label: "English", htmlLang: "en", ogLocale: "en_US", numberLocale: "en-US" },
  tr: { short: "TR", label: "Türkçe", htmlLang: "tr", ogLocale: "tr_TR", numberLocale: "tr-TR" },
};

/** A field with an English and a Turkish value (values may be strings or functions). */
class Localized {
  constructor(en, tr) {
    this.en = en;
    this.tr = tr;
  }
}
const L = (en, tr) => new Localized(en, tr);

/* ------------------------------------------------------------------ */
/* Brand (language-neutral, from "2-Brand Visual & Social Media.pdf")  */
/* ------------------------------------------------------------------ */
export const brand = {
  name: "Harem Chocolate",
  tagline: "Fine Chocolate Atelier",
  established: 1998,
  colors: {
    black: "#000000",
    blueberry: "#484680",
    caramel: "#BC7D1E",
    whiteChocolate: "#DAD4C1",
    chocolate: "#BC4917",
    gold: "linear-gradient(135deg, #8C6A2F 0%, #E9D9A6 45%, #B8913F 100%)",
  },
  logos: {
    primary: "/assets/brand/logo-primary.png",
    primaryLight: "/assets/brand/logo-primary-light.png",
    square: "/assets/brand/logo-square.png",
    squareLight: "/assets/brand/logo-square-light.png",
    wordmark: "/assets/brand/logo-wordmark.png",
    wordmarkLight: "/assets/brand/logo-wordmark-light.png",
    wordmarkSquare: "/assets/brand/logo-wordmark-square.png",
    wordmarkSquareLight: "/assets/brand/logo-wordmark-square-light.png",
    cafe: "/assets/brand/logo-cafe.png",
    cafeLight: "/assets/brand/logo-cafe-light.png",
    emblemGold: "/assets/brand/emblem-gold.png",
    emblemBlack: "/assets/brand/emblem-black.png",
    emblemLight: "/assets/brand/emblem-light.png",
    stickerTreats: "/assets/brand/sticker-treats.png",
  },
  illustrations: {
    sultan: "/assets/illustrations/sultan.png",
    cikolataciBey: "/assets/illustrations/cikolataci-bey.png",
    cacaoTree: "/assets/illustrations/cacao-tree.png",
    efendiWithWings: "/assets/illustrations/efendi-with-wings.png",
    kakaocuDayi: "/assets/illustrations/kakaocu-dayi.png",
    galataTower: "/assets/illustrations/galata-tower.png",
    maidenTower: "/assets/illustrations/maiden-tower.png",
    cloud: "/assets/illustrations/cloud.png",
    moon: "/assets/illustrations/moon.png",
    star: "/assets/illustrations/star.png",
    sparkleBurst: "/assets/illustrations/sparkle-burst.png",
    sparkleSmall: "/assets/illustrations/sparkle-small.png",
  },
};

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */
const seo = {
  title: L(
    "Harem Chocolate | Chocolate Gifts | Discover Our Chocolate Boxes",
    "Harem Chocolate | Hediyelik Çikolata | Çikolata Kutularını Keşfedin",
  ),
  description: L(
    "Make the people you love happy with Harem Chocolate. Discover chocolates and sweet treats that bring more joy the more you share them.",
    "Harem Chocolate lezzetleri ile sevdiklerinizi mutlu edin! Harem Chocolate çikolata ve tatlı atıştırmalıklar ile paylaştıkça çoğalan mutluluğu keşfedin!",
  ),
  ogImage: "/assets/hero/hero-yeni-yil.webp",
  ogImageAlt: L("Harem Chocolate New Year collection", "Harem Chocolate yılbaşı koleksiyonu"),
};

/* ------------------------------------------------------------------ */
/* Announcement bar + navigation                                       */
/* ------------------------------------------------------------------ */
const announcement = {
  text: L("Free standard shipping on orders of 3,000 TL and over", "3000 TL ve üzeri alışverişlerinizde standart kargo ücretsiz"),
  currency: "TRY",
};

const navigation = {
  utility: [
    { label: L("Stores", "Mağazalar"), href: shop("/pages/stores"), icon: "store" },
    { label: L("Contact", "İletişim"), href: shop("/pages/iletisim"), icon: "mail" },
  ],
  actions: [
    { label: L("Search", "Ara"), href: shop("/search"), icon: "search" },
    { label: L("Account", "Hesap"), href: shop("/account/login"), icon: "account" },
    { label: L("Cart", "Sepet"), href: shop("/cart"), icon: "cart" },
  ],
  main: [
    {
      label: L("Chocolate", "Çikolata"),
      href: shop("/collections/tum-urunler"),
      mega: {
        heading: L("Collections", "Koleksiyonlar"),
        allHref: shop("/collections"),
        links: [
          { label: L("Sharing Treats", "Lezzetli Paylaşımlıklar"), href: shop("/collections/lezzetli-paylasimliklar") },
          { label: L("Truffle Chocolates", "Truf Çikolata"), href: shop("/collections/truf-cikolata") },
          { label: L("Roche Chocolates", "Roş Çikolata"), href: shop("/collections/ros") },
          { label: L("Crêpe Chocolates", "Krep Çikolata"), href: shop("/collections/cikolatali-gofret") },
          { label: L("Assorted Chocolates", "Karışık Çikolatalar"), href: shop("/collections/karisik-cikolata") },
          { label: L("Cacao Pod Chocolates", "Kakao Pod Çikolata"), href: shop("/collections/kakao-pod-cikolata") },
          { label: L("Chocolate Bars", "Tablet Çikolata"), href: shop("/collections/tablet-cikolata") },
          { label: L("Chocolate Dragées", "Draje Çikolata"), href: shop("/collections/draje") },
          { label: L("Taste of Istanbul", "Taste of İstanbul"), href: shop("/collections/taste-of-istanbul") },
          { label: L("Confections & Sweets", "Şekerleme & Tatlılar"), href: shop("/collections/delights") },
          { label: L("Turkish Delight", "Lokum"), href: shop("/collections/lokum") },
          { label: L("Caramel Fudge", "Karamel Fudge"), href: shop("/products/karamel-fudge") },
        ],
        feature: {
          title: L("Sharing Treats", "Lezzetli Paylaşımlıklar"),
          text: L("12 different flavors", "12 farklı lezzet"),
          href: shop("/collections/lezzetli-paylasimliklar"),
          image: "/assets/hero/hero-lezzetli-paylasimliklar.webp",
        },
      },
    },
    { label: L("All Products", "Tüm Ürünler"), href: shop("/collections/tum-urunler") },
    { label: L("Bean to Bar", "Bean to Bar"), href: shop("/collections/bean-to-bar") },
    { label: L("Sugar-Free", "Şekersiz Ürünler"), href: shop("/collections/sekersiz-cikolata") },
    { label: L("New Year", "Yeni Yıl"), href: shop("/collections/yeni-yil-koleksiyonu") },
    { label: L("Corporate Gifts", "Kurumsal Satış"), href: shop("/pages/kurumsal-cikolata-satis") },
  ],
  faq: { label: L("Frequently asked questions", "Sıkça sorulan sorular"), href: shop("/pages/sikca-sorulan-sorular") },
};

/* ------------------------------------------------------------------ */
/* Hero slideshow (3 slides on the live site)                          */
/* ------------------------------------------------------------------ */
const hero = {
  autoplayMs: 6500,
  slides: [
    {
      id: "yeni-yil",
      eyebrow: L("New Year Collection 2027", "Yılbaşı Koleksiyonu 2027"),
      title: L("A Winter Tale", "A Winter Tale"),
      subtitle: L("Our winter selection, made for New Year tables and gifts.", "Yeni yıl sofraları ve hediyeleri için hazırlanan kış seçkimiz."),
      cta: { label: L("Explore the collection", "Koleksiyonu keşfet"), href: shop("/collections/yeni-yil-koleksiyonu") },
      image: "/assets/hero/hero-yeni-yil.webp",
      alt: L("Harem Chocolate New Year gift boxes in front of a Christmas tree", "Harem Chocolate yılbaşı koleksiyonu kutuları, yılbaşı ağacının önünde"),
      // the banner has its own lettering on the left — keep the products in frame
      position: "78% 50%",
    },
    {
      id: "paylasimliklar",
      eyebrow: L("12 different flavors", "12 farklı lezzet"),
      title: L("Sharing Treats", "Lezzetli Paylaşımlıklar"),
      subtitle: L("Chocolate snacks that bring more joy the more you share them.", "Sevdiklerinizle paylaştıkça çoğalan çikolatalı atıştırmalıklar."),
      cta: { label: L("Explore sharing treats", "Paylaşımlıkları keşfet"), href: shop("/collections/lezzetli-paylasimliklar") },
      image: "/assets/hero/hero-lezzetli-paylasimliklar.webp",
      alt: L("Chocolate-coated mandarin and Sharing Treats tins", "Çikolatalı mandalina ve Lezzetli Paylaşımlık kutuları"),
      position: "50% 50%",
    },
    {
      id: "findik-ezmesi",
      eyebrow: L("No refined sugar, no additives, vegan", "Rafine şekersiz, katkı maddesiz, vegan"),
      title: L("Chocolate Hazelnut Spread", "Çikolatalı Fındık Ezmesi"),
      subtitle: L("Giresun-Tirebolu round hazelnuts and ground cacao beans.", "Giresun-Tirebolu tombul fındığı ve öğütülmüş kakao çekirdeği."),
      cta: { label: L("Explore the spread", "Fındık ezmesini keşfet"), href: shop("/collections/cikolatali-findik-ezmesi") },
      image: "/assets/hero/hero-findik-ezmesi.webp",
      alt: L("Roasted cacao beans and jars of Harem Chocolate hazelnut spread", "Kavrulmuş kakao çekirdekleri ve Harem Chocolate fındık ezmesi kavanozları"),
      position: "60% 50%",
    },
  ],
};

/* Trust marquee — only facts stated on the live site or in the brand guide */
const marquee = [
  L("Since 1998", "1998’den beri"),
  L("Fine Chocolate Atelier", "Fine Chocolate Atelier"),
  L("Bean to bar", "Bean to bar"),
  L("4 stores in Istanbul", "İstanbul’da 4 mağaza"),
  L("Handmade chocolate selections", "El yapımı çikolata seçkileri"),
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */
const p = (handle, collection, fields) => ({
  handle,
  href: shop(`/collections/${collection}/products/${handle}`),
  image: `/assets/products/${handle}.webp`,
  hoverImage: fields.hasAlt ? `/assets/products/${handle}-alt.webp` : null,
  soldOut: false,
  stock: null,
  badges: [],
  ...fields,
});
const VEGAN = L("Vegan", "Vegan");
const SUGAR_FREE = L("Sugar-free", "Şekersiz");

const products = {
  newYear: {
    id: "yeni-yil",
    title: L("New Year Collection", "Yeni Yıl Koleksiyonu"),
    intro: L("New Year boxes for winter tables, business partners and the people you love.", "Kış sofraları, iş ortakları ve sevdikleriniz için yılbaşı kutuları."),
    href: shop("/collections/yeni-yil-koleksiyonu"),
    cta: L("See the full collection", "Tüm koleksiyonu gör"),
    items: [
      p("grand-tablet-kurabiyeli-cikolata-beyaz", "yeni-yil-koleksiyonu", { name: L("Grand Tablet", "Grand Tablet"), variant: L("Cinnamon Cookie Chocolate (White)", "Tarçınlı Kurabiyeli Çikolata (Beyaz)"), price: 1300, stock: 4, hasAlt: true, description: L("Cinnamon cookie pieces meet white chocolate, new this year. 300 g.", "Tarçınlı kurabiye parçaları ve beyaz çikolatanın buluşması, ilk kez bu yıl. 300 g.") }),
      p("yilbasi-kutusunda-cikolatali-tuzlu-findik", "yeni-yil-koleksiyonu", { name: L("Chocolate Salted Hazelnuts", "Yılbaşı Kutusunda Çikolatalı Tuzlu Fındık"), variant: L("New Year box", null), price: 780, hasAlt: true, description: L("Roasted salted hazelnuts in caramel chocolate, a balance of sweet and salty. 170 g.", "Kavrulmuş tuzlu fındıkların karamel çikolatayla buluştuğu dengeli uyum. 170 g.") }),
      p("madlen-cikolata-kutusu-mini", "yeni-yil-koleksiyonu", { name: L("Madlen Chocolate Box Mini", "Madlen Çikolata Kutusu Mini"), price: 640, description: L("Madlen chocolates in milk and dark. 84 g, 12 pieces.", "Sütlü ve bitter madlen çikolata. 84 g, 12 adet.") }),
      p("joy-selection", "yeni-yil-koleksiyonu", { name: L("Joy Selection", "Joy Selection"), price: 2200, description: L("Milk and dark truffles with chocolate-coated pistachio Turkish delight.", "Sütlü ve bitter trüfler ile Antep fıstıklı çikolata kaplı lokumlar.") }),
      p("yilbasi-kurabiyesi-15li", "yeni-yil-koleksiyonu", { name: L("New Year Cookies", "Yılbaşı Kurabiyesi 15’li"), variant: L("15 pieces", null), price: 760, description: L("Ginger, cinnamon and cocoa cookies. 240 g.", "Zencefilli, tarçınlı ve kakaolu kurabiyeler. 240 g.") }),
      p("mini-selection", "yeni-yil-koleksiyonu", { name: L("Mini Selection", "Mini Selection"), price: 650, soldOut: true, description: L("Our best-loved chocolates in an elegant New Year box.", "Sevilen çikolatalarımız, yeni yıla özel zarif kutusunda.") }),
      p("yilbasi-kutusunda-kakao-pod-cikolata-sutlu", "yeni-yil-koleksiyonu", { name: L("New Year Cacao Pod Chocolate", "Yılbaşı Kakao Pod Çikolata"), variant: L("Milk", "Sütlü"), price: 360, soldOut: true, hasAlt: true, description: L("Milk chocolate shaped after the cacao fruit. 54 g, 7 pieces.", "Kakao meyvesinin formundan ilham alan sütlü çikolata. 54 g, 7 adet.") }),
      p("grand-tablet-3-kuruyemisli-cikolata-sutlu", "yeni-yil-koleksiyonu", { name: L("Grand Tablet", "Grand Tablet"), variant: L("Three-Nut Chocolate (Milk)", "3 Kuruyemişli Çikolata (Sütlü)"), price: 1300, hasAlt: true, description: L("Caramelized hazelnuts, almonds and pistachios in milk chocolate. 300 g.", "Karamelize fındık, badem ve Antep fıstığı sütlü çikolatayla. 300 g.") }),
      p("truf-cikolata-24lu", "yeni-yil-koleksiyonu", { name: L("Truffle Chocolates", "Truf Çikolata"), variant: L("Milk & Dark, 24 pieces", "Sütlü & Bitter 24’lü"), price: 2100, description: L("24 milk and dark truffles in a New Year box. 340 g.", "Yılbaşı kutusunda 24’lü sütlü ve bitter trüf. 340 g.") }),
      p("8li-lezzetli-paylasimlik-yilbasi", "yeni-yil-koleksiyonu", { name: L("Sharing Treats Set of 8", "8’li Lezzetli Paylaşımlık Yılbaşı"), variant: L("New Year edition", null), price: 2400, description: L("Eight different chocolate treats in one set.", "Birbirinden farklı sekiz çikolatalı lezzet bir arada.") }),
      p("madlen-cikolata-kutusu", "yeni-yil-koleksiyonu", { name: L("Madlen Chocolate Box", "Madlen Çikolata Kutusu"), price: 840, hasAlt: true, description: L("Madlen chocolates in milk and dark. Available in 125 g and 220 g.", "Sütlü ve bitter madlen çikolata. 125 g ve 220 g seçenekleriyle.") }),
      p("sutlu-cikolata-kapli-krep", "yeni-yil-koleksiyonu", { name: L("Crêpe Chocolate", "Krep Çikolata"), variant: L("Milk", "Sütlü"), price: 480, hasAlt: true, description: L("Thin wafers filled with hazelnut cream and coated in milk chocolate.", "İçi fındık kreması dolgulu, sütlü çikolata kaplı ince gofret.") }),
      p("merhaba-kutu-yilbasi", "yeni-yil-koleksiyonu", { name: L("Merhaba Box", "Merhaba Kutu Yılbaşı"), variant: L("New Year edition", null), price: 5800, hasAlt: true, description: L("Harem Chocolate’s best-loved flavors in one box.", "Harem Chocolate’ın en sevilen tatları tek kutuda.") }),
      p("madlen-cikolata-kutusu-winter", "yeni-yil-koleksiyonu", { name: L("Madlen Chocolate Box Winter", "Madlen Çikolata Kutusu Winter"), price: 1800, stock: 5, hasAlt: true, description: L("Milk and dark Madlen chocolates in a New Year box. 445 g.", "Sütlü ve bitter madlenler, yeni yıla özel kutusunda. 445 g.") }),
      p("kozalak-mum", "yeni-yil-koleksiyonu", { name: L("Pine Cone Candle", "Kozalak Mum"), price: 320, description: L("A 9.5 cm pine-cone candle for New Year tables.", "Yılbaşı sofraları için 9,5 cm yüksekliğinde kozalak formlu mum.") }),
      p("karamel-fudge-110g", "yeni-yil-koleksiyonu", { name: L("Caramel Fudge", "Karamel Fudge"), variant: L("110 g", "110 g"), price: 480, hasAlt: true, description: L("A soft, buttery, traditional confection.", "Tatlı, yumuşak ve tereyağlı geleneksel şekerleme.") }),
      p("6li-cikolata", "yeni-yil-koleksiyonu", { name: L("Chocolate Box of 6", "6’lı Çikolata"), price: 450, hasAlt: true, description: L("Ganache, salted caramel and cocoa-filled chocolates from our handmade collection. 70 g.", "El yapımı koleksiyondan ganaj, tuzlu karamel ve kakao dolgulu çikolatalar. 70 g.") }),
      p("rattan-kup-kutu-gofret-cikolata", "yeni-yil-koleksiyonu", { name: L("Chocolate Wafers", "Rattan Küp Kutuda Çikolatalı Gofret"), variant: L("Rattan cube box", null), price: 1390, stock: 3, description: L("Milk chocolate wafers in a rattan box tied with a burgundy ribbon. 200 g.", "Sütlü çikolatalı gofretler, bordo kurdeleli hasır küp kutuda. 200 g.") }),
      p("yilbasi-kutusunda-findikli-tablet-cikolata-sutlu", "yeni-yil-koleksiyonu", { name: L("Hazelnut Chocolate Bar", "Fındıklı Tablet Çikolata"), variant: L("Milk", "Sütlü"), price: 520, stock: 5, description: L("Milk chocolate with hazelnuts. 100 g.", "Sütlü çikolata ve fındığın buluşması. 100 g.") }),
      p("yilbasi-samdan-mum-2li", "yeni-yil-koleksiyonu", { name: L("Candlestick Candles", "Şamdan Mum 2’li"), variant: L("Set of 2", null), price: 290, hasAlt: true, description: L("Red candlestick candles for New Year tables.", "Yeni yıl sofraları için kırmızı şamdan mumları.") }),
    ],
  },
  beanToBar: {
    id: "bean-to-bar",
    title: L("Bean to Bar Collection", "Bean to Bar Koleksiyonu"),
    intro: L(
      "Made from bean to bar in our own atelier, with Arriba cacao from Ecuador and Chuncho cacao from Peru.",
      "Ekvador’un Arriba ve Peru’nun Chuncho kakao çekirdeklerinden, çekirdekten tablete kendi atölyemizde.",
    ),
    href: shop("/collections/bean-to-bar"),
    cta: L("See all Bean to Bar products", "Bean to Bar ürünlerini gör"),
    filters: [
      { id: "all", label: L("All", "Tümü") },
      { id: "vegan", label: L("Vegan", "Vegan") },
      { id: "sugarFree", label: L("Sugar-free", "Şekersiz") },
    ],
    items: [
      p("surulebilir-cikolata-sekersiz", "bean-to-bar", { name: L("Chocolate Hazelnut Spread", "Çikolatalı Fındık Ezmesi"), variant: L("Sugar-free", "Şekersiz"), price: 760, soldOut: true, badges: [VEGAN], vegan: true, sugarFree: true, description: L("75% Giresun-Tirebolu round hazelnuts and 25% Ecuador Arriba cacao beans.", "%75 Giresun-Tirebolu tombul fındığı ve %25 Ekvador Arriba kakao çekirdeği.") }),
      p("surulebilir-cikolata-hindistan-cevizi-sekerli", "bean-to-bar", { name: L("Chocolate Hazelnut Spread", "Çikolatalı Fındık Ezmesi"), variant: L("With coconut sugar", "Hindistan cevizi şekerli"), price: 760, soldOut: true, badges: [VEGAN], vegan: true, description: L("60% round hazelnuts, 20% cacao beans, 20% coconut sugar.", "%60 tombul fındık, %20 kakao çekirdeği, %20 Hindistan cevizi şekeri.") }),
      p("icilebilir-cikolata-sekersiz", "bean-to-bar", { name: L("Drinking Chocolate", "İçilebilir Çikolata"), variant: L("Sugar-free", "Şekersiz"), price: 1600, badges: [VEGAN], vegan: true, sugarFree: true, hasAlt: true, description: L("100% Ecuador Arriba cacao. Nothing added, cacao in its purest form.", "%100 Ekvador Arriba kakao. Hiçbir ilave içerik olmadan, kakaonun en sade hali.") }),
      p("icilebilir-cikolata-sade", "bean-to-bar", { name: L("Drinking Chocolate", "İçilebilir Çikolata"), variant: L("Plain", "Sade"), price: 1600, badges: [VEGAN], vegan: true, hasAlt: true, description: L("The fruity, floral notes of Arriba cacao. Layered rather than heavy.", "Arriba kakaosuna özgü meyvemsi ve çiçeksi notalar. Yoğun değil, katmanlı.") }),
      p("yildizli-metal-kutuda-icilebilir-cikolata", "bean-to-bar", { name: L("Drinking Chocolate", "Yıldızlı Metal Kutuda İçilebilir Çikolata"), variant: L("Starry tin", null), price: 1800, hasAlt: true, description: L("Bean-to-bar drinking chocolate in a starry metal tin.", "Bean to bar içilebilir çikolata, yıldızlı metal kutusunda.") }),
      p("cikolatali-visne-ekvator", "bean-to-bar", { name: L("Chocolate Sour Cherries", "Çikolatalı Vişne"), variant: L("Ecuador 100%", "Ekvator %100"), price: 780, soldOut: true, sugarFree: true, hasAlt: true, description: L("Dried sour cherries coated in sugar-free chocolate. 170 g.", "Şekersiz çikolata kaplı kurutulmuş vişne. 170 g.") }),
      p("kuru-incir-boz-antep-fistik-peru-tablet-cikolata", "bean-to-bar", { name: L("Dried Fig & Pistachio", "Kuru İncir & Boz Antep Fıstık"), variant: L("85% Peru chocolate bar", "%85 Peru Tablet Çikolata"), price: 520, badges: [VEGAN], vegan: true, description: L("Made with Chuncho cacao from the Qellouno Valley in Cusco, Peru.", "Cusco’daki Qellouno Vadisi’nden Chuncho kakao çekirdekleriyle.") }),
      p("kakao-tozu-ham", "bean-to-bar", { name: L("Raw Cacao Powder", "Ham Kakao Tozu"), price: 390, soldOut: true, badges: [SUGAR_FREE, VEGAN], vegan: true, sugarFree: true, description: L("Natural cacao powder for every kind of cooking. 150 g.", "Mutfakta her alanda kullanmak için doğal kakao tozu. 150 g.") }),
      p("kakao-kitlesi", "bean-to-bar", { name: L("Cacao Mass", "Kakao Kitlesi"), price: 390, stock: 5, badges: [SUGAR_FREE, VEGAN], vegan: true, sugarFree: true, description: L("Pure cacao mass made from cacao beans. 150 g.", "Kakao çekirdeğinden elde edilen saf kakao kitlesi. 150 g.") }),
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Editorial features (image-with-text sections on the live site)      */
/* ------------------------------------------------------------------ */
const features = {
  grandTablette: {
    title: L("Grand Tablette", "Grand Tablette"),
    text: L("Two new flavors join our New Year collection:", "Yeni yıl koleksiyonumuza katılan iki yeni lezzet:"),
    list: [
      L("Three-nut milk chocolate", "Üç kuruyemişli sütlü çikolata"),
      L("White chocolate with cinnamon cookies", "Tarçınlı kurabiyeli beyaz çikolata"),
    ],
    meta: L("300 g · 21.5 × 18 cm box", "300 g · 21,5 × 18 cm kutu"),
    cta: { label: L("Explore Grand Tablet", "Grand Tablet’i keşfet"), href: shop("/collections/tablet-cikolata") },
    image: "/assets/features/grand-tablette.webp",
    alt: L("Pieces of hazelnut milk and cinnamon white Grand Tablet chocolate", "Fındıklı sütlü ve tarçınlı beyaz Grand Tablet parçaları"),
    detailImage: "/assets/products/grand-tablet-3-kuruyemisli-cikolata-sutlu.webp",
  },
  kakaoPod: {
    title: L("Cacao Pod Collection", "Kakao Pod Koleksiyonu"),
    text: L(
      "Shaped after the legendary cacao fruit, the “Cacao Pod” collection comes in milk, caramel, 55% dark, 80% dark and 100% sugar-free.",
      "Şeklini efsanevi kakao meyvesinden alan “Kakao Pod” koleksiyonu; sütlü, karamelli, %55 bitter, %80 bitter ve %100 şekersiz seçenekleriyle.",
    ),
    variants: [
      L("Milk", "Sütlü"),
      L("Caramel", "Karamel"),
      L("55% Dark", "%55 Bitter"),
      L("80% Dark", "%80 Bitter"),
      L("Sugar-free", "Şekersiz"),
    ],
    variantsLabel: L("Cacao Pod varieties", "Kakao Pod çeşitleri"),
    cta: { label: L("Explore Cacao Pod", "Kakao Pod’u keşfet"), href: shop("/collections/kakao-pod-cikolata") },
    image: "/assets/features/kakao-pod.webp",
    alt: L("Stacked Cacao Pod chocolate boxes", "Üst üste dizilmiş Kakao Pod çikolata kutuları"),
  },
  services: [
    { icon: "gift", title: L("The Sweetest Gift", "En Tatlı Hediye"), text: L("Celebrate your most special moments with our most special chocolates. Don’t forget to add your own message to the gift card.", "En özel anlarınızı en özel çikolatalarımızla kutlayın. Hediye kartına özel mesajınızı eklemeyi unutmayın!") },
    { icon: "store", title: L("Visit Our Stores", "Mağazalarımızı Keşfedin"), text: L("Visit our Göztepe, Teşvikiye, Emaar and Four Seasons Sultanahmet stores.", "Göztepe, Teşvikiye, Emaar ve Four Seasons Sultanahmet mağazalarımızı ziyaret edebilirsiniz.") },
    { icon: "truck", title: L("Free Shipping", "Ücretsiz Kargo"), text: L("Free standard shipping on orders of 3,000 TL and over.", "3000 TL ve üzeri alışverişlerinizde standart kargo ücretsiz.") },
  ],
};

/* ------------------------------------------------------------------ */
/* About / story (from /pages/brand + brand-guide illustrations)       */
/* ------------------------------------------------------------------ */
const about = {
  script: L("A delightful chat", "Keyifli bir sohbet"),
  title: L("We have loved making chocolate for 28 years", "28 yıldır çikolata yapmayı seviyoruz"),
  paragraphs: [
    L(
      "For 28 years, Harem Chocolate has been making rich, innovative and luxurious chocolates. To match the craftsmanship in our production, we are always in search of the finest chocolate and the freshest ingredients.",
      "Harem Chocolate olarak 28 yıldır zengin içerikli, yenilikçi ve lüks çikolatalar üretiyoruz. Üretimdeki ustalığımızı tamamlaması adına daima en kaliteli çikolata ve en taze içeriklerin arayışındayız.",
    ),
    L(
      "We know how much the origin of our ingredients shapes our products, so every year we set out to find the very best, to keep making chocolate of the highest quality.",
      "Malzemelerimizin menşelerinin ürünlerimizdeki etkisinin son derece farkındayız; bu nedenle her yıl en yüksek kalitede çikolata yapmaya devam etmek için en iyilerini aramak üzere keşfe çıkıyoruz.",
    ),
  ],
  caption: L(
    "As our Sultan and our Çikolatacı Bey enjoy a delightful conversation in the magical atmosphere of Istanbul, a starry night lights up Istanbul’s famous Maiden’s Tower and Galata Tower. These exclusive illustrations were created by artist Sedat Girgin for Harem Chocolate.",
    "Sultanımız ve Çikolatacı Bey, İstanbul’un büyülü atmosferinde keyifli bir sohbete dalarken yıldızlı gece Kız Kulesi’ni ve Galata Kulesi’ni aydınlatıyor. İllüstrasyonlar sanatçı Sedat Girgin tarafından Harem Chocolate için çizildi.",
  ),
  sultanAlt: L("The Sultan seated on a column, tasting chocolate (illustration by Sedat Girgin)", "Sultan, sütun üzerinde oturmuş çikolata tadıyor (Sedat Girgin illüstrasyonu)"),
  beyAlt: L("Çikolatacı Bey seated on a column, serving tea (illustration by Sedat Girgin)", "Çikolatacı Bey, sütun üzerinde çay ikram ediyor (Sedat Girgin illüstrasyonu)"),
  cta: { label: L("Read our story", "Hikâyemizi okuyun"), href: shop("/pages/brand") },
  image: "/assets/about/falling-chocolate-pieces.webp",
};

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* The live site publishes no customer reviews, so none are invented.  */
/* `reviews` stays empty until real reviews are supplied; the quote    */
/* section shows the brand's own words, clearly attributed.            */
/* ------------------------------------------------------------------ */
const testimonials = {
  reviews: [],
  brandQuotes: [
    { quote: L("For us, making and presenting chocolate is a matter of joy, passion and emotion.", "Bizim için çikolata üretimi ve sunumu bir coşku, tutku ve duygu meselesidir."), author: "Harem Chocolate", source: L("From our brand story", "Marka hikâyemizden") },
    { quote: L("Being a distinguished chocolate brand demands care and attention at every step.", "Ayrıcalıklı bir çikolata markası olmak, her süreçte dikkatli ve özenli olmayı gerektirir."), author: "Harem Chocolate", source: L("What sets us apart", "Farkımız") },
    { quote: L("To give our guests a unique experience, we work tirelessly at every stage, from production to presentation.", "Konuklarımıza benzersiz bir deneyim sunmak için, üretimden sunuma her safhada yorulmadan çalışıyoruz."), author: "Harem Chocolate", source: L("What sets us apart", "Farkımız") },
  ],
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */
const categories = {
  title: L("Our Chocolates", "Çikolata Çeşitlerimiz"),
  items: [
    { name: L("New Year Collection", "Yeni Yıl Koleksiyonu"), count: 32, href: shop("/collections/yeni-yil-koleksiyonu"), image: "/assets/categories/yeni-yil-koleksiyonu.webp" },
    { name: L("Bean to Bar", "Bean to Bar"), count: 9, href: shop("/collections/bean-to-bar"), image: "/assets/categories/bean-to-bar.webp" },
    { name: L("Milk Chocolate", "Sütlü Çikolata"), count: 24, href: shop("/collections/sutlu-cikolata"), image: "/assets/categories/sutlu-cikolata.webp" },
    // the live collection has no products/photo yet — shown with a brand illustration
    { name: L("Baby Gift Chocolates", "Hediye Bebek Çikolatası"), count: null, href: shop("/collections/bebek-cikolatasi"), image: "/assets/illustrations/efendi-with-wings.png", illustration: true },
    { name: L("Pistachio Chocolates", "Fıstıklı Çikolatalar"), count: 16, href: shop("/collections/fistikli-cikolata"), image: "/assets/categories/fistikli-cikolata.webp" },
  ],
};

/* ------------------------------------------------------------------ */
/* Contact, stores, corporate orders, newsletter                       */
/* ------------------------------------------------------------------ */
const store = (s) => ({
  ...s,
  imageAlt: L(`Harem Chocolate ${s.name.en} store`, `Harem Chocolate ${s.name.tr} mağazası`),
  phoneHref: `tel:${s.phone.replace(/\s/g, "")}`,
  mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Harem Chocolate ${s.name.tr} İstanbul`)}`,
});

const contact = {
  email: "online@haremchocolate.com",
  phone: "+90 216 467 00 99",
  phoneHref: "tel:+902164670099",
  // addresses are kept exactly as published (postal format)
  stores: [
    store({ name: L("Emaar Square Mall", "Emaar Square AVM"), address: "Ünalan mh. Libadiye cd. Üsküdar/İstanbul, Moda Meydanı Zemin Katı", hours: L("Daily 10:00 – 22:00", "Haftanın her günü 10:00 – 22:00"), phone: "+90 549 904 76 31", image: "/assets/stores/emaar.webp" }),
    store({ name: L("Göztepe", "Göztepe"), address: "Caddebostan mh. Prof. Dr. Hulusi Behçet cd. Göztepe Palas apt. No:32, 34728 Kadıköy/İstanbul", hours: L("Daily 10:00 – 20:00", "Haftanın her günü 10:00 – 20:00"), phone: "+90 534 595 99 69", image: "/assets/stores/goztepe.webp" }),
    store({ name: L("Teşvikiye", "Teşvikiye"), address: "Hüsrev Gerede Caddesi No:76 Teşvikiye/İstanbul", hours: L("Daily 10:00 – 19:00, Sundays 11:00 – 19:00", "Haftanın her günü 10:00 – 19:00, pazar 11:00 – 19:00"), phone: "+90 530 784 80 60", image: "/assets/stores/tesvikiye.webp" }),
    store({ name: L("Four Seasons Sultanahmet", "Four Seasons Sultanahmet"), address: "Tevkifhane Sok. No:1 34110 Sultanahmet, Fatih/İstanbul", hours: L("Daily 09:00 – 18:00", "Haftanın her günü 09:00 – 18:00"), phone: "+90 216 467 00 99", image: "/assets/stores/four-seasons.webp" }),
  ],
  storesHref: shop("/pages/stores"),
  corporate: {
    title: L("Corporate Chocolate Orders", "Kurumsal Çikolata Siparişi"),
    text: L(
      "Discover Harem Chocolate’s handmade chocolate selections for your team, clients and business partners. Get in touch about your corporate order and we’ll choose the right boxes for your company together.",
      "Ekibiniz, müşterileriniz ve iş ortaklarınız için Harem Chocolate’ın el yapımı çikolata seçkilerini keşfedin. Kurumsal çikolata siparişiniz için bize ulaşın, firmanıza uygun kutuları birlikte seçelim.",
    ),
    steps: [
      L("Tell us who the gift is for", "Hediyenin kime ulaşacağını belirtin"),
      L("Share the approximate number of boxes", "Yaklaşık kutu adedini paylaşın"),
      L("Add the delivery date and city", "Teslimat tarihi ve şehri ekleyin"),
    ],
    cta: { label: L("Request an order", "Sipariş talebi oluştur"), href: shop("/pages/kurumsal-cikolata-satis") },
  },
  newsletter: {
    title: L("Be the first to hear about new collections", "Yeni koleksiyonlardan ilk siz haberdar olun"),
    text: L("Seasonal collections and new flavors, straight to your inbox.", "Sezon koleksiyonları ve yeni lezzetler e-posta kutunuzda."),
    placeholder: L("Your email address…", "E-posta adresiniz…"),
    button: L("Subscribe", "Abone ol"),
    // Shopify's built-in customer newsletter endpoint on the live store
    action: shop("/contact#contact_form"),
  },
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
const footer = {
  columns: [
    {
      title: L("Company", "Kurumsal"),
      links: [
        { label: L("About Us", "Hakkımızda"), href: shop("/pages/brand") },
        { label: L("Contact Form", "İletişim Formu"), href: shop("/pages/kurumsal") },
        { label: L("Careers", "Kariyer"), href: shop("/pages/kariyer-1") },
        { label: L("Stores", "Mağazalar"), href: shop("/pages/stores") },
        { label: L("Quality and Food Safety Policy", "Kalite ve Gıda Güvenliği Politikası"), href: shop("/pages/kalite-ve-gida-guvenligi-politikasi") },
      ],
    },
    {
      title: L("Privacy", "Gizlilik"),
      links: [
        { label: L("Distance Sales Agreement", "Mesafeli Satış Sözleşmesi"), href: shop("/pages/uzak-mesafeli-satis-sozlesmesi") },
        { label: L("Distance Sales Preliminary Information Form", "Mesafeli Satış Sözleşmesi Ön Bilgilendirme Formu"), href: shop("/pages/mesafeli-satis-sozlesmesi-on-bilgilendirme-formu") },
        { label: L("Privacy Policy", "Gizlilik Politikası"), href: shop("/pages/gizlilik-politikasi") },
        { label: L("Terms of Use", "Kullanım Koşulları"), href: shop("/pages/kullanim-sozlesmesi") },
        { label: L("Personal Data Protection (KVKK) Policy", "KVKK Politikası"), href: shop("/pages/kisisel-verilerin-korunmasi-politikasi-1") },
        { label: L("KVKK Data Subject Application Form", "KVKK Veri Sahibi Başvuru Formu"), href: "https://cdn.shopify.com/s/files/1/2030/9499/files/KVYS_FR_01_Veri_Sahibi_Basvuru_Formu.docx?v=1578654470" },
        { label: L("Privacy Notice", "Aydınlatma Metni"), href: shop("/pages/ziyaretciler-icin-genel-aydinlatma-metni") },
      ],
    },
    {
      title: L("Shop with Confidence", "Güvenilir Alışveriş"),
      links: [
        { label: L("Secure Shopping", "Güvenli Alışveriş"), href: shop("/pages/guvenli-alisveris") },
        { label: L("Blog", "Blog"), href: shop("/blogs/news") },
        { label: L("Frequently Asked Questions", "Sıkça Sorulan Sorular"), href: shop("/pages/sikca-sorulan-sorular") },
      ],
    },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/haremchocolate/", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/haremchocolate", icon: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/@haremchocolate3770", icon: "youtube" },
    { label: "Pinterest", href: "https://pin.it/6uYYZDH", icon: "pinterest" },
    { label: "LinkedIn", href: "https://tr.linkedin.com/company/haremchocolate", icon: "linkedin" },
  ],
  copyright: L("Harem Chocolate. All rights reserved.", "Harem Chocolate. Tüm hakları saklıdır."),
  tagline: L("Fine Chocolate Atelier since 1998", "Fine Chocolate Atelier, 1998’den beri"),
};

/* ------------------------------------------------------------------ */
/* Section titles + interface microcopy                                */
/* ------------------------------------------------------------------ */
const ui = {
  stores: {
    title: L("Visit our stores", "Mağazalarımızı ziyaret edin"),
    intro: L("Addresses, opening hours and phone numbers for our four Istanbul stores.", "İstanbul’daki dört mağazamızın adres, çalışma saatleri ve telefon bilgileri."),
    all: L("All store details", "Tüm mağaza bilgileri"),
    map: L("Show on map", "Haritada göster"),
  },
  product: {
    soldOut: L("Sold out", "Tükendi"),
    lowStock: L((n) => `Only ${n} left`, (n) => `Son ${n} ürün`),
    view: L("View product", "Ürünü incele"),
    viewAndAdd: L("View and add to cart", "Ürünü incele ve sepete ekle"),
    countLabel: L((n) => `${n} products`, (n) => `${n} ürün`),
    emptyCollection: L("Explore the collection", "Koleksiyonu keşfedin"),
  },
  megaMenu: { all: L("All collections", "Tüm koleksiyonlar") },
  skipLink: L("Skip to content", "İçeriğe geç"),
  languageSwitch: L("Choose language", "Dil seçin"),
  notFound: {
    title: L("Page not found", "Sayfa bulunamadı"),
    text: L("This page doesn’t exist. Go back to the home page to keep browsing.", "Bu sayfa mevcut değil. Gezinmeye devam etmek için ana sayfaya dönün."),
    cta: L("Go to the home page", "Ana sayfaya dön"),
  },
  a11y: {
    home: L("Harem Chocolate home", "Harem Chocolate ana sayfa"),
    logoAlt: "Harem Chocolate, Fine Chocolate Atelier",
    mainNav: L("Main menu", "Ana menü"),
    mobileNav: L("Mobile menu", "Mobil menü"),
    footerNav: L("Footer menu", "Alt menü"),
    menu: L("Menu", "Menü"),
    openMenu: L("Open menu", "Menüyü aç"),
    heroRegion: L("Featured collections", "Öne çıkan koleksiyonlar"),
    slides: L("Slides", "Slaytlar"),
    slide: L((n, title) => `Slide ${n}: ${title}`, (n, title) => `${n}. slayt: ${title}`),
    play: L("Play slideshow", "Slayt gösterisini başlat"),
    pause: L("Pause slideshow", "Slayt gösterisini durdur"),
    prevSlide: L("Previous slide", "Önceki slayt"),
    nextSlide: L("Next slide", "Sonraki slayt"),
    prevProducts: L("Previous products", "Önceki ürünler"),
    nextProducts: L("Next products", "Sonraki ürünler"),
    filterProducts: L("Filter products", "Ürünleri filtrele"),
    marquee: L("Harem Chocolate at a glance", "Harem Chocolate hakkında kısaca"),
    quotes: L("From Harem Chocolate", "Harem Chocolate’tan"),
    showQuote: L((n) => `Show quote ${n}`, (n) => `${n}. alıntıyı göster`),
    services: L("Why Harem Chocolate", "Neden Harem Chocolate"),
    corporateNewsletter: L("Corporate orders and newsletter", "Kurumsal sipariş ve e-bülten"),
    social: L("Social media", "Sosyal medya"),
  },
};

/* ------------------------------------------------------------------ */
/* Resolution                                                          */
/* ------------------------------------------------------------------ */
const source = { seo, announcement, navigation, hero, marquee, products, features, about, testimonials, categories, contact, footer, ui };

function localize(node, lang) {
  if (node instanceof Localized) return node[lang];
  if (Array.isArray(node)) return node.map((n) => localize(n, lang));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = localize(v, lang);
    return out;
  }
  return node;
}

const cache = new Map();
/** All home-page content for one language: { brand, seo, hero, products, … }. */
export function getContent(lang) {
  const key = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  if (!cache.has(key)) cache.set(key, { brand, lang: key, ...localize(source, key) });
  return cache.get(key);
}

/** "1,300.00 TL" (en) / "1.300,00 TL" (tr) */
export function formatPrice(value, lang) {
  const meta = localeMeta[hasLocale(lang) ? lang : DEFAULT_LOCALE];
  return `${new Intl.NumberFormat(meta.numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)} TL`;
}
