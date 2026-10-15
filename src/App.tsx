import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BedDouble,
  Bookmark,
  BookmarkCheck,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Compass,
  Globe2,
  Heart,
  Home,
  KeyRound,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  PlayCircle,
  Search,
  Send,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Ruler,
  Waves,
  X,
} from 'lucide-react';
import { copy, languages, type LangKey } from './i18n';
import { photo, allListings, payPlans, planAmount, planNumber, formatMoney, agentDeposit, priceValue, monthlyRentValue, type PayPlanKey, type VegasAmenKey, type VegasFactKey, type VegasListing, type VegasTypeKey } from './listings'; // usCities / vegasListings were only used before the city-aware detail + region-nav changes

const images = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByYbKY-OEOqxkX6oUmyB9GFeHyAqxawcyVxjv0n5BhpSICDqGStlSE9lA_dfjjIXmr0twgRBlgCAAewpMfX-ttKNHzN2dP2lFEvkcqg2gtccPD45ZE9ixTHYDj34T8tyONvWElpwY4RzsW_S_e6bD2VMGbWZWcibWKdbFmgssUPeryDZSGMcapS9YUJVMSMF5j6p44aKZlwOhbGTJaO9yGgkFMvNBarVwLwDzhtHpKLYZiOEZbobbs',
  como: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZNQbD0LEGROsApvTBiex9r3RaSJ-gDhjqY0XX-R8x-VyIV0KhN9mx2zEeEdxO4G_Ct6uHRtE1ymU7aGsMfkmBRRfnL0B3WQwtg9J2biN1aVcvzdRRWlcA0oDjYVAyqgMzdFBKK5GF9PMDrZ2Cu_m5aMoHpiSnIg12IgKgHhcEJYd9dA6sIbdiDR15mm1iNACZVFfdPQ4JOvKc1oOCF9HQ-1SYSAYvnLTBE8mocnpAMHGY1uqVADwP',
  castle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFK-Rz3XGKxfQgJ7uoTYLg4SGjc4DFu_qrrBV8RJVTvRyYb2OWzDrto6Nwdpjjj41EePQzDdK07xk8yUTVnSdl6QUZNbD7FaFHSxbJuIHgTw0uuqIdIXEmJgpNCOC5TX38wNhvoNl6MaLktqJheFcamUmCHJ6UqQ9kqp7U3iug2qpcpfjZZsSF_r8fDHqJxSY9Z-R7HATk-FigHPcEmAv-kJRDCKqMX0gJ1NOos9jTiFi19nPF7rWl',
  coast: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTABlvSrc28CeYNTh220DDb_wmwS7tSDqsTVg-DeKDqDreIfk7__wmLwVO1h3L9YZ_-lJTps_zeKMyNxiiJTD1PNhfA5OLzlUEaGa5WznMRu8pIaUsPFPcM9Bdiw5Iw8tmbUVGnZsGPFAjOLb1BnJpBAGVHOHG-Rhk4rYKTsWz35_ZvoxNTTclVylbkGlOuZnTojryXspTQNQLgmCcUif7nE9bt8Q23PWNn03sFfGOmtWfuzx-chqT',
  chalet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdig7BCPG8I0MAY5ToXS7KJFgK0_Ym5PLeZdfPOSDz6L9aMYDX5u79tdH9ZJ2JCke-IkDj86fKJwx45WhPBBx9WrbmdSh0EKZ0tsu8HT9-afufTCDHbVFstz-oVXeO_w2YZzcOoz3pgtV0a5Xeo8nf78WjY9tUQMApwDO_OIlSa2j5Q_fa8fRKf86tiHR02dTOupmZLa7ZDr25twSniHrJsRnxd6dnXhH87fCJLemqsVPMfNw7KeG0',
  miami: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1cnOfDWfmlkOdJS4WB79W4COoRTVdio9FjrHkQOLdwbfsFVw0WGBQ6wKGFLxahsKpYIGNM1k4_XAlyTSntrOua4VlENml7jEsCjIj3kaTv6uh6v87RylPaJijd5nu5qa9NY_WMrh7MVhq9MXNbkDKI_nnAycS_dxXhhx-hYzYX0T8ZNrkhNaEaPJowbqmjRZPT7ESqCoZ5p4ucOtFGPDHLlHUUvEdbO6vXblQ7zy0SKcDmVaoGNgn',
};

type Property = { image: string; location: string; title: string; price: string; details: string; tag: string };

const propertyBase = [
  { image: images.castle, location: 'Beverly Hills, California, USA', price: '$24,500,000', beds: 8, baths: 11, sqft: '14,200', titleKey: 'prop1', tagKey: 'tag.listed' },
  { image: images.como, location: 'Cernobbio, Lake Como, Italy', price: '$12,750,000', beds: 6, baths: 8, sqft: '12,400', titleKey: 'prop2', tagKey: 'tag.exclusive' },
  { image: images.chalet, location: 'Courchevel, France', price: '$9,400,000', beds: 7, baths: 7, sqft: '9,800', titleKey: 'prop3', tagKey: 'new.title' },
  { image: images.miami, location: 'Miami Beach, Florida, USA', price: '$15,200,000', beds: 4, baths: 5, sqft: '6,900', titleKey: 'prop4', tagKey: 'tag.poa' },
] as const;

type LangCtx = { lang: LangKey; setLang: (lang: LangKey) => void };
const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} });
const useLang = () => useContext(LangContext);
const useCopy = () => copy[useLang().lang];

// Navigation into the collection view (filtered by residence type across all cities, or by US city).
type CollectionFilter = { title: string; types?: VegasTypeKey[]; city?: string; nav?: 'nav.home' | 'nav.condos' | 'nav.apartments' };
type NavCtx = { goHomes: () => void; goVegas: () => void; goCondos: () => void; goApartments: () => void; goCity: (city: string) => void; signOut: () => void; active: string };
const NavContext = createContext<NavCtx>({ goHomes: () => {}, goVegas: () => {}, goCondos: () => {}, goApartments: () => {}, goCity: () => {}, signOut: () => {}, active: '' });
const useNav = () => useContext(NavContext);

// One entry per listing: the Buy / Rent mode and payment plan the artist picked (mock cart, persisted locally).
type CartItem = { id: string; mode: 'buy' | 'rent'; plan: PayPlanKey };
type CartCtx = { addToCart: (listing: VegasListing, mode: 'buy' | 'rent', plan: PayPlanKey) => void; openCart: () => void; count: number };
const CartContext = createContext<CartCtx>({ addToCart: () => {}, openCart: () => {}, count: 0 });
const useCart = () => useContext(CartContext);

function useProperties(): Property[] {
  const t = useCopy();
  return propertyBase.map((p) => ({ image: p.image, location: p.location, price: p.price, title: t[p.titleKey], tag: t[p.tagKey], details: `${p.beds} ${t['common.beds']} • ${p.baths} ${t['common.baths']} • ${p.sqft} ${t['common.sqft']}` }));
}

function Logo() {
  return <div className="logo"><span>CREATIVE ARTIST AGENCY</span><small>TOP ARTISTS ONLY</small></div>;
}

