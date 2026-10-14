import { createContext, useContext, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bookmark,
  BookmarkCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Compass,
  Globe2,
  Heart,
  Home,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  PlayCircle,
  Search,
  Send,
  Share2,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Ruler,
  Waves,
  X,
} from 'lucide-react';
import { copy, languages, type LangKey } from './i18n';
import { photo, vegasListings, type VegasAmenKey, type VegasFactKey, type VegasListing, type VegasTypeKey } from './listings';

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

const destinationBase = [
  { nameKey: 'dest1', count: 420, image: images.coast },
  { nameKey: 'dest2', count: 380, image: images.hero },
  { nameKey: 'dest3', count: 260, image: images.castle },
  { nameKey: 'dest4', count: 240, image: images.como },
] as const;

type LangCtx = { lang: LangKey; setLang: (lang: LangKey) => void };
const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} });
const useLang = () => useContext(LangContext);
const useCopy = () => copy[useLang().lang];

// Navigation between the routed views (home / Las Vegas collection filtered by residence type).
type VegasFilter = { titleKey: 'nav.home' | 'nav.condos' | 'nav.apartments'; types: VegasTypeKey[] };
type NavCtx = { goHomes: () => void; goVegas: () => void; goCondos: () => void; goApartments: () => void; active: string };
const NavContext = createContext<NavCtx>({ goHomes: () => {}, goVegas: () => {}, goCondos: () => {}, goApartments: () => {}, active: '' });
const useNav = () => useContext(NavContext);

function useProperties(): Property[] {
  const t = useCopy();
  return propertyBase.map((p) => ({ image: p.image, location: p.location, price: p.price, title: t[p.titleKey], tag: t[p.tagKey], details: `${p.beds} ${t['common.beds']} • ${p.baths} ${t['common.baths']} • ${p.sqft} ${t['common.sqft']}` }));
}

function Logo() {
  return <div className="logo"><span>CREATIVE ARTIST AGENCY</span><small>TOP ARTISTS ONLY</small></div>;
}

function LanguagePicker() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = languages.find((language) => language.key === lang)!;
  return <div className="lang-picker"><button className="lang-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>{current.short} <ChevronDown size={13} /></button>{open && <><div className="lang-backdrop" onClick={() => setOpen(false)} /><div className="lang-menu" role="listbox" aria-label="Language">{languages.map((language) => <button key={language.key} role="option" aria-selected={language.key === lang} className={language.key === lang ? 'active' : ''} onClick={() => { setLang(language.key); setOpen(false); }}>{language.label}<small>{language.short}</small></button>)}</div></>}</div>;
}

function Header({ onHome }: { onHome: () => void }) {
  const t = useCopy();
  const nav = useNav();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [usOpen, setUsOpen] = useState(false);
  const current = languages.find((language) => language.key === lang)!;
  return <>
    <header className="site-header">
      <div className="utility-bar"><div className="utility-inner"><span>{t['utility.worldwide']} <ChevronDown size={13} /></span><LanguagePicker /><div className="utility-right"><span><Heart size={14} /> {t['utility.watchlist']}</span><span><MessageCircle size={14} /> {t['utility.messages']}</span><button>{t['utility.book']}</button><CircleUserRound size={27} /></div></div></div>
      <div className="brand-row"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button><button onClick={onHome} className="brand-button"><Logo /></button><div className="mobile-actions"><Search size={19} /><Heart size={19} /></div></div>
      <nav className="main-nav">{(['nav.home', 'nav.condos', 'nav.apartments'] as const).map((key) => <button key={key} className={key === nav.active ? 'active' : ''} onClick={key === 'nav.home' ? nav.goHomes : key === 'nav.condos' ? nav.goCondos : nav.goApartments}>{t[key]}</button>)}</nav>
      <div className="region-nav"><div className="lang-picker"><button className="lang-trigger" aria-haspopup="menu" aria-expanded={usOpen} onClick={() => setUsOpen((v) => !v)}>{t['region.us']} <ChevronDown size={13} /></button>{usOpen && <><div className="lang-backdrop" onClick={() => setUsOpen(false)} /><div className="lang-menu" role="menu" aria-label={t['region.us']}><button role="menuitem" onClick={() => { setUsOpen(false); nav.goVegas(); }}>{t['nav.lasVegas']}</button></div></>}</div><i>•</i><span>{t['region.uk']} <ChevronDown /></span><i>•</i><span>{t['region.fr']} <ChevronDown /></span><i>•</i><span>{t['region.it']} <ChevronDown /></span><i>•</i><span>{t['region.kr']} <ChevronDown /></span><i>•</i><span>{t['region.jp']} <ChevronDown /></span><i>•</i><span className="all-countries">{t['region.all']} <ArrowRight /></span></div>
    </header>
    {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}><aside onClick={(e) => e.stopPropagation()}><button className="close-menu" onClick={() => setMenuOpen(false)}><X /></button><Logo /><div className="menu-links"><button onClick={onHome}>{t['menu.explore']}</button><button onClick={() => { setMenuOpen(false); nav.goVegas(); }}>{t['nav.lasVegas']}</button><button>{t['utility.watchlist']}</button><button>{t['menu.concierge']}</button><button>{t['nav.journal']}</button><button>{t['utility.book']}</button></div><div className="menu-langs">{languages.map((language) => <button key={language.key} className={language.key === lang ? 'active' : ''} onClick={() => setLang(language.key)}>{language.label}</button>)}</div><div className="menu-footer">{t['utility.worldwide']} &nbsp; | &nbsp; {current.label}</div></aside></div>}
  </>;
}

