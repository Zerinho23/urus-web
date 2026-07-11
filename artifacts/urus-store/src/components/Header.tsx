import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const YTIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const IGIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.061 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.061 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.061-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.061-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);
const DiscordIcon = ({ size = 18, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 127.14 96.36" fill={color}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

const NAV_ITEMS = [
  { id: "top", label: "Inicio", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { id: "products", label: "Productos", action: () => scrollTo("products") },
  { id: "reviews", label: "Reseñas", action: () => scrollTo("reviews") },
  { id: "features", label: "Características", action: () => scrollTo("features") },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["products", "reviews", "features"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));

    const handleTop = () => { if (window.scrollY < 200) setActiveSection("top"); };
    window.addEventListener("scroll", handleTop);
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleTop); };
  }, []);

  return (
    <header
      className="w-full relative transition-all duration-500 ease-in-out"
      style={{
        background: scrolled ? "rgba(5,6,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(34,211,238,0.08)" : "none",
      }}
    >
      <div className="flex justify-between items-center h-20 px-4 md:px-[10%]">
        <button className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img
            src="/logo.png"
            alt="Urus Cheats"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-white font-bold hidden sm:block" style={{ fontSize: "1.5rem" }}>
            Urus Store
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-white/80">
          {NAV_ITEMS.map(({ id, label, action }) => {
            const active = activeSection === id;
            return (
              <button
                key={label}
                onClick={action}
                className="relative px-3 py-1.5 rounded-md transition-all duration-200"
                style={{ color: active ? "#22d3ee" : undefined }}
              >
                <span className="hover:text-white transition-colors">{label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute left-3 right-3 -bottom-1 h-[2px] rounded-full"
                    style={{ background: "#22d3ee", boxShadow: "0 0 8px #22d3ee" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-0.5">
            {[
              { Icon: YTIcon, href: "#" },
              { Icon: IGIcon, href: "#" },
              { Icon: TikTokIcon, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
              >
                <Icon />
              </a>
            ))}
          </div>

          <a
            href="https://discord.gg/panelurus"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #5865F2, #4752c4)", clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
          >
            <DiscordIcon />
            Discord
          </a>

          <button
            onClick={() => openCart(true)}
            className="relative w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.08)", clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center text-[10px] font-mono font-extrabold text-black"
                style={{ background: "#fbbf24", boxShadow: "0 0 6px rgba(251,191,36,0.6)" }}
              >
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-sm px-4 py-4 flex flex-col gap-2">
          {NAV_ITEMS.map(({ label, action }) => (
            <button
              key={label}
              onClick={() => { action(); setMobileOpen(false); }}
              className="px-3 py-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-all text-left"
            >
              {label}
            </button>
          ))}
          <a
            href="https://discord.gg/panelurus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white mt-2"
            style={{ background: "linear-gradient(135deg, #5865F2, #4752c4)" }}
          >
            <DiscordIcon />
            Únete al Discord
          </a>
        </div>
      )}
    </header>
  );
}