// Desktop-only floating arrow that appears after scrolling and returns to the top.
function ScrollTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return <button className="top-button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></button>;
}

function LanguagePicker() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = languages.find((language) => language.key === lang)!;
  return <div className="lang-picker"><button className="lang-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>{current.short} <ChevronDown size={13} /></button>{open && <><div className="lang-backdrop" onClick={() => setOpen(false)} /><div className="lang-menu" role="listbox" aria-label="Language">{languages.map((language) => <button key={language.key} role="option" aria-selected={language.key === lang} className={language.key === lang ? 'active' : ''} onClick={() => { setLang(language.key); setOpen(false); }}>{language.label}<small>{language.short}</small></button>)}</div></>}</div>;
}

// Private access gate shown before the site: any valid email + the agency ID signs you in (no backend).
const AGENCY_ID = '1000023457';

function LoginPage({ onSignIn }: { onSignIn: () => void }) {
  const t = useCopy();
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t['login.errEmail']); return; }
    if (id.trim() !== AGENCY_ID) { setError(t['login.errId']); return; }
    localStorage.setItem('caa-auth', email);
    onSignIn();
  };
  const cities = new Set(allListings.map((entry) => entry.city ?? 'Las Vegas')).size;
  return <div className="login-page">
    <aside className="login-brand">
      <div className="login-brand-inner"><Logo /><h2>{t['login.tagline']}</h2><div className="login-rule" /><ul><li><Sparkles size={14} /> {allListings.length} residences</li><li><Compass size={14} /> {cities} destinations</li><li><Shield size={14} /> Off-market access</li></ul></div>
    </aside>
    <section className="login-panel">
      <div className="login-lang"><LanguagePicker /></div>
      <div className="login-form-wrap"><span className="eyebrow">{t['login.eyebrow']}</span><h1>{t['login.welcome']}</h1><p className="login-note">{t['login.note']}</p><form onSubmit={submit}><label>{t['login.email']}<div className="login-field"><Mail size={16} /><input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder={t['login.emailPh']} autoComplete="email" /></div></label><label>{t['login.id']}<div className="login-field"><CircleUserRound size={16} /><input type="text" inputMode="numeric" value={id} onChange={(event) => { setId(event.target.value); setError(''); }} placeholder={t['login.idPh']} autoComplete="username" /></div></label>{error && <small className="login-error">{error}</small>}<button className="primary-button login-button" type="submit">{t['login.button']} <ArrowRight size={15} /></button></form></div>
    </section>
  </div>;
}

function Header({ onHome }: { onHome: () => void }) {
  const t = useCopy();
  const nav = useNav();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [usOpen, setUsOpen] = useState(false); // used by the commented-out region nav below
  const cart = useCart();
  const current = languages.find((language) => language.key === lang)!;
  return <>
    <header className="site-header">
      <div className="utility-bar"><div className="utility-inner"><span>{t['utility.worldwide']} <ChevronDown size={13} /></span><LanguagePicker /><div className="utility-right"><span><Heart size={14} /> {t['utility.watchlist']}</span><span><MessageCircle size={14} /> {t['utility.messages']}</span><button>{t['utility.book']}</button><button className="cart-button" aria-label={t['cart.title']} onClick={cart.openCart}><Home size={17} />{cart.count > 0 && <span className="cart-count">{cart.count}</span>}</button><button className="signout-button" aria-label={t['login.signout']} title={t['login.signout']} onClick={nav.signOut}><CircleUserRound size={27} /></button></div></div></div>
      <div className="brand-row"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button><button onClick={onHome} className="brand-button"><Logo /></button><div className="mobile-actions"><button className="cart-button" aria-label={t['cart.title']} onClick={cart.openCart}><Home size={19} />{cart.count > 0 && <span className="cart-count">{cart.count}</span>}</button></div></div>
      <nav className="main-nav">{(['nav.home', 'nav.condos', 'nav.apartments'] as const).map((key) => <button key={key} className={key === nav.active ? 'active' : ''} onClick={key === 'nav.home' ? nav.goHomes : key === 'nav.condos' ? nav.goCondos : nav.goApartments}>{t[key]}</button>)}</nav>
      {/* Region picker hidden by request — restore together with the usOpen state and the usCities import:
      <div className="region-nav"><div className="lang-picker"><button className="lang-trigger" aria-haspopup="menu" aria-expanded={usOpen} onClick={() => setUsOpen((v) => !v)}>{t['region.us']} <ChevronDown size={13} /></button>{usOpen && <><div className="lang-backdrop" onClick={() => setUsOpen(false)} /><div className="lang-menu" role="menu" aria-label={t['region.us']}>{usCities.map((city) => <button key={city} role="menuitem" onClick={() => { setUsOpen(false); nav.goCity(city); }}>{city}</button>)}</div></>}</div><i>•</i><span>{t['region.uk']} <ChevronDown /></span><i>•</i><span>{t['region.fr']} <ChevronDown /></span><i>•</i><span>{t['region.it']} <ChevronDown /></span><i>•</i><span>{t['region.kr']} <ChevronDown /></span><i>•</i><span>{t['region.jp']} <ChevronDown /></span><i>•</i><span className="all-countries">{t['region.all']} <ArrowRight /></span></div>
      */}
    </header>
    {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}><aside onClick={(e) => e.stopPropagation()}><button className="close-menu" onClick={() => setMenuOpen(false)}><X /></button><Logo /><div className="menu-links"><button onClick={onHome}>{t['menu.explore']}</button><button onClick={() => { setMenuOpen(false); nav.goVegas(); }}>{t['nav.lasVegas']}</button><button>{t['utility.watchlist']}</button><button>{t['menu.concierge']}</button><button>{t['nav.journal']}</button><button>{t['utility.book']}</button></div><div className="menu-langs">{languages.map((language) => <button key={language.key} className={language.key === lang ? 'active' : ''} onClick={() => setLang(language.key)}>{language.label}</button>)}</div><div className="menu-footer">{t['utility.worldwide']} &nbsp; | &nbsp; {current.label}</div></aside></div>}
  </>;
}

type SearchCriteria = { query: string; type: VegasTypeKey | ''; sort: '' | 'asc' | 'desc'; beds: number };