function BottomNav({ active = 'explore' }: { active?: string }) {
  const t = useCopy();
  return <nav className="bottom-nav"><button className={active === 'explore' ? 'selected' : ''}><Compass /><span>{t['bottom.explore']}</span></button><button><Bookmark /><span>{t['utility.watchlist']}</span></button><button><Sparkles /><span>{t['nav.journal']}</span></button><button><Globe2 /><span>{t['bottom.destinations']}</span></button><button><Shield /><span>{t['bottom.concierge']}</span></button></nav>;
}

function SearchPanel() {
  const t = useCopy();
  const [beds, setBeds] = useState(0);
  return <div className="search-panel"><div className="search-input"><Search size={19} /><input key={t['search.ph']} defaultValue={t['search.ph']} aria-label={t['search.button']} /></div><div className="search-filters"><button>{t['search.type']} <ChevronDown /></button><button>{t['search.price']} <SlidersHorizontal /></button></div><div className="bed-pills">{[t['search.any'], '1+', '2+', '3+', '4+', '5+'].map((label, index) => <button key={label} onClick={() => setBeds(index)} className={beds === index ? 'chosen' : ''}>{label}</button>)}</div><button className="primary-button search-button"><Search size={18} /> {t['search.button']}</button></div>;
}

function PropertyCard({ property, onOpen }: { property: Property; onOpen: () => void }) {
  const [saved, setSaved] = useState(false);
  return <article className="property-card" onClick={onOpen}><div className="property-image"><img src={property.image} alt={property.title} /><span className="image-tag">{property.tag}</span><button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} aria-label="Save residence" className="heart-button">{saved ? <BookmarkCheck size={18} /> : <Heart size={18} />}</button></div><div className="property-copy"><strong>{property.price}</strong><p>{property.title}</p><small>{property.location}</small><div className="property-meta">{property.details}</div></div></article>;
}

