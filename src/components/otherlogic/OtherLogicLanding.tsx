import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  ChevronRight,
  CreditCard,
  Gift,
  Globe2,
  Link2,
  Megaphone,
  Menu,
  MonitorSmartphone,
  Percent,
  Phone,
  Search,
  Server,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "./ContactModal";
import logoAsset from "@/assets/otherlogic-logo.png";
import restaurantImage from "@/assets/restaurant-operations.jpg";
import kitchenImage from "@/assets/kitchen-operations.jpg";
import connectedImage from "@/assets/connected-restaurant.jpg";
import amerLogo from "@/assets/amer-group.png";
import jwMarriottLogo from "@/assets/jw-marriott.webp";
import movenpickLogo from "@/assets/movenpick-group.webp";

const nav = ["Solutions", "Industries", "Why OtherLogic", "Projects", "About", "Contact"];
const markets = ["Egypt", "Saudi Arabia", "UAE", "Canada", "USA", "New Zealand", "Yemen", "Iraq", "Netherlands"];
const clients = ["AMER Group", "Arabic Engineering Office", "Ajman International Urban Planning Conference", "American University in Cairo", "Citi", "DB Philosophy", "Design Build SAE", "JW Marriott", "DSV", "ETUF", "Elsewedy Electric", "Electro LED", "Ghibli Travel", "German Medical Solutions", "Glory Technology", "Gulf Air", "InterContinental Hotels & Resorts", "HTC", "Mövenpick", "Nisantasi", "Prego", "Texas Global", "UTI", "United Submarines", "Sequoia", "Taqnia Consulting"];

const operations = [
  ["CUSTOMER", "Discovery, loyalty and experience"],
  ["ORDER", "Web, mobile and commerce channels"],
  ["POS", "Connected transaction workflows"],
  ["INVENTORY", "Operational visibility and control"],
  ["MANAGEMENT", "Practical software and oversight"],
  ["ANALYTICS", "Decisions grounded in the operation"],
];

const zones = [
  { no: "01", place: "FRONT OF HOUSE", title: "YOUR DIGITAL FRONT DOOR", services: "Web Development · Web Design · E-Commerce", copy: "Create digital experiences that make it easier for customers to discover, explore and engage with your business.", icon: MonitorSmartphone },
  { no: "02", place: "CUSTOMER ORDER", title: "TURN INTERACTION INTO ACTION", services: "Mobile Applications · E-Commerce · Online Advertising", copy: "Meet customers wherever the order begins — website, mobile or digital channels.", icon: Smartphone },
  { no: "03", place: "AI SOLUTIONS", title: "MAKE THE OPERATION THINK", services: "AI Integration · Custom AI Solutions · Intelligent Automation", copy: "Put practical AI to work across the business — from smarter decisions to automated workflows.", icon: Bot },
  { no: "04", place: "CONTROL ROOM", title: "RUN THE OPERATION ON SOLID GROUND", services: "Software Solutions · Hosting · IT Consultation", copy: "Give management the technology, infrastructure and support needed to run the operation.", icon: Server },
  { no: "05", place: "CUSTOMER GROWTH", title: "BRING CUSTOMERS BACK", services: "SEO · E-Marketing · Online Advertising", copy: "Build visibility, engagement and digital experiences that support acquisition and retention.", icon: Search },
  { no: "06", place: "REPORTS", title: "SEE THE BUSINESS BEHIND THE NUMBERS", services: "Reports · Dashboards · Business Analytics", copy: "Clear reports and analytics that turn operational data into confident decisions.", icon: BarChart3 },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return <a href="#top" aria-label="OtherLogic home" className="flex items-center gap-3"><img src={logoAsset} alt="" className={compact ? "h-10 w-auto" : "h-12 w-auto"} /><span className="text-sm font-extrabold tracking-[0.2em] text-foreground">OTHERLOGIC</span></a>;
}

function Header({ onContact }: { onContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className={`fixed inset-x-0 top-0 z-50 [--foreground:var(--warm)] transition-all duration-500 ${scrolled ? "border-b border-border/20 bg-ink/90 py-3 shadow-lg backdrop-blur-md" : "bg-transparent py-5"}`}>
    <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 lg:px-8">
      <Brand compact />
      <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
        {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-[11px] font-bold uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-primary">{item}</a>)}
        <span className="h-4 w-px bg-border/40" /><button className="text-[11px] font-bold text-foreground" aria-label="Language selector">EN / AR</button>
        <Button variant="brand" size="lg" onClick={onContact}>Let&apos;s Talk <ArrowRight /></Button>
      </nav>
      <Button variant="ghost" size="icon" className="min-h-11 min-w-11 text-foreground lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu /></Button>
    </div>
    {open && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-ink p-6 lg:hidden">
      <div className="flex items-center justify-between"><Brand /><Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Close navigation" onClick={() => setOpen(false)}><X /></Button></div>
      <nav className="my-auto flex flex-col gap-4" aria-label="Mobile navigation">{nav.map((item, i) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)} className="border-b border-border/20 py-3 text-4xl font-bold uppercase text-foreground"><span className="mr-4 text-xs text-primary">0{i + 1}</span>{item}</a>)}</nav>
      <Button variant="brand" size="xl" onClick={() => { setOpen(false); onContact(); }}>Let&apos;s Talk <ArrowRight /></Button>
    </motion.div>}
  </header>;
}