// Working search: text (address / location / city), residence type, price sort and min-beds filter.
function SearchPanel({ onSearch }: { onSearch: (criteria: SearchCriteria) => void }) {
  const t = useCopy();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<VegasTypeKey | ''>('');
  const [sort, setSort] = useState<'' | 'asc' | 'desc'>('');
  const [beds, setBeds] = useState(0);
  const [menu, setMenu] = useState<'' | 'type' | 'price'>('');
  const typeOptions: (VegasTypeKey | '')[] = ['', 'type.home', 'type.condo', 'type.penthouse', 'type.loft'];
  const priceOptions: ('' | 'asc' | 'desc')[] = ['', 'asc', 'desc'];
  const sortLabel = (key: '' | 'asc' | 'desc') => (key === '' ? t['search.price'] : key === 'asc' ? t['search.priceLow'] : t['search.priceHigh']);
  const run = () => onSearch({ query, type, sort, beds });
  return <div className="search-panel"><div className="search-input"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') run(); }} placeholder={t['search.ph']} aria-label={t['search.button']} /></div><div className="search-filters"><div className="lang-picker"><button aria-haspopup="menu" aria-expanded={menu === 'type'} onClick={() => setMenu(menu === 'type' ? '' : 'type')}>{type ? t[type] : t['search.type']} <ChevronDown size={13} /></button>{menu === 'type' && <><div className="lang-backdrop" onClick={() => setMenu('')} /><div className="lang-menu" role="menu" aria-label={t['search.type']}>{typeOptions.map((key) => <button key={key || 'any'} role="menuitem" className={type === key ? 'active' : ''} onClick={() => { setType(key); setMenu(''); }}>{key ? t[key] : t['search.any']}</button>)}</div></>}</div><div className="lang-picker"><button aria-haspopup="menu" aria-expanded={menu === 'price'} onClick={() => setMenu(menu === 'price' ? '' : 'price')}>{sortLabel(sort)} <SlidersHorizontal size={16} /></button>{menu === 'price' && <><div className="lang-backdrop" onClick={() => setMenu('')} /><div className="lang-menu" role="menu" aria-label={t['search.price']}>{priceOptions.map((key) => <button key={key || 'any'} role="menuitem" className={sort === key ? 'active' : ''} onClick={() => { setSort(key); setMenu(''); }}>{sortLabel(key)}</button>)}</div></>}</div></div><div className="bed-pills">{[t['search.any'], '1+', '2+', '3+', '4+', '5+'].map((label, index) => <button key={label} onClick={() => setBeds(index)} className={beds === index ? 'chosen' : ''}>{label}</button>)}</div><button className="primary-button search-button" onClick={run}><Search size={18} /> {t['search.button']}</button></div>;
}

function PropertyCard({ property, onOpen }: { property: Property; onOpen: () => void }) {
  const [saved, setSaved] = useState(false);
  return <article className="property-card" onClick={onOpen}><div className="property-image"><img src={property.image} alt={property.title} /><span className="image-tag">{property.tag}</span><button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} aria-label="Save residence" className="heart-button">{saved ? <BookmarkCheck size={18} /> : <Heart size={18} />}</button></div><div className="property-copy"><strong>{property.price}</strong><p>{property.title}</p><small>{property.location}</small><div className="property-meta">{property.details}</div></div></article>;
}

function VegasCard({ listing, onOpen, onTour }: { listing: VegasListing; onOpen: (listing: VegasListing) => void; onTour: (listing: VegasListing) => void }) {
  const t = useCopy();
  const [saved, setSaved] = useState(false);
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');
  const [plan, setPlan] = useState<PayPlanKey>('pay.full');
  const choose = (nextMode: 'buy' | 'rent', nextPlan: PayPlanKey) => { setMode(nextMode); setPlan(nextPlan); };
  return <article className="property-card vegas-card" onClick={() => onOpen(listing)}><div className="property-image"><img src={listing.photos.length > 0 ? photo(listing.photos[0]) : images.miami} alt={listing.address} /><span className="image-tag">{t[listing.tagKey]}</span>{listing.video && <button className="tour-pill" onClick={(e) => { e.stopPropagation(); onTour(listing); }}><PlayCircle size={14} /> {t['detail.tour']}</button>}<button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} aria-label="Save residence" className="heart-button">{saved ? <BookmarkCheck size={18} /> : <Heart size={18} />}</button></div><div className="property-copy"><strong>{listing.price}</strong><p>{listing.address}</p><small>{listing.location}</small><div className="property-meta">{`${listing.beds} ${t['common.beds']} • ${listing.baths} ${t['common.baths']} • ${listing.sqft} ${t['common.sqft']}`}</div><small className="vegas-type">{`${t['common.built']} ${listing.year} · ${t[listing.typeKey]} · MLS #${listing.mls}`}</small><div className="offer-block" onClick={(e) => e.stopPropagation()}><div className="offer-toggle" role="group" aria-label={`${t['detail.rent']} / ${t['detail.buy']}`}><button className={mode === 'rent' ? 'chosen' : ''} onClick={() => choose('rent', plan)}>{t['detail.rent']}</button><button className={mode === 'buy' ? 'chosen' : ''} onClick={() => choose('buy', plan)}>{t['detail.buy']}</button></div><div className="pay-plans">{payPlans.map((key) => <button key={key} className={plan === key ? 'chosen' : ''} onClick={() => choose(mode, key)}>{t[key]}</button>)}</div>{mode === 'rent' ? <p className="offer-amount">{planAmount(monthlyRentValue(listing), plan)} <small>{t['detail.permo']}</small></p> : <p className="offer-amount"><small>{t['pay.due']}</small> <strong>{planAmount(priceValue(listing), plan)}</strong></p>}</div></div></article>;
}

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const t = useCopy();
  return <div className="video-modal" onClick={onClose}><div className="video-frame" onClick={(e) => e.stopPropagation()}><div className="video-head"><span><PlayCircle size={15} /> {t['detail.tour']}</span><strong>{title}</strong><button onClick={onClose} aria-label="Close"><X size={18} /></button></div><iframe src={src} title={`${title} — ${t['detail.tour']}`} allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0" /></div></div>;
}

function VegasAmenIcon({ group }: { group: VegasAmenKey }) {
  return group === 'vamen.utilities' ? <SlidersHorizontal /> : group === 'vamen.outdoor' ? <Waves /> : group === 'vamen.community' ? <Building2 /> : <Sparkles />;
}