function VegasCard({ listing, onOpen, onTour }: { listing: VegasListing; onOpen: (listing: VegasListing) => void; onTour: (listing: VegasListing) => void }) {
  const t = useCopy();
  const [saved, setSaved] = useState(false);
  return <article className="property-card vegas-card" onClick={() => onOpen(listing)}><div className="property-image"><img src={listing.photos.length > 0 ? photo(listing.photos[0]) : images.miami} alt={listing.address} /><span className="image-tag">{t[listing.tagKey]}</span>{listing.video && <button className="tour-pill" onClick={(e) => { e.stopPropagation(); onTour(listing); }}><PlayCircle size={14} /> {t['detail.tour']}</button>}<button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} aria-label="Save residence" className="heart-button">{saved ? <BookmarkCheck size={18} /> : <Heart size={18} />}</button></div><div className="property-copy"><strong>{listing.price}</strong><p>{listing.address}</p><small>{listing.location}</small><div className="property-meta">{`${listing.beds} ${t['common.beds']} • ${listing.baths} ${t['common.baths']} • ${listing.sqft} ${t['common.sqft']}`}</div><small className="vegas-type">{`${t['common.built']} ${listing.year} · ${t[listing.typeKey]} · MLS #${listing.mls}`}</small></div></article>;
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
  const [sent, setSent] = useState(false);
  const [stripTour, setStripTour] = useState<VegasListing | null>(null);
  const gallery = listing.photos.length > 0 ? listing.photos.map((segment) => photo(segment)) : [images.miami];
  const current = Math.min(shot, gallery.length - 1);
  const facts: { k: VegasFactKey; v: string }[] = [{ k: 'facts.bedrooms', v: `${listing.beds}` }, { k: 'facts.bathrooms', v: listing.bathsPartial > 0 ? `${listing.bathsFull} ${t['vdetail.full']}, ${listing.bathsPartial} ${t['vdetail.partial']}` : `${listing.bathsFull} ${t['vdetail.full']}` }, { k: 'facts.interior', v: `${listing.sqft} ${t['common.sqft']}` }, ...listing.facts];
  return <div className="page detail-page"><Header onHome={onBack} /><main className="detail-main">
    <div className="detail-bar"><button onClick={onBack}><ArrowLeft size={16} /> {t['detail.all']}</button><div><button onClick={() => setSaved(!saved)} aria-label="Save residence">{saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}</button><button aria-label="Share"><Share2 size={17} /></button><button aria-label="More options"><MoreHorizontal size={17} /></button></div></div>
    <section className="detail-gallery"><div className="gallery-main"><img src={gallery[current]} alt={listing.address} /><div className="gallery-tags"><span>{t[listing.tagKey]}</span><span>{t['detail.tag2']}</span></div>{gallery.length > 1 && <small>{`${current + 1} / ${gallery.length}`}</small>}</div>{listing.photos.length > 1 && <div className="gallery-thumbs">{listing.photos.map((segment, index) => <button key={segment} className={index === current ? 'active' : ''} onClick={() => setShot(index)} aria-label={`${listing.address} — ${index + 1}`}><img src={photo(segment, 400)} alt={`${listing.address} — ${index + 1}`} /></button>)}</div>}</section>
    <section className="detail-intro"><span className="eyebrow">{t['vdetail.eyebrow']}</span><h1>{listing.address}</h1><p className="address"><MapPin size={17} /> {listing.location}</p><div className="price-card"><strong>{listing.price}</strong><span>{`${listing.beds} ${t['common.beds']} • ${listing.baths} ${t['common.baths']} • ${listing.sqft} ${t['common.sqft']}`}</span><small>{t['detail.desk']} <em>{t['detail.viewing']}</em></small></div></section>
    <section className="detail-section"><h2>{t['vdetail.details']}</h2><div className="fact-grid">{facts.map((fact) => <div key={fact.k}><small>{t[fact.k]}</small><strong>{fact.v}</strong></div>)}</div></section>
    <section className="detail-section"><span className="eyebrow">{t['story.eyebrow']}</span><h2>{t['vdetail.about']}</h2>{listing.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    <section className="detail-section amenities"><span className="eyebrow">{t['amen.eyebrow']}</span><h2>{t['amen.title']}</h2><div className="amenity-grid">{listing.amenities.map((group) => <div className="amenity-card" key={group.k}><h3><VegasAmenIcon group={group.k} /> {t[group.k]}</h3><ul>{group.items.map((item) => <li key={item}>✓ <span>{item}</span></li>)}</ul></div>)}</div></section>
    {listing.video && <section className="detail-section"><h2>{t['detail.tour']}</h2><div className="video-frame inline-video"><iframe src={listing.video} title={`${listing.address} — ${t['detail.tour']}`} allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0" /></div></section>}
    <section className="section similar"><SectionTitle eyebrow={t['similar.eyebrow']} title={t['vdetail.more']} action={t['action.seeAll']} /><div className="vegas-grid">{vegasListings.filter((item) => item.id !== listing.id).map((item) => <VegasCard key={item.id} listing={item} onOpen={onOpen} onTour={setStripTour} />)}</div></section>
    <section className="inquiry-bar"><button aria-label="Message the CAA desk"><MessageCircle size={18} /></button><button className="primary-button" onClick={() => setSent(true)}><Send size={18} /> {sent ? t['inquiry.received'] : t['inquiry.viewing']}</button></section>
  </main>{stripTour && stripTour.video && <VideoModal src={stripTour.video} title={stripTour.address} onClose={() => setStripTour(null)} />}<BottomNav active="concierge" /></div>;
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

function HomePage({ onOpen }: { onOpen: () => void }) {
  const t = useCopy();
  const properties = useProperties();
  return <div className="page"><Header onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} /><main className="home-main">
    <section className="hero"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><div className="hero-scrim" /><div className="hero-heading"><span>{t['hero.eyebrow']}</span><h1>{t['hero.title1']}<br /><em>{t['hero.title2']}</em></h1></div><div className="search-wrap"><SearchPanel /></div><div className="hero-caption"><span><i /> {t['hero.caption']}</span><div className="carousel-dots"><b /><i /><i /><i /></div></div></section>
    <section className="trusted"><p>{t['trusted.label']}</p><div className="trusted-logos"><NetflixLogo /><UniversalLogo /><WarnerBrosLogo /><LiveNationLogo /></div></section>
    <section className="section home-section"><SectionTitle title={t['home.love.title']} subtitle={t['home.love.sub']} action={t['action.viewAll']} /><div className="horizontal-cards">{properties.slice(0, 2).map((property) => <PropertyCard key={property.title} property={property} onOpen={onOpen} />)}</div></section>
    <section className="agency-callout"><span>{t['callout.eyebrow']}</span><h2>{t['callout.title']}</h2><p>{t['callout.text']}</p><div className="metrics"><div><strong>2.5M+</strong><small>{t['callout.m1']}</small></div><div><strong>500+</strong><small>{t['callout.m2']}</small></div><div><strong>140+</strong><small>{t['callout.m3']}</small></div></div><div className="callout-actions"><button className="dark-button">{t['callout.cta']} <ArrowRight size={16} /></button><button>{t['callout.learn']}</button></div><div className="network-card"><h3><Shield size={19} /> {t['callout.cardTitle']}</h3><p>Netflix & Universal Pictures</p><p>Warner Bros. Discovery</p><p>Live Nation & Sony Music</p><footer>{t['callout.cardFooter']} <span>{t['callout.cardTag']}</span></footer></div></section>
    <section className="section trending"><SectionTitle eyebrow={t['trending.eyebrow']} title={t['trending.title']} action={t['action.seeAll']} /><div className="trend-card"><img src={images.chalet} alt={t['prop3']} /><div className="trend-overlay"><div><strong>{t['prop3']}</strong><span>{t['trending.span']}</span></div><ArrowRight /></div></div></section>
    <section className="section new-market"><SectionTitle title={t['new.title']} subtitle={t['new.sub']} action={t['action.seeAll']} />{properties.slice(2).map((property) => <PropertyRow key={property.title} property={property} onOpen={onOpen} />)}</section>
    <section className="value-section"><span>{t['value.eyebrow']}</span><h2>{t['value.title']}</h2><div className="value-grid"><Value icon={<Building2 />} title={t['value.1t']} text={t['value.1x']} /><Value icon={<Search />} title={t['value.2t']} text={t['value.2x']} /><Value icon={<MessageCircle />} title={t['value.3t']} text={t['value.3x']} /></div></section>
    <section className="section destinations"><SectionTitle title={t['dest.title']} subtitle={t['dest.sub']} action={t['action.viewAll']} />{destinationBase.map((destination) => <div className="destination" key={destination.nameKey}><img src={destination.image} alt={t[destination.nameKey]} /><div><strong>{t[destination.nameKey]}</strong><small>{destination.count} {t['common.residences']}</small></div><ArrowRight /></div>)}<button className="dark-button full-button">{t['dest.button']}</button></section>
    <Newsletter />
  </main><BottomNav /></div>;
}

function VegasCollectionPage({ onHome, onOpen, filter }: { onHome: () => void; onOpen: (listing: VegasListing) => void; filter: VegasFilter | null }) {
  const t = useCopy();
  const [tour, setTour] = useState<VegasListing | null>(null);
  const listings = filter ? vegasListings.filter((listing) => filter.types.includes(listing.typeKey)) : vegasListings;
  return <div className="page"><Header onHome={onHome} /><main className="home-main">
    <section className="section vegas"><SectionTitle eyebrow={t['vegas.eyebrow']} title={filter ? t[filter.titleKey] : t['vegas.title']} subtitle={t['vegas.sub']} action={t['action.seeAll']} /><div className="vegas-grid">{listings.map((listing) => <VegasCard key={listing.id} listing={listing} onOpen={onOpen} onTour={setTour} />)}</div></section>
  </main>{tour && tour.video && <VideoModal src={tour.video} title={tour.address} onClose={() => setTour(null)} />}<BottomNav /></div>;
}

function PropertyRow({ property, onOpen }: { property: Property; onOpen: () => void }) {
  return <article className="property-row" onClick={onOpen}><img src={property.image} alt={property.title} /><div><strong>{property.price}</strong><p>{property.location}</p></div><small>{property.details}</small></article>;
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
  return <section className="newsletter"><span>{t['news.eyebrow']}</span><h2>{t['news.title']}</h2><p>{t['news.text']}</p><div className="newsletter-form"><div><Mail size={18} /><input placeholder={t['news.ph']} aria-label={t['news.ph']} /></div><button onClick={() => setSubscribed(true)}>{subscribed ? t['news.subscribed'] : t['news.button']}</button></div>{subscribed && <small className="success">{t['news.success']}</small>}<footer>{t['news.footer']}<br /><em>{t['news.footerTag']}</em></footer></section>;
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
  return <div className="page detail-page"><Header onHome={onBack} /><main className="detail-main"><div className="detail-bar"><button onClick={onBack}><ArrowLeft size={16} /> {t['detail.all']}</button><div><button onClick={() => setSaved(!saved)}>{saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}</button><button><Share2 size={17} /></button><button><MoreHorizontal size={17} /></button></div></div><section className="detail-gallery"><div className="gallery-main"><img src={images.como} alt={t['prop2']} /><div className="gallery-tags"><span>{t['detail.tag1']}</span><span>{t['detail.tag2']}</span></div><div className="gallery-actions"><button><PlayCircle size={16} /> {t['detail.tour']}</button><button><LayoutGrid size={16} /> {t['detail.gallery']}</button><button><Ruler size={16} /> {t['detail.plans']}</button></div><small>1 / 38</small></div></section><section className="detail-intro"><span className="eyebrow">{t['detail.eyebrow']}</span><h1>{t['detail.h1']}</h1><p className="address"><MapPin size={17} /> Via Vecchia Regina, Cernobbio, Lake Como, Italy</p><div className="price-card"><strong>$12,750,000</strong><span>{`6 ${t['common.beds']} • 8 ${t['common.baths']} • 12,400 ${t['common.sqft']}`}</span><small>{t['detail.desk']} <em>{t['detail.viewing']}</em></small></div></section><section className="spec-grid">{specs.map(([title, caption, icon], index) => <div key={index}><div className="spec-icon">{icon}</div><strong>{title}</strong><small>{caption}</small></div>)}</section><section className="broker-card"><div className="broker-avatar">MR</div><div><strong>Marcus Reed <span>✓</span></strong><small>{t['broker.role']}</small><em>CREATIVE ARTIST AGENCY</em></div><div className="broker-buttons"><button>{t['broker.call']}</button><button>{t['broker.chat']}</button></div></section><section className="detail-section"><span className="eyebrow">{t['story.eyebrow']}</span><h2>{t['story.title']}</h2><p>{t['story.p1']}</p>{expanded && <><p>{t['story.p2']}</p><p>{t['story.p3']}</p></>}<button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? t['story.less'] : t['story.more']} <ChevronDown size={16} /></button><div className="highlight-pair"><div><span>{t['story.h1l']}</span><strong>{t['story.h1v']}</strong><small>{t['story.h1s']}</small></div><div><span>{t['story.h2l']}</span><strong>{t['story.h2v']}</strong><small>{t['story.h2s']}</small></div></div></section><Amenities /><section className="detail-section floorplans"><span className="eyebrow">{t['plans.eyebrow']}</span><h2>{t['plans.title']}</h2><div className="level-tabs">{[t['plans.tab1'], t['plans.tab2'], t['plans.tab3']].map((label, index) => <button key={label} className={level === index ? 'active' : ''} onClick={() => setLevel(index)}>{label}</button>)}</div><div className="plan-card"><div><strong>{levels[level].title}</strong><small>{levels[level].subtitle}</small></div><span>{`${['5,800', '4,200', '2,400'][level]} ${t['common.sqft']}`}</span><div className="blueprint"><div className="plan-room top-left">{t['plans.bp1']}</div><div className="plan-room top-right">{t['plans.bp2']}</div><div className="plan-room pool">{t['plans.bp3']}</div><div className="plan-room lounge">{t['plans.bp4']}</div></div><button className="download-button">{t['plans.download']} <ArrowRight size={16} /></button></div></section><section className="detail-section location-section"><span className="eyebrow">{t['loc.eyebrow']}</span><h2>{t['loc.title']}</h2><div className="map-card" style={{ backgroundImage: `url(${images.como})` }}><div><MapPin size={17} /> {t['specs.6t']}</div></div><div className="proximity"><span><strong>{`10 ${t['common.min']}`}</strong>{t['loc.p1']}</span><span><strong>{`45 ${t['common.min']}`}</strong>{t['loc.p2']}</span><span><strong>{`1 ${t['common.hr']}`}</strong>{t['loc.p3']}</span><span><strong>{`25 ${t['common.min']}`}</strong>{t['loc.p4']}</span></div></section><section className="section similar"><SectionTitle eyebrow={t['similar.eyebrow']} title={t['similar.title']} action={t['action.viewAll']} /><div className="horizontal-cards">{properties.filter((property) => property.title !== t['prop2']).slice(0, 3).map((property) => <PropertyCard key={property.title} property={property} onOpen={() => {}} />)}</div></section><section className="inquiry-bar"><button><MessageCircle size={18} /></button><button className="primary-button" onClick={() => setSent(true)}><Send size={18} /> {sent ? t['inquiry.received'] : t['inquiry.viewing']}</button></section></main><BottomNav active="concierge" /></div>;
}

