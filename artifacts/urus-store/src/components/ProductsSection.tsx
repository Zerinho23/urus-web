import { useState } from "react";
import {
  ShieldCheck, ShoppingCart, Gift, Zap, Cpu, Shield,
  Smartphone, Monitor, Wifi, Eye, Lock, Star, Flame, Crown, Swords
} from "lucide-react";
import { useCart } from "@/context/CartContext";

type Category = "all" | "freefire" | "bloodstrike";

const products = [
  // ──── FREE FIRE ────
  {
    id: 1,
    name: "Panel Xtreme",
    game: "Free Fire",
    category: "freefire" as const,
    price: 19.99,
    accentColor: "#f97316",
    gradientFrom: "#2a1200",
    gradientTo: "#0a0b0f",
    badge: "TOP",
    badgeBg: "#f97316",
    icon: <Flame className="h-9 w-9" />,
    features: ["Aimbot avanzado", "Wallhack ESP", "Anti-ban activo"],
    tagline: "El panel más completo de Free Fire",
  },
  {
    id: 2,
    name: "Panel Supreme",
    game: "Free Fire",
    category: "freefire" as const,
    price: 14.99,
    accentColor: "#a855f7",
    gradientFrom: "#150025",
    gradientTo: "#0a0b0f",
    badge: "POPULAR",
    badgeBg: "linear-gradient(135deg,#a855f7,#7c3aed)",
    icon: <Crown className="h-9 w-9" />,
    features: ["Aim auto", "Chams incluidos", "Updates semanales"],
    tagline: "Experiencia premium garantizada",
  },
  {
    id: 3,
    name: "Panel Básico",
    game: "Free Fire",
    category: "freefire" as const,
    price: 7.99,
    accentColor: "#22c55e",
    gradientFrom: "#001a0a",
    gradientTo: "#0a0b0f",
    badge: "STARTER",
    badgeBg: "#22c55e",
    icon: <Shield className="h-9 w-9" />,
    features: ["Funciones esenciales", "Fácil de usar", "Soporte incluido"],
    tagline: "Ideal para empezar",
  },
  {
    id: 4,
    name: "Emulador Competitivo",
    game: "Free Fire PC",
    category: "freefire" as const,
    price: 12.99,
    accentColor: "#06b6d4",
    gradientFrom: "#001a1f",
    gradientTo: "#0a0b0f",
    badge: "PC",
    badgeBg: "#06b6d4",
    icon: <Monitor className="h-9 w-9" />,
    features: ["Optimizado para emulador", "Sin detección en PC", "Alta FPS estable"],
    tagline: "Para jugadores de escritorio",
  },
  {
    id: 5,
    name: "Chams ESP",
    game: "Free Fire",
    category: "freefire" as const,
    price: 9.99,
    accentColor: "#eab308",
    gradientFrom: "#1a1500",
    gradientTo: "#0a0b0f",
    badge: "VISUAL",
    badgeBg: "#eab308",
    icon: <Eye className="h-9 w-9" />,
    features: ["Ver enemigos a través de paredes", "ESP completo", "Ajustes de color"],
    tagline: "Visión total del mapa",
  },
  {
    id: 6,
    name: "Bypass APK",
    game: "Free Fire",
    category: "freefire" as const,
    price: 5.99,
    accentColor: "#ef4444",
    gradientFrom: "#3b0000",
    gradientTo: "#0a0b0f",
    badge: "BYPASS",
    badgeBg: "#ef4444",
    icon: <Lock className="h-9 w-9" />,
    features: ["Bypass de seguridad APK", "Sin ban garantizado", "Fácil instalación"],
    tagline: "Sortea el sistema anti-cheat",
  },
  {
    id: 7,
    name: "Bypass UID",
    game: "Free Fire",
    category: "freefire" as const,
    price: 5.99,
    accentColor: "#f43f5e",
    gradientFrom: "#2a0010",
    gradientTo: "#0a0b0f",
    badge: "BYPASS",
    badgeBg: "#f43f5e",
    icon: <Wifi className="h-9 w-9" />,
    features: ["Protección por UID", "Anti-reporte", "Compatible con todos los paneles"],
    tagline: "Tu cuenta protegida",
  },
  {
    id: 8,
    name: "Bypass Tela",
    game: "Free Fire",
    category: "freefire" as const,
    price: 4.99,
    accentColor: "#fb923c",
    gradientFrom: "#1a0a00",
    gradientTo: "#0a0b0f",
    badge: "BYPASS",
    badgeBg: "#fb923c",
    icon: <Shield className="h-9 w-9" />,
    features: ["Bypass de pantalla", "Sin detección visual", "Actualizado"],
    tagline: "Jugá sin preocupaciones",
  },
  {
    id: 9,
    name: "Bypass Panel",
    game: "Free Fire",
    category: "freefire" as const,
    price: 6.99,
    accentColor: "#c084fc",
    gradientFrom: "#1a0030",
    gradientTo: "#0a0b0f",
    badge: "BYPASS",
    badgeBg: "#c084fc",
    icon: <Cpu className="h-9 w-9" />,
    features: ["Bypass para paneles externos", "Multi-compatible", "Sin logs"],
    tagline: "Acceso sin restricciones",
  },
  {
    id: 10,
    name: "Panel iOS",
    game: "Free Fire iOS",
    category: "freefire" as const,
    price: 9.99,
    accentColor: "#a855f7",
    gradientFrom: "#150025",
    gradientTo: "#0a0b0f",
    badge: "iOS",
    badgeBg: "linear-gradient(135deg,#a855f7,#ec4899)",
    icon: <Smartphone className="h-9 w-9" />,
    image: "/panel-ios.png",
    features: ["Sin jailbreak requerido", "Aimbot suave", "ESP incluido"],
    tagline: "Exclusivo para iPhone/iPad",
  },
  // ──── BLOODSTRIKE ────
  {
    id: 11,
    name: "Panel Blood Supreme",
    game: "BloodStrike",
    category: "bloodstrike" as const,
    price: 17.99,
    accentColor: "#dc2626",
    gradientFrom: "#2d0000",
    gradientTo: "#0a0b0f",
    badge: "SUPREME",
    badgeBg: "linear-gradient(135deg,#dc2626,#7f1d1d)",
    icon: <Swords className="h-9 w-9" />,
    features: ["Aimbot para BloodStrike", "Wallhack ESP", "Anti-ban avanzado"],
    tagline: "Domina BloodStrike al máximo",
  },
  {
    id: 12,
    name: "Panel Blood Private",
    game: "BloodStrike",
    category: "bloodstrike" as const,
    price: 24.99,
    accentColor: "#b91c1c",
    gradientFrom: "#1a0000",
    gradientTo: "#0a0b0f",
    badge: "PRIVATE",
    badgeBg: "linear-gradient(135deg,#991b1b,#450a0a)",
    icon: <Crown className="h-9 w-9" />,
    features: ["Acceso privado exclusivo", "Updates prioritarios", "Soporte 24/7"],
    tagline: "Nivel máximo de privacidad",
  },
];