function VegasDetailPage({ listing, onBack, onOpen }: { listing: VegasListing; onBack: () => void; onOpen: (listing: VegasListing) => void }) {
  const t = useCopy();
  const [shot, setShot] = useState(0);
  const [saved, setSaved] = useState(false);
  const [stripTour, setStripTour] = useState<VegasListing | null>(null);
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');
  const [plan, setPlan] = useState<PayPlanKey>('pay.full');
  const cart = useCart();
  const choose = (nextMode: 'buy' | 'rent', nextPlan: PayPlanKey) => { setMode(nextMode); setPlan(nextPlan); };
  // The detail page adapts to the residence's own city, not a hardcoded Las Vegas.
  const city = listing.city ?? 'Las Vegas';
  const sameCity = allListings.filter((item) => item.id !== listing.id && (item.city ?? 'Las Vegas') === city);
  const related = sameCity.length > 0 ? sameCity : allListings.filter((item) => item.id !== listing.id).slice(0, 6);
  const gallery = listing.photos.length > 0 ? listing.photos.map((segment) => photo(segment)) : [images.miami];
  const current = Math.min(shot, gallery.length - 1);
  const facts: { k: VegasFactKey; v: string }[] = [{ k: 'facts.bedrooms', v: `${listing.beds}` }, { k: 'facts.bathrooms', v: listing.bathsPartial > 0 ? `${listing.bathsFull} ${t['vdetail.full']}, ${listing.bathsPartial} ${t['vdetail.partial']}` : `${listing.bathsFull} ${t['vdetail.full']}` }, { k: 'facts.interior', v: `${listing.sqft} ${t['common.sqft']}` }, ...listing.facts];
  return <div className="page detail-page"><Header onHome={onBack} /><main className="detail-main">
    <div className="detail-bar"><button onClick={onBack}><ArrowLeft size={16} /> {t['detail.all']}</button><div><button onClick={() => setSaved(!saved)} aria-label="Save residence">{saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}</button></div></div>
    <section className="detail-gallery"><div className="gallery-main"><img src={gallery[current]} alt={listing.address} /><div className="gallery-tags"><span>{t[listing.tagKey]}</span><span>{t['detail.tag2']}</span></div>{gallery.length > 1 && <small>{`${current + 1} / ${gallery.length}`}</small>}</div>{listing.photos.length > 1 && <div className="gallery-thumbs">{listing.photos.map((segment, index) => <button key={segment} className={index === current ? 'active' : ''} onClick={() => setShot(index)} aria-label={`${listing.address} — ${index + 1}`}><img src={photo(segment, 400)} alt={`${listing.address} — ${index + 1}`} /></button>)}</div>}</section>
    <section className="detail-intro"><span className="eyebrow">{t['vdetail.eyebrow'].replace('{city}', city)}</span><h1>{listing.address}</h1><p className="address"><MapPin size={17} /> {listing.location}</p><div className="price-card"><strong>{listing.price}</strong><span>{`${listing.beds} ${t['common.beds']} • ${listing.baths} ${t['common.baths']} • ${listing.sqft} ${t['common.sqft']}`}</span><small>{t['detail.desk']} <em>{t['detail.viewing']}</em></small></div><div className="offer-block detail-offer"><div className="offer-toggle" role="group" aria-label={`${t['detail.rent']} / ${t['detail.buy']}`}><button className={mode === 'rent' ? 'chosen' : ''} onClick={() => choose('rent', plan)}>{t['detail.rent']}</button><button className={mode === 'buy' ? 'chosen' : ''} onClick={() => choose('buy', plan)}>{t['detail.buy']}</button></div><span className="pay-label">{t['detail.payment']}</span><div className="pay-plans">{payPlans.map((key) => <button key={key} className={plan === key ? 'chosen' : ''} onClick={() => choose(mode, key)}>{t[key]}</button>)}</div>{mode === 'rent' ? <p className="offer-amount">{planAmount(monthlyRentValue(listing), plan)} <small>{t['detail.permo']}</small></p> : <p className="offer-amount"><small>{t['pay.due']}</small> <strong>{planAmount(priceValue(listing), plan)}</strong></p>}<button className="add-cart-button" onClick={() => cart.addToCart(listing, mode, plan)}><KeyRound size={14} /> {t['cart.add']}</button></div></section>
    <section className="detail-section"><h2>{t['vdetail.details']}</h2><div className="fact-grid">{facts.map((fact) => <div key={fact.k}><small>{t[fact.k]}</small><strong>{fact.v}</strong></div>)}</div></section>
    <section className="detail-section"><span className="eyebrow">{t['story.eyebrow']}</span><h2>{t['vdetail.about']}</h2>{listing.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    <section className="detail-section amenities"><span className="eyebrow">{t['amen.eyebrow']}</span><h2>{t['amen.title']}</h2><div className="amenity-grid">{listing.amenities.map((group) => <div className="amenity-card" key={group.k}><h3><VegasAmenIcon group={group.k} /> {t[group.k]}</h3><ul>{group.items.map((item) => <li key={item}>✓ <span>{item}</span></li>)}</ul></div>)}</div></section>
    {listing.video && <section className="detail-section"><h2>{t['detail.tour']}</h2><div className="video-frame inline-video"><iframe src={listing.video} title={`${listing.address} — ${t['detail.tour']}`} allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0" /></div></section>}
    <section className="section similar"><SectionTitle eyebrow={t['similar.eyebrow']} title={sameCity.length > 0 ? t['vdetail.more'].replace('{city}', city) : t['similar.title']} action={t['action.seeAll']} /><div className="vegas-grid">{related.map((item) => <VegasCard key={item.id} listing={item} onOpen={onOpen} onTour={setStripTour} />)}</div></section>
    <section className="inquiry-bar"><button className="primary-button acquire-bar" onClick={() => cart.addToCart(listing, mode, plan)}><KeyRound size={16} /> {t['cart.add']}</button></section>
  <Newsletter /></main>{stripTour && stripTour.video && <VideoModal src={stripTour.video} title={stripTour.address} onClose={() => setStripTour(null)} />}</div>;
}

function NetflixLogo() {
  return <svg className="brand-netflix" viewBox="0 0 104 28" role="img" aria-label="Netflix"><text x="0" y="22" textLength="104" lengthAdjust="spacingAndGlyphs" fill="#E50914" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="26">NETFLIX</text></svg>;
}

function UniversalLogo() {
  return <svg className="brand-universal" viewBox="0 0 122 40" role="img" aria-label="Universal Pictures"><defs><linearGradient id="univGlobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EFD189" /><stop offset="1" stopColor="#B8862B" /></linearGradient><clipPath id="univClip"><circle cx="61" cy="15" r="14" /></clipPath></defs><circle cx="61" cy="15" r="14" fill="url(#univGlobe)" /><g clipPath="url(#univClip)" fill="none" stroke="#8A5F14" strokeWidth=".7" opacity=".5"><ellipse cx="61" cy="15" rx="14" ry="5.5" /><ellipse cx="61" cy="15" rx="14" ry="10.5" /><ellipse cx="61" cy="15" rx="5.5" ry="14" /><ellipse cx="61" cy="15" rx="10.5" ry="14" /><path d="M47 15 H75" /></g><circle cx="61" cy="15" r="14" fill="none" stroke="#8A5F14" strokeWidth="1" opacity=".55" /><text x="61" y="20.5" textAnchor="middle" textLength="118" lengthAdjust="spacingAndGlyphs" fill="#A87C22" stroke="#4F3A0E" strokeWidth=".35" fontFamily="'Playfair Display', Georgia, serif" fontWeight="600" fontSize="19">UNIVERSAL</text><text x="61" y="35" textAnchor="middle" textLength="82" lengthAdjust="spacingAndGlyphs" fill="#A87C22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="2">PICTURES</text></svg>;
}

function WarnerBrosLogo() {
  return <svg className="brand-warner" viewBox="0 0 158 42" role="img" aria-label="Warner Bros."><defs><linearGradient id="wbBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2F63BC" /><stop offset="1" stopColor="#123B7F" /></linearGradient></defs><path d="M8 4 H44 V22 C44 32 32 38.5 26 38.5 C20 38.5 8 32 8 22 Z" fill="url(#wbBlue)" /><path d="M8 4 H44 V22 C44 32 32 38.5 26 38.5 C20 38.5 8 32 8 22 Z" fill="none" stroke="#C9A24B" strokeWidth="1.8" /><path d="M12 8 H40 V21.5 C40 29 30.5 34 26 34 C21.5 34 12 29 12 21.5 Z" fill="none" stroke="#C9A24B" strokeWidth=".9" opacity=".7" /><text x="26" y="26" textAnchor="middle" fill="#C9A24B" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="15" letterSpacing="1">WB</text><text x="58" y="27" textLength="97" lengthAdjust="spacingAndGlyphs" fill="#142F66" fontFamily="'Playfair Display', Georgia, serif" fontWeight="600" fontSize="18">WARNER BROS.</text></svg>;
}

function LiveNationLogo() {
  return <svg className="brand-livenation" viewBox="0 0 130 30" role="img" aria-label="Live Nation"><rect x="1" y="1" width="128" height="28" fill="#fff" stroke="#111" strokeWidth="2" /><text x="15" y="20.5" textLength="41" lengthAdjust="spacingAndGlyphs" fill="#E21836" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="14">LIVE</text><text x="58" y="20.5" textLength="58" lengthAdjust="spacingAndGlyphs" fill="#111" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="14">NATION</text></svg>;
}

function HomePage({ onListing, onViewAll }: { onListing: (listing: VegasListing) => void; onViewAll: () => void }) {
  const t = useCopy();
  const nav = useNav();
  const [results, setResults] = useState<VegasListing[] | null>(null);
  const [tour, setTour] = useState<VegasListing | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);
  const runSearch = (criteria: SearchCriteria) => {
    const q = criteria.query.trim().toLowerCase();
    let found = allListings.filter((item) => (!criteria.type || item.typeKey === criteria.type) && (criteria.beds === 0 || item.beds >= criteria.beds) && (!q || `${item.address} ${item.location} ${item.city ?? 'Las Vegas'}`.toLowerCase().includes(q)));
    if (criteria.sort === 'asc') found = [...found].sort((a, b) => priceValue(a) - priceValue(b));
    if (criteria.sort === 'desc') found = [...found].sort((a, b) => priceValue(b) - priceValue(a));
    setResults(found);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };
  // Popular Searches now mirrors the real portfolio: every city we actually list, with true counts and a photo from that city.
  const destinations = Object.entries(allListings.reduce<Record<string, number>>((acc, item) => { const name = item.city ?? 'Las Vegas'; acc[name] = (acc[name] ?? 0) + 1; return acc; }, {}))
    .map(([city, count]) => { const first = allListings.find((item) => (item.city ?? 'Las Vegas') === city && item.photos.length > 0); return { city, count, image: first ? photo(first.photos[0], 600) : images.como }; })
    .sort((a, b) => b.count - a.count);
  return <div className="page"><Header onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} /><main className="home-main">
    <section className="hero"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><div className="hero-scrim" /><div className="hero-heading"><span>{t['hero.eyebrow']}</span><h1>{t['hero.title1']}<br /><em>{t['hero.title2']}</em></h1></div><div className="search-wrap"><SearchPanel onSearch={runSearch} /></div><div className="hero-caption"><span><i /> {t['hero.caption']}</span><div className="carousel-dots"><b /><i /><i /><i /></div></div></section>
    {results && <section className="section search-results" ref={resultsRef}><div className="section-title"><div><span className="eyebrow">{t['search.button']}</span><h2>{t['search.results']}</h2><p>{`${results.length} ${t['common.residences']}`}</p></div></div>{results.length === 0 ? <p className="search-none">{t['search.none']}</p> : <div className="vegas-grid">{results.map((listing) => <VegasCard key={listing.id} listing={listing} onOpen={onListing} onTour={setTour} />)}</div>}</section>}
    <section className="trusted"><p>{t['trusted.label']}</p><div className="trusted-logos"><NetflixLogo /><UniversalLogo /><WarnerBrosLogo /><LiveNationLogo /></div></section>
    <section className="section home-section"><SectionTitle title={t['home.love.title']} subtitle={t['home.love.sub']} action={t['action.viewAll']} /><div className="vegas-grid">{allListings.slice(0, 3).map((listing) => <VegasCard key={listing.id} listing={listing} onOpen={onListing} onTour={setTour} />)}</div></section>
    <section className="agency-callout"><span>{t['callout.eyebrow']}</span><h2>{t['callout.title']}</h2><p>{t['callout.text']}</p><div className="metrics"><div><strong>2.5M+</strong><small>{t['callout.m1']}</small></div><div><strong>500+</strong><small>{t['callout.m2']}</small></div><div><strong>140+</strong><small>{t['callout.m3']}</small></div></div><div className="callout-actions"><button className="dark-button">{t['callout.cta']} <ArrowRight size={16} /></button><button>{t['callout.learn']}</button></div><div className="network-card"><h3><Shield size={19} /> {t['callout.cardTitle']}</h3><p>Netflix & Universal Pictures</p><p>Warner Bros. Discovery</p><p>Live Nation & Sony Music</p><footer>{t['callout.cardFooter']} <span>{t['callout.cardTag']}</span></footer></div></section>
    <section className="section trending"><SectionTitle eyebrow={t['trending.eyebrow']} title={t['trending.title']} action={t['action.seeAll']} /><div className="trend-card"><img src={images.chalet} alt={t['prop3']} /><div className="trend-overlay"><div><strong>{t['prop3']}</strong><span>{t['trending.span']}</span></div><ArrowRight /></div></div></section>
    <section className="section new-market"><SectionTitle title={t['new.title']} subtitle={t['new.sub']} action={t['action.seeAll']} /><div className="vegas-grid">{allListings.slice(3, 9).map((listing) => <VegasCard key={listing.id} listing={listing} onOpen={onListing} onTour={setTour} />)}</div></section>
    <section className="value-section"><span>{t['value.eyebrow']}</span><h2>{t['value.title']}</h2><div className="value-grid"><Value icon={<Building2 />} title={t['value.1t']} text={t['value.1x']} /><Value icon={<Search />} title={t['value.2t']} text={t['value.2x']} /><Value icon={<MessageCircle />} title={t['value.3t']} text={t['value.3x']} /></div></section>
    <section className="section destinations"><SectionTitle title={t['dest.title']} subtitle={t['dest.sub']} action={t['action.viewAll']} />{destinations.map((destination) => <div className="destination" key={destination.city} onClick={() => nav.goCity(destination.city)}><img src={destination.image} alt={destination.city} /><div><strong>{destination.city}</strong><small>{destination.count} {t['common.residences']}</small></div><ArrowRight /></div>)}<button className="dark-button full-button" onClick={onViewAll}>{t['dest.button'].replace('{count}', String(allListings.length))}</button></section>
    <Newsletter />
  </main>{tour && tour.video && <VideoModal src={tour.video} title={tour.address} onClose={() => setTour(null)} />}</div>;
}

