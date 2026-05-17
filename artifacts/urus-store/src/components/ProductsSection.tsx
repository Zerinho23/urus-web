import { useRef, useState } from "react";
import { ShieldCheck, Zap, ChevronLeft, ChevronRight, ShoppingCart, Gift, Target, Crosshair, Cpu, Gamepad2, Swords, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CARD_W = 240;
const CARD_H = 380;

const products = [
  {
    id: 1, name: "Aimbot Color", game: "Valorant", price: 14.99,
    accentColor: "#ef4444", badge: "BEST",
    icon: <Crosshair className="h-9 w-9" />,
    features: ["Detección por color", "FOV ajustable", "Sin driver externo"],
    tagline: "Apunta más rápido",
  },
  {
    id: 2, name: "Panel Secure", game: "Free Fire", price: 9.99,
    accentColor: "#f97316", badge: "HOT",
    icon: <Shield className="h-9 w-9" />,
    features: ["Aimbots external", "Chams", "Anti-ban avanzado"],
    tagline: "El más seguro",
  },
  {
    id: 3, name: "Panel Android", game: "Free Fire Android", price: 7.99,
    accentColor: "#22c55e", badge: "TOP",
    icon: <Gamepad2 className="h-9 w-9" />,
    features: ["Android 9+ sin root", "Auto-aim", "Radar hack"],
    tagline: "Optimizado para móvil",
  },
  {
    id: 4, name: "Panel CSGO", game: "CS2", price: 19.99,
    accentColor: "#eab308", badge: "BEST",
    icon: <Target className="h-9 w-9" />,
    features: ["Aimbot suave", "Wallhack", "No recoil"],
    tagline: "Domina cada ronda",
  },
  {
    id: 5, name: "Panel Full", game: "Free Fire", price: 24.99,
    accentColor: "#a855f7", badge: "VIP",
    icon: <Swords className="h-9 w-9" />,
    features: ["Todas las funciones", "Updates VIP", "Soporte prioritario"],
    tagline: "La experiencia completa",
  },
  {
    id: 6, name: "Panel PC", game: "Free Fire PC", price: 12.99,
    accentColor: "#06b6d4", badge: "NEW",
    icon: <Cpu className="h-9 w-9" />,
    features: ["Emulador optimizado", "ESP completo", "Sin detección"],
    tagline: "Para jugadores de PC",
  },
];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const c = product.accentColor;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, game: product.game, price: product.price, accentColor: c });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl transition-all duration-300 cursor-default"
      style={{
        width: CARD_W, height: CARD_H,
        background: "#0a0b0f",
        border: `1px solid ${hovered ? c + "99" : c + "30"}`,
        boxShadow: hovered ? `0 0 28px ${hexToRgba(c, 0.18)}, 0 16px 40px rgba(0,0,0,0.7)` : "0 2px 12px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-6px)" : "none",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image hero area (fixed 140px) ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 140, flexShrink: 0, background: `linear-gradient(135deg, ${hexToRgba(c, 0.14)} 0%, #0a0b0f 100%)` }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${hexToRgba(c, 0.06)} 1px, transparent 1px), linear-gradient(90deg, ${hexToRgba(c, 0.06)} 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }} />
        {/* Glow blob */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full blur-3xl" style={{ background: hexToRgba(c, 0.22) }} />
        </div>
        {/* Hex outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice">
          <polygon points="120,18 154,38 154,78 120,98 86,78 86,38" fill="none" stroke={c} strokeWidth="0.8" opacity="0.18" />
          <polygon points="120,30 146,45 146,75 120,90 94,75 94,45" fill="none" stroke={c} strokeWidth="0.4" opacity="0.1" />
        </svg>
        {/* Icon box */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-xl transition-all duration-300"
            style={{
              width: 56, height: 56,
              background: hexToRgba(c, 0.12),
              border: `1.5px solid ${hexToRgba(c, 0.3)}`,
              color: c,
              transform: hovered ? "scale(1.12) rotate(4deg)" : "scale(1)",
              boxShadow: hovered ? `0 0 20px ${hexToRgba(c, 0.4)}` : "none",
            }}>
            {product.icon}
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: "linear-gradient(to top, #0a0b0f, transparent)" }} />
        {/* Badge top-right */}
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-black" style={{ background: c, boxShadow: `0 0 8px ${hexToRgba(c, 0.5)}` }}>
            {product.badge}
          </span>
        </div>
        {/* Status badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex gap-1">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Seguro
          </span>
        </div>
      </div>

      {/* ── Content area (fills remaining space) ── */}
      <div className="flex flex-col flex-1 p-3.5 gap-2 overflow-hidden">
        {/* Title block — fixed height */}
        <div style={{ minHeight: 46 }}>
          <p className="text-[9px] font-extrabold uppercase tracking-widest leading-none" style={{ color: c }}>{product.game}</p>
          <h3 className="text-white font-extrabold text-sm uppercase tracking-wide leading-tight mt-0.5 line-clamp-1">{product.name}</h3>
          <p className="text-white/35 text-[10px] mt-0.5 leading-tight line-clamp-1 italic">{product.tagline}</p>
        </div>

        {/* Features — always exactly 3 items */}
        <ul className="flex flex-col gap-1.5" style={{ flex: "1 0 auto" }}>
          {products.find(p => p.id === product.id)!.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 shrink-0" style={{ color: c }} />
              <span className="text-white/60 text-[11px] leading-tight line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* Footer — always pinned to bottom */}
        <div className="flex items-center justify-between pt-2.5 mt-auto" style={{ borderTop: `1px solid ${hexToRgba(c, 0.15)}` }}>
          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-widest leading-none">Precio</p>
            <p className="font-extrabold text-lg leading-tight mt-0.5" style={{ color: hovered ? c : "white" }}>
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-extrabold transition-all duration-200 hover:scale-105 active:scale-95 text-black"
            style={{
              background: added ? "linear-gradient(135deg,#22c55e,#16a34a)" : `linear-gradient(135deg,${c},${c}cc)`,
              boxShadow: added ? "0 0 12px rgba(34,197,94,0.5)" : `0 0 10px ${hexToRgba(c, 0.4)}`,
              minWidth: 90,
            }}
          >
            <ShoppingCart className="h-3 w-3 shrink-0" />
            {added ? "¡Listo!" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -(CARD_W + 12) : CARD_W + 12, behavior: "smooth" });
  };
  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 4);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  return (
    <section id="products" className="py-14">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(6,182,212,0.8)" }}>
          Nuestros Productos
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Elige tu{" "}
          <span style={{ color: "#06b6d4", textShadow: "0 0 24px rgba(6,182,212,0.4)" }}>herramienta</span>
        </h2>
        <p className="text-white/35 text-sm mt-2 max-w-xs mx-auto">
          Entrega inmediata · Anti-ban garantizado · Updates constantes
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {canLeft && (
          <button onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 border border-white/15 text-white flex items-center justify-center hover:bg-black transition-all"
            style={{ backdropFilter: "blur(8px)" }}>
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-3 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
            paddingLeft: 16, paddingRight: 16,
            paddingBottom: 12,
            alignItems: "flex-start",
          }}
        >
          {products.map((p) => (
            <div key={p.id} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
              <ProductCard product={p} />
            </div>
          ))}

          {/* Free teaser — same height */}
          <div style={{ scrollSnapAlign: "start", flexShrink: 0, width: 160, height: CARD_H }}>
            <button
              onClick={() => document.getElementById("free-products")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(251,191,36,0.04)", border: "1.5px dashed rgba(251,191,36,0.22)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.28)" }}>
                <Gift className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-yellow-400 font-extrabold text-sm">Gratis</p>
                <p className="text-white/30 text-[11px] mt-0.5">3 días de prueba</p>
              </div>
              <span className="text-yellow-400/40 text-xs">↓ Ver más</span>
            </button>
          </div>
        </div>

        {canRight && (
          <button onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 border border-white/15 text-white flex items-center justify-center hover:bg-black transition-all"
            style={{ backdropFilter: "blur(8px)" }}>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        <div className="absolute inset-y-0 left-0 w-5 pointer-events-none" style={{ background: "linear-gradient(90deg,#050608,transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-5 pointer-events-none" style={{ background: "linear-gradient(270deg,#050608,transparent)" }} />
      </div>
    </section>
  );
}