function Hero({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const scenes = [
    { eyebrow: "22+ YEARS OF EXPERIENCE", title: <>22 YEARS<br />BEHIND THE<br />BUSINESS.</>, copy: "For more than two decades, OtherLogic has helped businesses turn complex operations into connected digital experiences.", image: restaurantImage },
    { eyebrow: "THE CONNECTED OPERATION", title: <>FROM ORDER<br />TO OPERATION.</>, copy: "Every order is part of a bigger operation. Every kitchen, table, inventory process and customer interaction needs to work together.", image: kitchenImage },
    { eyebrow: "PRACTICAL TECHNOLOGY. BUILT TO EVOLVE.", title: <>BUILT FOR<br />WHAT’S NEXT.</>, copy: "From software and mobile applications to digital commerce, hosting, automation and digital growth — we build practical technology that evolves with your business.", image: connectedImage },
  ];
  return <section ref={ref} id="top" className="relative h-[300vh] bg-ink text-foreground">
    <div className="sticky top-0 h-dvh overflow-hidden">
      {scenes.map((scene, i) => {
        const start = i / 3, mid = (i + 0.5) / 3, end = (i + 1) / 3;
        const opacity = useTransform(smooth, i === 0 ? [start, mid, end] : [start, mid, end], i === 0 ? [1, 1, 0] : i === 2 ? [0, 1, 1] : [0, 1, 0]);
        const scale = useTransform(smooth, [start, end], [1.08, 1]);
        const y = useTransform(smooth, [start, end], [60, -30]);
        return <motion.div key={scene.eyebrow} style={{ opacity }} className="absolute inset-0">
          <motion.img style={{ scale }} src={scene.image} alt={i === 0 ? "Restaurant service connecting guests, staff, point of sale and kitchen operations" : i === 1 ? "Restaurant kitchen team coordinating operational workflow" : "Connected restaurant environment with mobile and management technology"} width={1920} height={1280} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_78%,transparent)_40%,color-mix(in_oklab,var(--ink)_12%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--ink)_0%,transparent_38%)]" />
          <motion.div style={{ y }} className="absolute inset-x-0 top-[18%] mx-auto max-w-[1480px] px-5 lg:top-[20%] lg:px-8">
            <p className="eyebrow mb-7 text-primary">{scene.eyebrow}</p><h1 className="display-type max-w-5xl text-foreground">{scene.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-foreground/72 lg:ml-[38%] lg:text-lg">{scene.copy}</p>
            {i === 0 && <div className="mt-8 flex gap-8 lg:ml-[38%]">{[["22+", "Years Experience"], ["150+", "Clients"], ["250+", "Projects"]].map(([n, l]) => <div key={l}><strong className="text-2xl text-primary">{n}</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-foreground/55">{l}</span></div>)}</div>}
            {i === 1 && <div className="mt-8 flex max-w-3xl flex-wrap gap-x-8 gap-y-2 lg:ml-[38%]">{["CONNECT THE FRONT OF HOUSE.", "CONNECT THE BACK OF HOUSE.", "CONNECT THE BUSINESS."].map(x => <span key={x} className="text-xs font-bold text-primary">{x}</span>)}</div>}
            {i === 2 && <div className="mt-8 flex flex-wrap gap-3 lg:ml-[38%]"><Button asChild variant="brand" size="xl"><a href="#solutions">Explore Our Solutions <ArrowRight /></a></Button><Button variant="brandOutline" size="xl" onClick={onContact}>Let&apos;s Talk</Button></div>}
          </motion.div>
        </motion.div>;
      })}
      <div className="absolute bottom-7 inset-x-0 mx-auto flex max-w-[1480px] items-center justify-between px-5 lg:px-8"><motion.span className="text-xs font-bold tracking-[0.15em] text-primary">{useTransform(smooth, v => `${String(Math.min(3, Math.floor(v * 3) + 1)).padStart(2, "0")} / 03`)}</motion.span><div className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/60 sm:flex">Scroll to explore <ArrowDown className="h-4 w-4" /></div></div>
      <motion.div style={{ scaleX: smooth }} className="absolute bottom-0 left-0 h-1 w-full origin-left bg-primary" />
    </div>
  </section>;
}

function ClientLogos() {
  const logos: [string, string][] = [
    [amerLogo, "AMER Group"],
    [jwMarriottLogo, "JW Marriott"],
    [movenpickLogo, "Mövenpick Group"],
  ];
  return <section aria-label="Featured clients" className="bg-ink px-5 pt-20 pb-24 text-foreground lg:px-8 lg:pt-28 lg:pb-32">
    <div className="mx-auto max-w-[1480px]">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">WHERE VISION<br />MEETS THE FRONTIER</h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-foreground/60">We partner with forward-thinking clients who turn bold ideas into experiences that move industries forward.</p>
      </Reveal>
      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {logos.map(([src, name]) => <Reveal key={name} className="flex h-32 items-center justify-center bg-warm p-6 sm:h-40 lg:p-8">
          <img src={src} alt={`${name} logo`} loading="lazy" className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 hover:scale-105" />
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{value}{suffix}</span>;
}

function Proof() { return <section className="bg-warm px-5 py-24 text-ink lg:px-8 lg:py-36"><div className="mx-auto max-w-[1480px]"><p className="eyebrow text-accent">Built over two decades</p><h2 className="section-title mt-7">LET THE NUMBERS<br />DO THE TALK.</h2><div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">{([["22", "+", "Years of Experience"], ["150", "+", "Clients"], ["250", "+", "Projects"], ["3", "", "Awards"]] as [string, string, string][]).map(([n, suffix, label]) => <Reveal key={label} className="py-8 lg:px-8 first:pl-0"><strong className="text-6xl font-extrabold lg:text-8xl"><Counter to={parseInt(n)} suffix={suffix} /></strong><span className="mt-3 block text-xs font-bold uppercase tracking-[0.14em] text-ink/55">{label}</span></Reveal>)}</div><p className="mt-14 text-sm text-ink/60">Experience across multiple markets.</p><div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">{markets.map((m, i) => <span key={m} className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em]"><i className={`h-2 w-2 rounded-full ${i % 2 ? "bg-accent" : "bg-primary"}`} />{m}</span>)}</div></div></section>; }

function Positioning() {
  const [active, setActive] = useState(0);
  const selectedOperation = operations[active];
  if (!selectedOperation) return null;
  return <section id="why-otherlogic" className="bg-ink px-5 py-24 text-foreground lg:px-8 lg:py-36"><div className="mx-auto grid max-w-[1480px] gap-16 lg:grid-cols-[1.15fr_.85fr]"><div><p className="eyebrow text-primary">Why OtherLogic</p><h2 className="section-title mt-7">WE DON’T JUST<br />BUILD SOFTWARE.<br />WE UNDERSTAND<br />THE OPERATION.</h2><div className="mt-10 max-w-xl space-y-5 text-base leading-8 text-foreground/65"><p>F&amp;B businesses don’t operate through software alone.</p><p>They operate through people, orders, kitchens, tables, inventory, suppliers, customers and thousands of decisions made every day.</p><p>OtherLogic connects these moving parts through practical technology built around the way the business actually works.</p></div></div><div className="self-center border-l border-border/25 pl-5 lg:pl-12"><p className="mb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/45">The restaurant operating system</p>{operations.map(([title], i) => <button key={title} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`group relative flex w-full items-center gap-5 border-t border-border/20 py-5 text-left transition-colors ${active === i ? "text-primary" : "text-foreground/45 hover:text-foreground"}`}><span className="text-[10px] font-bold">0{i + 1}</span><strong className="text-xl lg:text-2xl">{title}</strong><ArrowRight className={`ml-auto transition-transform ${active === i ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`} />{active === i && <span className="absolute bottom-0 left-0 h-px w-full data-line" />}</button>)}<motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-sm text-foreground/60">{selectedOperation[1]}</motion.p></div></div></section>;
}

function Ecosystem() {
  const [active, setActive] = useState(0);
  const zone = zones[active];
  if (!zone) return null;
  return <section id="solutions" className="subtle-grid bg-warm px-5 py-24 text-ink lg:px-8 lg:py-36"><div className="mx-auto max-w-[1480px]"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="eyebrow text-accent">F&amp;B Digital Ecosystem</p><h2 className="section-title mt-7">ONE BUSINESS.<br />MANY TOUCHPOINTS.</h2></div><p className="max-w-md text-base leading-7 text-ink/60">One connected technology partner across the physical and digital operation.</p></div><div className="mt-16 grid overflow-hidden border border-ink/20 bg-warm lg:grid-cols-[.9fr_1.1fr]"><div className="grid grid-cols-2 border-b border-ink/20 lg:border-b-0 lg:border-r">{zones.map((item, i) => { const Icon = item.icon; return <button key={item.place} onClick={() => setActive(i)} className={`relative flex min-h-40 flex-col items-start justify-between border-b border-r border-ink/15 p-5 text-left transition-colors lg:min-h-52 ${active === i ? "bg-ink text-foreground" : "hover:bg-secondary"}`}><span className="flex w-full justify-between text-[10px] font-bold tracking-[0.13em]"><span>{item.no}</span><Icon className={`h-5 w-5 ${active === i ? "text-primary" : "text-accent"}`} /></span><strong className="max-w-[12rem] text-sm uppercase leading-5">{item.place}</strong></button>; })}</div><motion.div key={zone.no} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="flex min-h-[540px] flex-col justify-between bg-ink-soft p-7 text-foreground lg:p-12"><div className="flex items-center justify-between"><span className="eyebrow text-primary">Zone {zone.no}</span><div className="flex items-center gap-2 text-[10px] text-foreground/45"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> ACTIVE CONNECTION</div></div><div><zone.icon className="mb-10 h-16 w-16 stroke-1 text-primary" /><p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/50">{zone.place}</p><h3 className="mt-4 max-w-2xl text-4xl font-extrabold uppercase leading-none lg:text-6xl">{zone.title}</h3><p className="mt-6 text-sm font-bold text-primary">{zone.services}</p><p className="mt-5 max-w-xl text-base leading-7 text-foreground/60">{zone.copy}</p></div><div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground/45"><span className="h-px flex-1 data-line" /> Your business <ChevronRight className="text-primary" /></div></motion.div></div></div></section>;
}

const myresFeatures: [string, string, LucideIcon][] = [
  ["Call Center", "Phone orders flow into the same connected system.", Phone],
  ["Analytic Dashboard", "Easy to create and manage orders, multiple menu item levels, reports and push notifications.", BarChart3],
  ["iOS & Android Online Ordering", "Easy registration, order history, favorite orders and reorder, multiple addresses, online payment and order status tracking.", Smartphone],
  ["Online Payment", "Accept credit card payments and drop the money instantly into your bank account.", CreditCard],
  ["Offers Modules", "Tailor your offers to get your customers to take action.", Megaphone],
  ["Responsive Devices", "A consistent experience on every screen your customers use.", MonitorSmartphone],
  ["Coupon Handling", "Promotional codes that apply discounts to individual products or an entire order.", Percent],
  ["Loyalty Programs", "Designed to encourage customers to be your loyal ones.", Gift],
  ["Oracle Simphony POS Integration", "Orders post directly to Simphony, to the appropriate store and straight to the kitchen, with discounts and payments posted to the guest check.", Link2],
];

function Products() {
  return <section id="products" className="bg-ink px-5 py-24 text-foreground lg:px-8 lg:py-36">
    <div className="mx-auto max-w-[1480px]">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow text-primary">Our proven solutions &amp; products</p>
          <h2 className="section-title mt-7">PRODUCTS BUILT<br />FOR THE OPERATION.</h2>
        </div>
        <p className="max-w-md text-base leading-7 text-foreground/60">Ready-made products we build, run and keep evolving — proven inside real businesses.</p>
      </div>
      <div className="mt-16 grid border border-border/20 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal className="border-b border-border/20 lg:border-b-0 lg:border-r">
          <a href="https://myres.me" target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col justify-between bg-ink-soft p-7 transition-colors duration-500 hover:bg-ink lg:p-12">
            <div>
              <span className="eyebrow text-primary">Product 01</span>
              <h3 className="mt-8 text-6xl font-extrabold tracking-tight lg:text-8xl">MYRES</h3>
              <p className="mt-5 text-sm font-bold uppercase tracking-[.12em] text-primary">White label app for online ordering and delivery</p>
              <p className="mt-6 max-w-md text-base leading-7 text-foreground/60">It’s easy! We handle all the technical development and details, including creation, service, maintenance and updates! You can concentrate on just your business.</p>
            </div>
            <span className="mt-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-foreground/70 transition-colors group-hover:text-primary">Visit myres.me <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" /></span>
          </a>
        </Reveal>
        <div className="grid sm:grid-cols-2">
          {myresFeatures.map(([name, desc, Icon]) => <Reveal key={name} className="border-b border-r border-border/15 p-6 [&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+1)]:border-b-0 lg:p-7">
            <Icon className="h-5 w-5 text-primary" />
            <h4 className="mt-4 text-sm font-extrabold uppercase tracking-[.06em]">{name}</h4>
            <p className="mt-2 text-xs leading-5 text-foreground/50">{desc}</p>
          </Reveal>)}
        </div>
      </div>
      <Reveal className="mt-4 grid border border-border/20 bg-warm text-ink lg:grid-cols-[.85fr_1.15fr]">
        <div className="p-7 lg:p-12">
          <p className="eyebrow text-accent">Product 02</p>
          <h3 className="mt-8 text-6xl font-extrabold tracking-tight lg:text-8xl">MALLZ</h3>
          <p className="mt-5 text-sm font-bold uppercase tracking-[.12em] text-ink/60">Mall &amp; tenant management</p>
        </div>
        <div className="border-t border-ink/15 p-7 lg:border-l lg:border-t-0 lg:p-12">
          <p className="max-w-xl text-base leading-7 text-ink/70">A dashboard for managing tenants and mall financials — giving clear reports for daily transactions across the whole property.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Tenant Management", "Mall Financials", "Daily Transaction Reports"].map((item, i) => <div key={item} className="border-t border-ink/25 pt-4"><span className="text-[10px] font-bold text-accent">0{i + 1}</span><p className="mt-2 text-xs font-bold uppercase tracking-[.1em]">{item}</p></div>)}
          </div>
        </div>
      </Reveal>
    </div>
  </section>;
}

function Journey() { const stages = [["DISCOVER", "SEO · Digital Marketing · Online Advertising"], ["EXPLORE", "Website · Digital Experience"], ["ORDER", "Mobile Applications · E-Commerce"], ["OPERATE", "Software · Automation"], ["RETURN", "Digital Engagement · Customer Experience"], ["GROW", "Data · Digital Marketing · Operational Technology"]]; return <section id="industries" className="bg-warm px-5 py-24 text-ink lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]"><h2 className="section-title">ONE CUSTOMER.<br />A HUNDRED DIGITAL MOMENTS.</h2><div className="relative mt-16 grid gap-0 md:grid-cols-3 lg:grid-cols-6"><div className="absolute top-6 left-0 hidden h-px w-full data-line lg:block" />{stages.map(([name, detail], i) => <Reveal key={name} className="relative border-l border-ink/20 py-5 pl-5 lg:border-l-0 lg:pt-16"><span className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 bg-warm text-xs font-bold lg:left-1/2 lg:-translate-x-1/2">0{i + 1}</span><h3 className="mt-8 text-xl font-extrabold lg:mt-0">{name}</h3><p className="mt-3 text-xs leading-5 text-ink/55">{detail}</p></Reveal>)}</div></div></section>; }

function Approach() { const items = [["UNDERSTAND", "We start with the business, the operation and the real challenge."], ["DESIGN", "We turn requirements into practical digital experiences."], ["BUILD", "We develop scalable web, mobile and software solutions."], ["EVOLVE", "We continue improving the technology as the business grows."]]; return <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]"><p className="eyebrow">Our approach</p><h2 className="mt-7 max-w-6xl text-4xl font-extrabold uppercase leading-[.95] lg:text-7xl">TECHNOLOGY IS ONLY USEFUL<br />WHEN IT SOLVES A REAL PROBLEM.</h2><div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4">{items.map(([t, c], i) => <div key={t} className="border-t border-primary-foreground/35 py-7 lg:min-h-72 lg:border-l lg:border-t-0 lg:p-7"><span className="text-xs font-bold">0{i + 1}</span><h3 className="mt-12 text-2xl font-extrabold">{t}</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/70">{c}</p></div>)}</div></div></section>; }

function ClientWall() { return <section id="projects" className="bg-ink px-5 py-24 text-foreground lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]"><p className="eyebrow text-primary">Selected clients</p><h2 className="section-title mt-7">TRUSTED BY BUSINESSES<br />ACROSS MARKETS.</h2><div className="mt-16 grid grid-cols-2 border-l border-t border-border/20 md:grid-cols-3 lg:grid-cols-4">{clients.map(c => <div key={c} className="flex min-h-28 items-center border-r border-b border-border/20 p-5 text-sm font-bold text-foreground/45 transition-all duration-300 hover:bg-primary hover:text-primary-foreground lg:min-h-36 lg:text-base">{c}</div>)}</div></div></section>; }

function Timeline() { const eras = [["2000s", "BUILDING THE FOUNDATION"], ["2010s", "EXPANDING DIGITAL CAPABILITIES"], ["2020s", "CONNECTED EXPERIENCES"], ["TODAY", "BUILDING WHAT BUSINESSES NEED NEXT"]]; return <section className="bg-warm px-5 py-24 text-ink lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]"><h2 className="section-title">22 YEARS<br />OF EVOLUTION.</h2><div className="mt-16">{eras.map(([era, copy], i) => <Reveal key={era} className="group grid border-t border-ink/20 py-7 transition-colors hover:text-accent lg:grid-cols-[1fr_3fr_auto]"><span className="text-lg font-bold">{era}</span><strong className="mt-3 text-2xl uppercase lg:mt-0 lg:text-4xl">{copy}</strong><span className="mt-4 text-xs font-bold lg:mt-0">0{i + 1}</span></Reveal>)}</div></div></section>; }

function Principles() { const p = [["BUSINESS FIRST", "We begin by understanding how the business operates."], ["PRACTICAL TECHNOLOGY", "Solutions designed to work in real-world environments."], ["LONG-TERM PARTNERSHIP", "Technology evolves. The relationship should evolve with it."], ["ONE DIGITAL ECOSYSTEM", "Web, mobile, software, hosting, marketing and connected environments from one technology partner."]]; return <section className="bg-ink-soft px-5 py-24 text-foreground lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]"><h2 className="section-title">EXPERIENCE CHANGES<br />THE WAY YOU BUILD.</h2><div className="mt-20 space-y-16">{p.map(([t,c],i) => <Reveal key={t} className="grid gap-5 border-t border-border/25 pt-7 lg:grid-cols-[1fr_2fr_2fr]"><span className="text-xs font-bold text-primary">0{i+1}</span><h3 className="text-3xl font-extrabold lg:text-5xl">{t}</h3><p className="max-w-lg text-base leading-7 text-foreground/55">{c}</p></Reveal>)}</div></div></section>; }

const directory: { cat: string; items: [string, string, LucideIcon][] }[] = [
  { cat: "DIGITAL EXPERIENCE", items: [["Web Development", "Fast, scalable digital platforms built around business needs.", MonitorSmartphone], ["Web Design", "Clear, considered experiences for customers and teams.", Sparkles], ["E-Commerce", "Connected commerce from discovery through transaction.", ShoppingBag]] },
  { cat: "MOBILE & SOFTWARE", items: [["Mobile Applications", "Practical mobile products for customers and operations.", Smartphone], ["Software Solutions", "Custom systems aligned with real operational workflows.", Blocks]] },
  { cat: "DIGITAL GROWTH", items: [["SEO", "Search visibility built on a sound digital foundation.", Search], ["E-Marketing", "Connected digital activity supporting sustained growth.", Globe2], ["Online Advertising", "Focused campaigns across customer touchpoints.", BarChart3]] },
  { cat: "INFRASTRUCTURE", items: [["Web Hosting", "Reliable infrastructure for essential digital experiences.", Server], ["IT Consultation", "Practical technology guidance grounded in the business.", Utensils]] },
  { cat: "AI SOLUTIONS", items: [["AI Integration", "Practical AI built into the tools the business already runs on.", Bot], ["Intelligent Automation", "AI-driven workflows that remove repetitive operational work.", Sparkles], ["Reports & Analytics", "Dashboards and reporting that turn data into decisions.", BarChart3]] },
];
const services = directory.flatMap(group => group.items.map(([name, desc, Icon]) => ({ cat: group.cat, name, desc, Icon })));
const hubNodes = services.map((s, i) => {
  const angle = (-90 + (i * 360) / services.length) * (Math.PI / 180);
  return { ...s, x: 50 + 41 * Math.cos(angle), y: 50 + 40 * Math.sin(angle) };
});

function Directory() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : hubNodes[active];
  return <section id="services" className="overflow-hidden bg-warm px-5 py-24 text-ink lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]">
    <p className="eyebrow text-accent">Service directory</p>
    <h2 className="section-title mt-7">CAPABILITY,<br />CONNECTED.</h2>

    {/* Desktop: hub-and-spoke map */}
    <div className="relative mt-12 hidden aspect-[16/10] max-h-[900px] w-full lg:block" onMouseLeave={() => setActive(null)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {hubNodes.map((n, i) => <motion.path key={n.name} d={`M50 50 L${n.x} ${n.y}`} fill="none" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }} className={`transition-[stroke,stroke-width] duration-300 ${active === i ? "stroke-accent [stroke-width:2.5]" : "stroke-ink/20 [stroke-width:1]"}`} />)}
      </svg>
      {hubNodes.map((n, i) => <motion.span key={`pulse-${n.name}`} aria-hidden="true" className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" initial={{ left: "50%", top: "50%", opacity: 0 }} animate={{ left: ["50%", `${n.x}%`], top: ["50%", `${n.y}%`], opacity: [0, 1, 0] }} transition={{ duration: 2.6, delay: (i * 0.37) % 3, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }} />)}

      <div className="absolute top-1/2 left-1/2 flex aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
        <div className="absolute inset-[-14%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-ink/20" />
        <div className="absolute inset-[-5%] rounded-full border border-ink/10" />
        <div className="absolute inset-0 rounded-full bg-warm shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--accent)_45%,transparent)] ring-1 ring-ink/10" />
        <div className="relative flex flex-col items-center px-8 text-center">
          <img src={logoAsset} alt="OtherLogic" className={`w-auto transition-all duration-500 ${current ? "h-16" : "h-28 xl:h-32"}`} />
          {current ? <motion.div key={current.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-4">
            <span className="text-[10px] font-extrabold tracking-[.16em] text-accent">{current.cat}</span>
            <strong className="mt-1 block text-lg leading-tight">{current.name}</strong>
            <p className="mt-2 text-xs leading-5 text-ink/60">{current.desc}</p>
          </motion.div> : <p className="mt-5 text-[10px] font-extrabold tracking-[.16em] text-ink/50">{services.length} CAPABILITIES · ONE PARTNER</p>}
        </div>
      </div>

      {hubNodes.map((n, i) => <motion.a key={n.name} href="#contact" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }} style={{ left: `${n.x}%`, top: `${n.y}%` }} className={`absolute flex w-48 -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border px-4 py-3 shadow-sm transition-colors duration-300 ${active === i ? "border-accent bg-accent text-accent-foreground" : "border-ink/15 bg-warm hover:border-accent"}`}>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${active === i ? "bg-accent-foreground/20" : "bg-primary/15"}`}><n.Icon className={`h-4 w-4 ${active === i ? "text-accent-foreground" : "text-accent"}`} /></span>
        <span className="min-w-0"><span className={`block truncate text-[9px] font-extrabold tracking-[.14em] ${active === i ? "text-accent-foreground/75" : "text-ink/45"}`}>{n.cat}</span><strong className="block text-sm leading-tight">{n.name}</strong></span>
      </motion.a>)}
    </div>

    {/* Mobile / tablet: logo hub with branches */}
    <div className="mt-14 lg:hidden">
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-warm shadow-[0_20px_60px_-25px_color-mix(in_oklab,var(--accent)_50%,transparent)] ring-1 ring-ink/10"><img src={logoAsset} alt="OtherLogic" className="h-20 w-auto" /></div>
      <div className="mx-auto h-10 w-px bg-ink/20" />
      <div className="grid gap-8 md:grid-cols-2">{directory.map(group => <div key={group.cat} className="relative border-l border-ink/20 pl-6">
        <span className="absolute top-1 -left-[5px] h-2.5 w-2.5 rounded-full bg-accent" />
        <h3 className="text-xs font-extrabold tracking-[.14em]">{group.cat}</h3>
        <div className="mt-4 space-y-3">{group.items.map(([name, desc, Icon]) => <a key={name} href="#contact" className="relative flex items-start gap-3 rounded-2xl border border-ink/15 p-4 before:absolute before:top-1/2 before:-left-6 before:h-px before:w-6 before:bg-ink/20"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span><strong className="block">{name}</strong><span className="text-sm text-ink/55">{desc}</span></span></a>)}</div>
      </div>)}</div>
    </div>
  </div></section>;
}

function Global() { return <section className="subtle-grid bg-ink px-5 py-24 text-foreground lg:px-8 lg:py-36"><div className="mx-auto grid max-w-[1480px] gap-16 lg:grid-cols-2 lg:items-center"><div><h2 className="section-title">FROM EGYPT<br /><span className="text-primary">TO THE WORLD.</span></h2><p className="mt-8 max-w-lg text-base leading-7 text-foreground/60">OtherLogic has built experience with businesses across multiple markets and operating environments.</p></div><div className="relative aspect-square max-h-[620px] overflow-hidden rounded-full border border-border/20"><div className="absolute inset-[12%] rounded-full border border-border/20"/><div className="absolute inset-[28%] rounded-full border border-border/20"/><div className="absolute inset-0 flex items-center justify-center"><Globe2 className="h-[55%] w-[55%] stroke-[.4] text-primary/50" /></div>{markets.map((m,i) => <span key={m} className={`absolute text-[9px] font-bold uppercase tracking-[.1em] text-foreground ${["top-[13%] left-[45%]","top-[25%] right-[10%]","top-[44%] right-[6%]","bottom-[25%] right-[12%]","bottom-[12%] left-[44%]","bottom-[23%] left-[9%]","top-[44%] left-[5%]","top-[24%] left-[14%]","top-[9%] right-[28%]"][i]}`}><i className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />{m}</span>)}</div></div></section>; }

function About() { return <><section id="about" className="border-t border-ink/10 bg-warm px-5 py-24 text-ink lg:px-8 lg:py-36"><div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-[1.1fr_.9fr]"><div><p className="eyebrow text-accent">About OtherLogic</p><h2 className="section-title mt-7">22 YEARS OF BUILDING<br />WHAT BUSINESSES NEED.</h2></div><div className="self-end space-y-5 text-base leading-8 text-ink/65"><p>OtherLogic is an Egypt-based integrated solutions company with more than two decades of experience delivering technology and digital solutions for businesses.</p><p>From websites and mobile applications to software solutions, hosting, digital commerce, marketing and connected environments, we combine technical expertise with an understanding of how businesses actually operate.</p><div className="border-l-2 border-accent pl-6 font-bold text-ink">Understand the business.<br />Design the right solution.<br />Build it properly.<br />Keep it evolving.</div></div></div></section><section className="grid bg-secondary text-ink lg:grid-cols-2"><div className="border-b border-ink/15 p-8 lg:border-r lg:border-b-0 lg:p-20"><span className="text-8xl leading-none text-accent">“</span><p className="eyebrow mb-8">Vision</p><blockquote className="text-2xl font-bold leading-10 lg:text-4xl lg:leading-[1.25]">Deliver mature software, digital and technology solutions within the right timeframe, using the right resources and a practical approach to cost.</blockquote></div><div className="p-8 lg:p-20"><span className="text-8xl leading-none text-primary">“</span><p className="eyebrow mb-8">Mission</p><blockquote className="text-2xl font-bold leading-10 lg:text-4xl lg:leading-[1.25]">Provide creative and practical technology solutions, IT consultation and visual communication services that help customers automate work, improve operations and create more efficient businesses.</blockquote></div></section></>; }

function FinalCTA({ onContact }: { onContact: () => void }) { return <section id="contact" className="relative min-h-[90vh] overflow-hidden bg-ink text-foreground"><img src={connectedImage} alt="Restaurant technology connecting the physical and digital operation" loading="lazy" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-40"/><div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_15%,color-mix(in_oklab,var(--ink)_70%,transparent)_65%,transparent)]"/><div className="relative mx-auto flex min-h-[90vh] max-w-[1480px] flex-col justify-center px-5 py-28 lg:px-8"><p className="eyebrow mb-8 text-primary">The next operation</p><h2 className="section-title">YOUR BUSINESS<br />IS ALREADY MOVING.<br />LET’S MAKE<br />THE TECHNOLOGY<br />MOVE WITH IT.</h2><p className="mt-8 text-foreground/65">Tell us what you’re building, improving or connecting.</p><div className="mt-8 flex flex-wrap gap-3"><Button variant="brand" size="xl" onClick={onContact}>Start a conversation <ArrowRight /></Button><Button asChild variant="brandOutline" size="xl"><a href="#solutions">Explore our solutions</a></Button></div><p className="mt-8 text-xs uppercase tracking-[.12em] text-foreground/45">Contact details: to be provided</p></div></section>; }

function Footer() { return <footer className="bg-ink px-5 py-16 text-foreground lg:px-8"><div className="mx-auto max-w-[1480px]"><div className="grid gap-12 border-b border-border/20 pb-14 lg:grid-cols-[1.6fr_1fr_1.3fr_1fr]"><div><Brand /><p className="mt-6 max-w-xs text-sm leading-6 text-foreground/55">Technology that understands the business behind every table.</p><p className="mt-10 text-xs uppercase tracking-[.12em] text-primary">Let’s build what’s next.</p></div><FooterList title="Navigation" items={nav}/><FooterList title="Services" items={["Web Development","Web Design","Mobile Applications","Software Solutions","E-Commerce","Hosting","SEO","Digital Marketing","AI Integration","Reports & Analytics"]}/><FooterList title="Markets" items={markets}/></div><div className="flex flex-col gap-4 pt-6 text-[10px] uppercase tracking-[.12em] text-foreground/35 sm:flex-row sm:justify-between"><span>© 2026 OtherLogic. All rights reserved.</span><span>Contact information placeholder</span></div></div></footer>; }
function FooterList({title,items}:{title:string;items:string[]}) { return <div><h3 className="mb-5 text-xs font-bold text-primary">{title}</h3><ul className="space-y-2 text-xs text-foreground/50">{items.map(i => <li key={i}><a href={title === "Navigation" ? `#${i.toLowerCase().replaceAll(" ", "-")}` : "#contact"} className="transition-colors hover:text-foreground">{i}</a></li>)}</ul></div>; }

export function OtherLogicLanding() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);
  return <><Header onContact={openContact} /><main><Hero onContact={openContact} /><ClientLogos /><Proof /><About /><Positioning /><Ecosystem /><Products /><Journey /><Approach /><ClientWall /><Timeline /><Principles /><Directory /><Global /><FinalCTA onContact={openContact} /></main><Footer /><ContactModal open={contactOpen} onClose={() => setContactOpen(false)} /></>;
}