function VegasCollectionPage({ onHome, onOpen, filter }: { onHome: () => void; onOpen: (listing: VegasListing) => void; filter: CollectionFilter }) {
  const t = useCopy();
  const [tour, setTour] = useState<VegasListing | null>(null);
  const types = filter.types;
  const listings = filter.city ? allListings.filter((listing) => (listing.city ?? 'Las Vegas') === filter.city) : types ? allListings.filter((listing) => types.includes(listing.typeKey)) : allListings;
  return <div className="page"><Header onHome={onHome} /><main className="home-main">
    <section className="section vegas"><SectionTitle eyebrow={t['vegas.eyebrow']} title={filter.title} subtitle={t['vegas.sub']} action={t['action.seeAll']} /><div className="vegas-grid">{listings.map((listing) => <VegasCard key={listing.id} listing={listing} onOpen={onOpen} onTour={setTour} />)}</div></section>
  <Newsletter /></main>{tour && tour.video && <VideoModal src={tour.video} title={tour.address} onClose={() => setTour(null)} />}</div>;
}

// Slide-in cart shown after an artist acquires a residence; only one residence can be held at a time.
function CartSidebar({ items, error, onClose, onRemove, onProceed }: { items: CartItem[]; error: string; onClose: () => void; onRemove: (id: string) => void; onProceed: () => void }) {
  const t = useCopy();
  const rows = items.flatMap((item) => {
    const listing = allListings.find((entry) => entry.id === item.id);
    if (!listing) return [];
    const base = item.mode === 'rent' ? monthlyRentValue(listing) : priceValue(listing);
    return [{ item, listing, amount: planAmount(base, item.plan), value: planNumber(base, item.plan) }];
  });
  const totalDue = rows.reduce((sum, row) => sum + row.value, 0);
  return <><div className="cart-backdrop" onClick={onClose} /><aside className="cart-sidebar" role="dialog" aria-label={t['cart.title']}>
    <div className="cart-head"><h3><Home size={18} /> {t['cart.title']}</h3><button onClick={onClose} aria-label={t['cart.close']}><X size={18} /></button></div>
    {error && <p className="cart-error">{error}</p>}
    {rows.length === 0 ? <p className="cart-empty">{t['cart.empty']}</p> : <div className="cart-rows">{rows.map((row) => <div className="cart-row" key={row.item.id}><img src={row.listing.photos.length > 0 ? photo(row.listing.photos[0], 200) : images.miami} alt="" /><div className="cart-info"><strong>{row.listing.address}</strong><small>{t[row.item.mode === 'rent' ? 'detail.rent' : 'detail.buy']} · {t[row.item.plan]}</small><span>{row.amount}{row.item.mode === 'rent' && <em> {t['detail.permo']}</em>}</span></div><button className="cart-remove" onClick={() => onRemove(row.item.id)}>{t['cart.remove']}</button></div>)}</div>}
    <footer className="cart-foot">{rows.length > 0 && <div className="cart-total"><span>{t['cart.total']}</span><strong>{formatMoney(totalDue)}</strong></div>}<button className="primary-button cart-checkout" disabled={rows.length === 0} onClick={onProceed}>{t['cart.checkout']} <ArrowRight size={16} /></button></footer>
  </aside></>;
}

