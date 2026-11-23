import { Bean, Briefcase, Gift, Leaf, Mail, MapPin, Search, ShoppingBag, Store, Truck, User } from "lucide-react";

/* lucide no longer ships brand marks — minimal inline versions */
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    {children}
  </svg>
);

const Instagram = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Facebook = (p) => (
  <Svg {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z" />
  </Svg>
);
const Youtube = (p) => (
  <Svg {...p}>
    <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </Svg>
);
const Pinterest = (p) => (
  <Svg {...p}>
    <path d="M12.2 2C6.7 2 4 5.9 4 9.2c0 2 .8 3.7 2.4 4.4.3.1.5 0 .6-.3l.2-.9c.1-.3 0-.4-.2-.7-.5-.6-.8-1.3-.8-2.4 0-3 2.3-5.8 5.9-5.8 3.2 0 5 2 5 4.6 0 3.5-1.5 6.4-3.8 6.4-1.3 0-2.2-1-1.9-2.3.4-1.5 1.1-3.2 1.1-4.3 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.4c-.4 1.9-.1 4.2 0 4.4 0 .1.2.2.3.1.1-.2 1.7-2.1 2.2-4l.9-3.4c.4.8 1.6 1.5 2.9 1.5 3.8 0 6.4-3.5 6.4-8.1C20.2 5.3 17 2 12.2 2z" />
  </Svg>
);
const Linkedin = (p) => (
  <Svg {...p}>
    <path d="M6.5 8.8H3.3V20h3.2V8.8zM4.9 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.7 13.5c0-3-1.6-4.9-4.3-4.9-1.5 0-2.5.8-2.9 1.6V8.8h-3.1V20h3.2v-5.9c0-1.5.4-2.9 2.2-2.9 1.8 0 1.8 1.7 1.8 3V20h3.1v-6.5z" />
  </Svg>
);

const map = {
  store: MapPin,
  mail: Mail,
  search: Search,
  account: User,
  cart: ShoppingBag,
  gift: Gift,
  shop: Store,
  truck: Truck,
  briefcase: Briefcase,
  bean: Bean,
  leaf: Leaf,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  pinterest: Pinterest,
  linkedin: Linkedin,
};

/** Icons referenced by name from lib/data.js */
export function Icon({ name, ...props }) {
  // the "store" feature tile uses a shop front, the header pin stays a map pin
  const Comp = map[name] ?? Store;
  return <Comp aria-hidden="true" {...props} />;
}

export function FeatureIcon({ name, ...props }) {
  const Comp = name === "store" ? Store : map[name] ?? Store;
  return <Comp aria-hidden="true" {...props} />;
}