function Amenities() {
  const t = useCopy();
  const groups = [{ title: t['amen.g1'], icon: <Waves />, items: [t['amen.g1i1'], t['amen.g1i2'], t['amen.g1i3'], t['amen.g1i4']] }, { title: t['amen.g2'], icon: <Sparkles />, items: [t['amen.g2i1'], t['amen.g2i2'], t['amen.g2i3'], t['amen.g2i4']] }, { title: t['amen.g3'], icon: <SlidersHorizontal />, items: [t['amen.g3i1'], t['amen.g3i2'], t['amen.g3i3'], t['amen.g3i4']] }];
  return <section className="detail-section amenities"><span className="eyebrow">{t['amen.eyebrow']}</span><h2>{t['amen.title']}</h2><div className="amenity-grid">{groups.map((group) => <div className="amenity-card" key={group.title}><h3>{group.icon}{group.title}</h3><ul>{group.items.map((item) => <li key={item}>✓ <span>{item}</span></li>)}</ul></div>)}</div></section>;
}

function App() {
  const [view, setView] = useState<'home' | 'detail' | 'vegas'>('home');
  const [vegasId, setVegasId] = useState<string | null>(null);
  const [vegasFilter, setVegasFilter] = useState<VegasFilter | null>(null);
  const [lang, setLang] = useState<LangKey>(() => {
    const stored = localStorage.getItem('caa-lang');
    if (stored && languages.some((language) => language.key === stored)) return stored as LangKey;
    const detected = languages.find((language) => language.key === navigator.language.slice(0, 2).toLowerCase());
    return detected ? detected.key : 'en';
  });
  useEffect(() => {
    localStorage.setItem('caa-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const vegasOpen = vegasListings.find((item) => item.id === vegasId) ?? null;
  const scrollTop = () => window.scrollTo(0, 0);
  const goHome = () => { setVegasId(null); setVegasFilter(null); setView('home'); scrollTop(); };
  const openCollection = (filter: VegasFilter | null) => { setVegasId(null); setVegasFilter(filter); setView('vegas'); scrollTop(); };
  const goHomes = () => openCollection({ titleKey: 'nav.home', types: ['type.home'] });
  const goVegas = () => openCollection(null);
  const goCondos = () => openCollection({ titleKey: 'nav.condos', types: ['type.condo'] });
  const goApartments = () => openCollection({ titleKey: 'nav.apartments', types: ['type.penthouse', 'type.loft'] });
  const goBackToCollection = () => { setVegasId(null); setView('vegas'); scrollTop(); };
  const openListing = (listing: VegasListing) => { setVegasId(listing.id); scrollTop(); };
  const active = vegasFilter ? vegasFilter.titleKey : '';
  return <LangContext.Provider value={{ lang, setLang }}><NavContext.Provider value={{ goHomes, goVegas, goCondos, goApartments, active }}>{vegasOpen ? <VegasDetailPage key={vegasOpen.id} listing={vegasOpen} onBack={goBackToCollection} onOpen={openListing} /> : view === 'vegas' ? <VegasCollectionPage onHome={goHome} onOpen={openListing} filter={vegasFilter} /> : view === 'home' ? <HomePage onOpen={() => { setView('detail'); scrollTop(); }} /> : <DetailPage onBack={goHome} />}</NavContext.Provider></LangContext.Provider>;
}

export default App;