// Acquisition summary: itemises the plan totals and shows that the agent's 25% deposit is already paid.
function SummaryPage({ items, status, onBack, onConfirm }: { items: CartItem[]; status: '' | 'sending' | 'sent' | 'error'; onBack: () => void; onConfirm: () => void }) {
  const t = useCopy();
  const rows = items.flatMap((item) => {
    const listing = allListings.find((entry) => entry.id === item.id);
    if (!listing) return [];
    const base = item.mode === 'rent' ? monthlyRentValue(listing) : priceValue(listing);
    const total = planNumber(base, item.plan);
    const deposit = agentDeposit(total);
    return [{ item, listing, total, deposit, balance: total - deposit }];
  });
  const sum = rows.reduce((acc, row) => ({ total: acc.total + row.total, deposit: acc.deposit + row.deposit, balance: acc.balance + row.balance }), { total: 0, deposit: 0, balance: 0 });
  return <div className="page"><Header onHome={onBack} /><main className="home-main">
    <section className="summary">
      <span className="eyebrow">{t['summary.eyebrow']}</span><h1>{t['summary.title']}</h1>
      <div className="summary-note"><Shield size={24} /><p>{t['summary.note']}</p></div>
      {rows.length === 0 ? <p className="cart-empty">{t['cart.empty']}</p> : <>
        <div className="summary-table"><div className="summary-row summary-head"><span>{t['summary.residence']}</span><span>{t['detail.payment']}</span><span>{t['summary.total']}</span><span>{t['summary.agentPaid']}</span><span>{t['summary.balance']}</span></div>{rows.map((row) => <div className="summary-row" key={row.item.id}><div className="summary-place"><strong>{row.listing.address}</strong><small>{row.listing.location}</small><em>{t[row.item.mode === 'rent' ? 'detail.rent' : 'detail.buy']} · {row.listing.price}</em></div><span>{t[row.item.plan]}</span><strong>{formatMoney(row.total)}{row.item.mode === 'rent' && <small className="permo"> {t['detail.permo']}</small>}</strong><span className="agent-paid"><Check size={15} /> {formatMoney(row.deposit)}</span><strong className="balance-due">{formatMoney(row.balance)}</strong></div>)}</div>
        <div className="summary-totals"><div><span>{t['summary.total']}</span><strong>{formatMoney(sum.total)}</strong></div><div className="paid"><span>{t['summary.agentPaid']}</span><strong>- {formatMoney(sum.deposit)}</strong></div><div className="due"><span>{t['summary.balance']}</span><strong>{formatMoney(sum.balance)}</strong></div></div>
      </>}
      {status === 'sending' && <p className="summary-sending">…</p>}
      {status === 'sent' && <p className="summary-sent"><Check size={15} /> {t['summary.sent']}</p>}
      {status === 'error' && <p className="summary-err">{t['summary.err']}</p>}
      {status !== 'sent' && <button className="primary-button summary-confirm" onClick={onConfirm} disabled={rows.length === 0 || status === 'sending'}><KeyRound size={16} /> {t['summary.confirm']}</button>}
      <button className="dark-button summary-back" onClick={onBack}>{t['summary.back']} <ArrowRight size={16} /></button>
    </section>
  <Newsletter /></main></div>;
}

function SectionTitle({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action: string }) {
  return <div className="section-title"> <div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button>{action} <ChevronRight size={16} /></button></div>;
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="value-card"><div className="value-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></div>;
}