function hexToRgba(hex: string, alpha: number) {
  if (hex.startsWith("linear")) return `rgba(168,85,247,${alpha})`;
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
  const glow = hexToRgba(c, 0.25);
  const hasImage = "image" in product && product.image;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, game: product.game, price: product.price, accentColor: c });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "#0a0b0f",
        border: `1px solid ${hovered ? hexToRgba(c, 0.55) : hexToRgba(c, 0.18)}`,
        boxShadow: hovered
          ? `0 0 0 1px ${hexToRgba(c, 0.12)}, 0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${glow}`
          : "0 4px 24px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ background: c, boxShadow: `0 0 10px ${hexToRgba(c, 0.7)}` }}
      />

      {/* Image / hero area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 160,
          background: `linear-gradient(160deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
        }}
      >
        {hasImage ? (
          /* Real product image */
          <>
            <img
              src={(product as typeof products[0] & { image: string }).image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}
            />
            {/* Darken overlay for text legibility */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0b0f 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${hexToRgba(c, 0.12)} 0%, transparent 60%)` }} />
          </>
        ) : (
          /* Generic icon area */
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, ${hexToRgba(c, 0.04)} 0px, ${hexToRgba(c, 0.04)} 1px, transparent 1px, transparent 18px)`,
              }}
            />
            <div
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: 180, height: 180,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${hexToRgba(c, 0.28)} 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0.6,
                transition: "opacity 0.3s",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center rounded-2xl"
                style={{
                  width: 64, height: 64,
                  background: hexToRgba(c, 0.1),
                  border: `1.5px solid ${hexToRgba(c, 0.3)}`,
                  color: c,
                  transform: hovered ? "scale(1.12) rotate(5deg)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  boxShadow: hovered ? `0 0 20px ${hexToRgba(c, 0.5)}` : "none",
                }}
              >
                {product.icon}
              </div>
            </div>
          </>
        )}

        {/* Game tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-extrabold uppercase tracking-[0.18em] px-2 py-1 rounded-md"
            style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${hexToRgba(c, 0.4)}`, color: c, backdropFilter: "blur(4px)" }}
          >
            {product.game}
          </span>
        </div>

        {/* Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-md text-white"
            style={{ background: product.badgeBg, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            {product.badge}
          </span>
        </div>

        {/* Active status */}
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80", backdropFilter: "blur(4px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            ACTIVO
          </span>
        </div>

        {/* Stars */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-0.5">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="h-2 w-2" fill="#fbbf24" style={{ color: "#fbbf24" }} />
          ))}
        </div>

        {!hasImage && (
          <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: "linear-gradient(to top, #0a0b0f, transparent)" }} />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="text-white font-extrabold text-base uppercase tracking-wide leading-tight">
            {product.name}
          </h3>
          <p className="text-white/38 text-xs mt-0.5 italic">{product.tagline}</p>
        </div>

        <ul className="flex flex-col gap-1.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 shrink-0" style={{ color: c }} />
              <span className="text-white/60 text-xs">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-3" style={{ borderTop: `1px solid ${hexToRgba(c, 0.1)}` }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/25 text-[9px] uppercase tracking-widest">Precio</p>
              <p
                className="font-extrabold text-xl leading-none mt-0.5"
                style={{ color: hovered ? c : "white", transition: "color 0.2s" }}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-white/22 text-[10px]">
              <Zap className="h-3 w-3" />
              Inmediato
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs text-black transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{
              background: added
                ? "linear-gradient(135deg,#22c55e,#16a34a)"
                : c.startsWith("linear") ? c : `linear-gradient(135deg, ${c}, ${c}cc)`,
              boxShadow: added
                ? "0 0 14px rgba(34,197,94,0.4)"
                : `0 0 14px ${hexToRgba(c, 0.35)}`,
              color: "#000",
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {added ? "✓ Agregado" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES: { key: Category; label: string; count: number }[] = [
  { key: "all", label: "Todos", count: products.length },
  { key: "freefire", label: "Free Fire", count: products.filter(p => p.category === "freefire").length },
  { key: "bloodstrike", label: "BloodStrike", count: products.filter(p => p.category === "bloodstrike").length },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered = activeTab === "all" ? products : products.filter(p => p.category === activeTab);

  return (
    <section id="products" className="py-16 px-4 md:px-[6%]">
      {/* Header */}
      <div className="text-center mb-8">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
          style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}
        >
          <Zap className="h-3 w-3" />
          Nuestros Productos
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Elige tu{" "}
          <span style={{ color: "#06b6d4", textShadow: "0 0 30px rgba(6,182,212,0.5)" }}>herramienta</span>
        </h2>
        <p className="text-white/35 text-sm mt-2 max-w-sm mx-auto">
          Entrega inmediata · Anti-ban garantizado · Actualizaciones constantes
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {CATEGORIES.map(({ key, label, count }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: active ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.04)",
                border: active ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: active ? "#22d3ee" : "rgba(255,255,255,0.45)",
                boxShadow: active ? "0 0 16px rgba(6,182,212,0.2)" : "none",
              }}
            >
              {label}
              <span
                className="inline-flex items-center justify-center text-[10px] rounded-full px-1.5 py-0.5 font-black"
                style={{
                  background: active ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.07)",
                  color: active ? "#22d3ee" : "rgba(255,255,255,0.35)",
                  minWidth: 20,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Free teaser */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => document.getElementById("free-products")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: "rgba(251,191,36,0.06)",
            border: "1.5px dashed rgba(251,191,36,0.3)",
            color: "#fbbf24",
          }}
        >
          <Gift className="h-4 w-4" />
          ¿Sin presupuesto? Ver productos gratis →
        </button>
      </div>
    </section>
  );
}