function Newsletter() {
  const t = useCopy();
  const [subscribed, setSubscribed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [email, setEmail] = useState('');
  // Sends the address to /api/subscribe, which notifies Agency@caameetings.com through Resend.
  const subscribe = () => {
    if (subscribed || !email.trim()) return;
    setFailed(false);
    fetch('/api/subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) })
      .then((response) => { if (!response.ok) throw new Error('subscribe failed'); setSubscribed(true); setEmail(''); })
      .catch(() => setFailed(true));
  };
  return <section className="newsletter"><span>{t['news.eyebrow']}</span><h2>{t['news.title']}</h2><p>{t['news.text']}</p><div className="newsletter-form"><div><Mail size={18} /><input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') subscribe(); }} placeholder={t['news.ph']} aria-label={t['news.ph']} /></div><button onClick={subscribe}>{subscribed ? t['news.subscribed'] : t['news.button']}</button></div>{subscribed && <small className="success">{t['news.success']}</small>}{failed && <small className="news-fail">{t['news.error']}</small>}<footer>{t['news.footer']}<br /><em>{t['news.footerTag']}</em></footer></section>;
}

function DetailPage({ onBack }: { onBack: () => void }) {
  const t = useCopy();
  const properties = useProperties();
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [level, setLevel] = useState(0);
  const [sent, setSent] = useState(false);
  const levels = [{ title: t['plans.l1t'], subtitle: t['plans.l1s'] }, { title: t['plans.l2t'], subtitle: t['plans.l2s'] }, { title: t['plans.l3t'], subtitle: t['plans.l3s'] }];
  const specs = [[t['specs.1t'], t['specs.1c'], <BedDouble />], [t['specs.2t'], t['specs.2c'], <LayoutGrid />], [t['specs.3t'], t['specs.3c'], <Home />], [t['specs.4t'], t['specs.4c'], <Navigation />], [t['specs.5t'], t['specs.5c'], <Building2 />], [t['specs.6t'], t['specs.6c'], <MapPin />]];
  return <div className="page detail-page"><Header onHome={onBack} /><main className="detail-main"><div className="detail-bar"><button onClick={onBack}><ArrowLeft size={16} /> {t['detail.all']}</button><div><button onClick={() => setSaved(!saved)}>{saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}</button></div></div><section className="detail-gallery"><div className="gallery-main"><img src={images.como} alt={t['prop2']} /><div className="gallery-tags"><span>{t['detail.tag1']}</span><span>{t['detail.tag2']}</span></div><div className="gallery-actions"><button><PlayCircle size={16} /> {t['detail.tour']}</button><button><LayoutGrid size={16} /> {t['detail.gallery']}</button><button><Ruler size={16} /> {t['detail.plans']}</button></div><small>1 / 38</small></div></section><section className="detail-intro"><span className="eyebrow">{t['detail.eyebrow']}</span><h1>{t['detail.h1']}</h1><p className="address"><MapPin size={17} /> Via Vecchia Regina, Cernobbio, Lake Como, Italy</p><div className="price-card"><strong>$12,750,000</strong><span>{`6 ${t['common.beds']} • 8 ${t['common.baths']} • 12,400 ${t['common.sqft']}`}</span><small>{t['detail.desk']} <em>{t['detail.viewing']}</em></small></div></section><section className="spec-grid">{specs.map(([title, caption, icon], index) => <div key={index}><div className="spec-icon">{icon}</div><strong>{title}</strong><small>{caption}</small></div>)}</section><section className="broker-card"><div className="broker-avatar">MR</div><div><strong>Marcus Reed <span>✓</span></strong><small>{t['broker.role']}</small><em>CREATIVE ARTIST AGENCY</em></div><div className="broker-buttons"><button>{t['broker.call']}</button><button>{t['broker.chat']}</button></div></section><section className="detail-section"><span className="eyebrow">{t['story.eyebrow']}</span><h2>{t['story.title']}</h2><p>{t['story.p1']}</p>{expanded && <><p>{t['story.p2']}</p><p>{t['story.p3']}</p></>}<button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? t['story.less'] : t['story.more']} <ChevronDown size={16} /></button><div className="highlight-pair"><div><span>{t['story.h1l']}</span><strong>{t['story.h1v']}</strong><small>{t['story.h1s']}</small></div><div><span>{t['story.h2l']}</span><strong>{t['story.h2v']}</strong><small>{t['story.h2s']}</small></div></div></section><Amenities /><section className="detail-section floorplans"><span className="eyebrow">{t['plans.eyebrow']}</span><h2>{t['plans.title']}</h2><div className="level-tabs">{[t['plans.tab1'], t['plans.tab2'], t['plans.tab3']].map((label, index) => <button key={label} className={level === index ? 'active' : ''} onClick={() => setLevel(index)}>{label}</button>)}</div><div className="plan-card"><div><strong>{levels[level].title}</strong><small>{levels[level].subtitle}</small></div><span>{`${['5,800', '4,200', '2,400'][level]} ${t['common.sqft']}`}</span><div className="blueprint"><div className="plan-room top-left">{t['plans.bp1']}</div><div className="plan-room top-right">{t['plans.bp2']}</div><div className="plan-room pool">{t['plans.bp3']}</div><div className="plan-room lounge">{t['plans.bp4']}</div></div><button className="download-button">{t['plans.download']} <ArrowRight size={16} /></button></div></section><section className="detail-section location-section"><span className="eyebrow">{t['loc.eyebrow']}</span><h2>{t['loc.title']}</h2><div className="map-card" style={{ backgroundImage: `url(${images.como})` }}><div><MapPin size={17} /> {t['specs.6t']}</div></div><div className="proximity"><span><strong>{`10 ${t['common.min']}`}</strong>{t['loc.p1']}</span><span><strong>{`45 ${t['common.min']}`}</strong>{t['loc.p2']}</span><span><strong>{`1 ${t['common.hr']}`}</strong>{t['loc.p3']}</span><span><strong>{`25 ${t['common.min']}`}</strong>{t['loc.p4']}</span></div></section><section className="section similar"><SectionTitle eyebrow={t['similar.eyebrow']} title={t['similar.title']} action={t['action.viewAll']} /><div className="horizontal-cards">{properties.filter((property) => property.title !== t['prop2']).slice(0, 3).map((property) => <PropertyCard key={property.title} property={property} onOpen={() => {}} />)}</div></section><section className="inquiry-bar"><button><MessageCircle size={18} /></button><button className="primary-button" onClick={() => setSent(true)}><Send size={18} /> {sent ? t['inquiry.received'] : t['inquiry.viewing']}</button></section><Newsletter /></main></div>;
}

function Amenities() {
  const t = useCopy();
  const groups = [{ title: t['amen.g1'], icon: <Waves />, items: [t['amen.g1i1'], t['amen.g1i2'], t['amen.g1i3'], t['amen.g1i4']] }, { title: t['amen.g2'], icon: <Sparkles />, items: [t['amen.g2i1'], t['amen.g2i2'], t['amen.g2i3'], t['amen.g2i4']] }, { title: t['amen.g3'], icon: <SlidersHorizontal />, items: [t['amen.g3i1'], t['amen.g3i2'], t['amen.g3i3'], t['amen.g3i4']] }];
  return <section className="detail-section amenities"><span className="eyebrow">{t['amen.eyebrow']}</span><h2>{t['amen.title']}</h2><div className="amenity-grid">{groups.map((group) => <div className="amenity-card" key={group.title}><h3>{group.icon}{group.title}</h3><ul>{group.items.map((item) => <li key={item}>✓ <span>{item}</span></li>)}</ul></div>)}</div></section>;
}

// Each view is a real page with its own URL (History API routing — no router dependency).
type RouteState = { page: 'home' } | { page: 'estate' } | { page: 'summary' } | { page: 'listing'; id: string } | { page: 'city'; city: string } | { page: 'collection'; kind: 'homes' | 'condos' | 'apartments' | 'all' };

function parseRoute(pathname: string): RouteState {
  if (pathname.startsWith('/list/')) return { page: 'listing', id: decodeURIComponent(pathname.slice(6)) };
  if (pathname.startsWith('/city/')) return { page: 'city', city: decodeURIComponent(pathname.slice(6)) };
  if (pathname === '/homes') return { page: 'collection', kind: 'homes' };
  if (pathname === '/condos') return { page: 'collection', kind: 'condos' };
  if (pathname === '/apartments') return { page: 'collection', kind: 'apartments' };
  if (pathname === '/all') return { page: 'collection', kind: 'all' };
  if (pathname === '/summary') return { page: 'summary' };
  if (pathname === '/estate') return { page: 'estate' };
  return { page: 'home' };
}

function routePath(route: RouteState): string {
  if (route.page === 'listing') return `/list/${encodeURIComponent(route.id)}`;
  if (route.page === 'city') return `/city/${encodeURIComponent(route.city)}`;
  if (route.page === 'collection') return `/${route.kind}`;
  if (route.page === 'summary') return '/summary';
  if (route.page === 'estate') return '/estate';
  return '/';
}

function App() {
  const [authed, setAuthed] = useState(() => Boolean(localStorage.getItem('caa-auth')));
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.pathname));
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try { const stored: unknown = JSON.parse(localStorage.getItem('caa-cart') || '[]'); return Array.isArray(stored) ? (stored as CartItem[]).slice(0, 1) : []; } catch { return []; }
  });
  const [cartError, setCartError] = useState('');
  const [acquireStatus, setAcquireStatus] = useState<'' | 'sending' | 'sent' | 'error'>('');
  const [cartOpen, setCartOpen] = useState(false);
  const backPath = useRef('/');
  const summaryReturn = useRef('/');
  const [lang, setLang] = useState<LangKey>(() => {
    const stored = localStorage.getItem('caa-lang');
    if (stored && languages.some((language) => language.key === stored)) return stored as LangKey;
    const detected = languages.find((language) => language.key === navigator.language.slice(0, 2).toLowerCase());
    return detected ? detected.key : 'en';
  });
  useEffect(() => { localStorage.setItem('caa-cart', JSON.stringify(cartItems)); }, [cartItems]);
  // Browser back / forward moves between the real URLs.
  useEffect(() => {
    const onPop = () => { setRoute(parseRoute(window.location.pathname)); window.scrollTo(0, 0); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  // Remember the last collection page so "All residences" returns there.
  useEffect(() => { if (route.page === 'collection' || route.page === 'city') backPath.current = routePath(route); }, [route]);
  useEffect(() => {
    localStorage.setItem('caa-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = copy[lang];
  const scrollTop = () => window.scrollTo(0, 0);
  const navigate = (path: string) => { setRoute(parseRoute(path)); window.history.pushState({}, '', path); scrollTop(); };
  const collection: CollectionFilter | null = route.page === 'collection' ? (route.kind === 'all' ? { title: t['menu.explore'] } : route.kind === 'homes' ? { title: t['nav.home'], types: ['type.home'], nav: 'nav.home' } : route.kind === 'condos' ? { title: t['nav.condos'], types: ['type.condo'], nav: 'nav.condos' } : { title: t['nav.apartments'], types: ['type.penthouse', 'type.loft'], nav: 'nav.apartments' }) : route.page === 'city' ? { title: route.city, city: route.city } : null;
  const listingOpen = route.page === 'listing' ? allListings.find((item) => item.id === route.id) ?? null : null;
  const goHome = () => navigate('/');
  const goHomes = () => navigate('/homes');
  const goCondos = () => navigate('/condos');
  const goApartments = () => navigate('/apartments');
  const goCity = (city: string) => navigate(`/city/${encodeURIComponent(city)}`);
  const goVegas = () => goCity('Las Vegas');
  const signIn = () => { setAuthed(true); scrollTop(); };
  const signOut = () => { localStorage.removeItem('caa-auth'); localStorage.removeItem('caa-cart'); setCartItems([]); setCartOpen(false); setRoute(parseRoute('/')); window.history.pushState({}, '', '/'); setAuthed(false); scrollTop(); };
  // Only one residence can be in acquisition at a time; picking another shows the sidebar with a notice.
  const addToCart = (listing: VegasListing, mode: 'buy' | 'rent', plan: PayPlanKey) => {
    if (cartItems.some((entry) => entry.id !== listing.id)) { setCartError(t['cart.oneOnly']); setCartOpen(true); return; }
    setCartItems([{ id: listing.id, mode, plan }]); setCartError(''); setCartOpen(true); setAcquireStatus('');
  };
  const removeFromCart = (id: string) => { setCartItems((items) => items.filter((entry) => entry.id !== id)); setCartError(''); };
  const checkout = () => { setCartOpen(false); setCartError(''); summaryReturn.current = window.location.pathname; navigate('/summary'); };
  // Mail is sent only when the client presses Send Acquisition Request on the summary page.
  const sendAcquire = () => {
    const item = cartItems[0]; const listing = item ? allListings.find((entry) => entry.id === item.id) : undefined;
    if (!item || !listing) { setAcquireStatus(''); return; }
    const base = item.mode === 'rent' ? monthlyRentValue(listing) : priceValue(listing);
    const total = planNumber(base, item.plan); const deposit = agentDeposit(total);
    setAcquireStatus('sending');
    fetch('/api/acquire', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: localStorage.getItem('caa-auth') || '', residence: { address: listing.address, city: listing.city ?? 'Las Vegas', beds: listing.beds, baths: listing.baths, sqft: listing.sqft, mode: item.mode, plan: item.plan, total, deposit, balance: total - deposit } }) })
      .then((response) => { if (!response.ok) throw new Error('acquire notification failed'); setAcquireStatus('sent'); })
      .catch(() => setAcquireStatus('error'));
  };
  const goBackToCollection = () => navigate(backPath.current);
  const openListing = (listing: VegasListing) => navigate(`/list/${encodeURIComponent(listing.id)}`);
  const active = collection?.nav ?? '';
  return <LangContext.Provider value={{ lang, setLang }}><NavContext.Provider value={{ goHomes, goVegas, goCondos, goApartments, goCity, signOut, active }}><CartContext.Provider value={{ addToCart, openCart: () => setCartOpen(true), count: cartItems.length }}>
    {!authed ? <LoginPage onSignIn={signIn} /> : route.page === 'summary' ? <SummaryPage items={cartItems} status={acquireStatus} onBack={() => navigate(summaryReturn.current)} onConfirm={sendAcquire} /> : listingOpen ? <VegasDetailPage key={listingOpen.id} listing={listingOpen} onBack={goBackToCollection} onOpen={openListing} /> : collection ? <VegasCollectionPage onHome={goHome} onOpen={openListing} filter={collection} /> : route.page === 'estate' ? <DetailPage onBack={goHome} /> : <HomePage onListing={openListing} onViewAll={() => navigate('/all')} />}
    {authed && cartOpen && route.page !== 'summary' && <CartSidebar items={cartItems} error={cartError} onClose={() => { setCartOpen(false); setCartError(''); }} onRemove={removeFromCart} onProceed={checkout} />}
    {authed && !cartOpen && <ScrollTopButton />}
  </CartContext.Provider></NavContext.Provider></LangContext.Provider>;
}

export default App;
