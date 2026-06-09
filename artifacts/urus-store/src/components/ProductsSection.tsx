import { useState } from "react";
import { ShieldCheck, ShoppingCart, Gift, Target, Crosshair, Cpu, Gamepad2, Swords, Shield, Star, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: 1,
    name: "Aimbot Color",
    game: "Valorant",
    price: 14.99,
    accentColor: "#ef4444",
    gradientFrom: "#3b0000",
    gradientTo: "#0a0b0f",
    badge: "BEST SELLER",
    badgeBg: "#ef4444",
    icon: <Crosshair className="h-10 w-10" />,
    features: ["Detección por color", "FOV ajustable", "Sin driver externo"],
    tagline: "Apunta más rápido que cualquiera",
    status: "ACTIVO",
  },
  {
    id: 2,
    name: "Panel Secure",
    game: "Free Fire",
    price: 9.99,
    accentColor: "#f97316",
    gradientFrom: "#2a1200",
    gradientTo: "#0a0b0f",
    badge: "HOT",
    badgeBg: "#f97316",
    icon: <Shield className="h-10 w-10" />,
    features: ["Aimbots external", "Chams", "Anti-ban avanzado"],
    tagline: "El más seguro del mercado",
    status: "ACTIVO",
  },
  {
    id: 3,
    name: "Panel Android",
    game: "Free Fire Android",
    price: 7.99,
    accentColor: "#22c55e",
    gradientFrom: "#001a0a",
    gradientTo: "#0a0b0f",
    badge: "TOP",
    badgeBg: "#22c55e",
    icon: <Gamepad2 className="h-10 w-10" />,
    features: ["Android 9+ sin root", "Auto-aim", "Radar hack"],
    tagline: "Optimizado para móvil",
    status: "ACTIVO",
  },
  {
    id: 4,
    name: "Panel CSGO",
    game: "CS2",
    price: 19.99,
    accentColor: "#eab308",
    gradientFrom: "#1a1500",
    gradientTo: "#0a0b0f",
    badge: "POPULAR",
    badgeBg: "#eab308",
    icon: <Target className="h-10 w-10" />,
    features: ["Aimbot suave", "Wallhack", "No recoil"],
    tagline: "Domina cada ronda",
    status: "ACTIVO",
  },
  {
    id: 5,
    name: "Panel Full",
    game: "Free Fire",
    price: 24.99,
    accentColor: "#a855f7",
    gradientFrom: "#150025",
    gradientTo: "#0a0b0f",
    badge: "VIP",
    badgeBg: "linear-gradient(135deg,#a855f7,#7c3aed)",
    icon: <Swords className="h-10 w-10" />,
    features: ["Todas las funciones", "Updates VIP", "Soporte prioritario"],
    tagline: "La experiencia completa",
    status: "ACTIVO",
  },
  {
    id: 6,
    name: "Panel PC",
    game: "Free Fire PC",
    price: 12.99,
    accentColor: "#06b6d4",
    gradientFrom: "#001a1f",
    gradientTo: "#0a0b0f",
    badge: "NUEVO",
    badgeBg: "#06b6d4",
    icon: <Cpu className="h-10 w-10" />,
    features: ["Emulador optimizado", "ESP completo", "Sin detección"],
    tagline: "Para jugadores de PC",
    status: "ACTIVO",
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

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, game: product.game, price: product.price, accentColor: c });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "#0a0b0f",
        border: `1px solid ${hovered ? hexToRgba(c, 0.55) : hexToRgba(c, 0.2)}`,
        boxShadow: hovered
          ? `0 0 0 1px ${hexToRgba(c, 0.15)}, 0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${glow}`
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
        style={{ background: c, boxShadow: `0 0 12px ${hexToRgba(c, 0.8)}` }}
      />

      {/* Image / hero area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 180,
          background: `linear-gradient(160deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
        }}
      >
        {/* Diagonal stripe overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              ${hexToRgba(c, 0.04)} 0px,
              ${hexToRgba(c, 0.04)} 1px,
              transparent 1px,
              transparent 18px
            )`,
          }}
        />

        {/* Glow orb behind icon */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 200, height: 200,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${hexToRgba(c, 0.3)} 0%, transparent 70%)`,
            transition: "opacity 0.3s",
            opacity: hovered ? 1 : 0.6,
          }}
        />

        {/* Game label top-left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[10px] font-extrabold uppercase tracking-[0.2em] px-2 py-1 rounded-md"
            style={{ background: hexToRgba(c, 0.15), border: `1px solid ${hexToRgba(c, 0.3)}`, color: c }}
          >
            {product.game}
          </span>
        </div>

        {/* Badge top-right */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-md text-black"
            style={{ background: product.badgeBg }}
          >
            {product.badge}
          </span>
        </div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: 72, height: 72,
              background: hexToRgba(c, 0.12),
              border: `1.5px solid ${hexToRgba(c, 0.35)}`,
              color: c,
              transform: hovered ? "scale(1.1) rotate(6deg)" : "scale(1) rotate(0deg)",
              transition: "transform 0.3s ease",
              boxShadow: hovered ? `0 0 24px ${hexToRgba(c, 0.5)}` : "none",
            }}
          >
            {product.icon}
          </div>
        </div>

        {/* Active status - bottom left */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
          <span
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            {product.status}
          </span>
        </div>

        {/* Stars bottom-right */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-0.5">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="h-2.5 w-2.5" fill="#fbbf24" style={{ color: "#fbbf24" }} />
          ))}
        </div>

        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: "linear-gradient(to top, #0a0b0f, transparent)" }} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <div>
          <h3 className="text-white font-extrabold text-lg uppercase tracking-wide leading-tight">
            {product.name}
          </h3>
          <p className="text-white/40 text-xs mt-0.5 italic">{product.tagline}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" style={{ color: c }} />
              <span className="text-white/65 text-sm">{f}</span>
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${hexToRgba(c, 0.12)}` }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-widest">Precio</p>
              <p
                className="font-extrabold text-2xl leading-none mt-0.5"
                style={{ color: hovered ? c : "white", transition: "color 0.2s" }}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-white/25 text-xs">
              <Zap className="h-3 w-3" />
              Entrega inmediata
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-black transition-all duration-200 hover:scale-[1.02] active:scale-98"
            style={{
              background: added
                ? "linear-gradient(135deg,#22c55e,#16a34a)"
                : c.startsWith("linear") ? c : `linear-gradient(135deg, ${c}, ${c}cc)`,
              boxShadow: added
                ? "0 0 16px rgba(34,197,94,0.4)"
                : `0 0 16px ${hexToRgba(c, 0.35)}`,
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="py-16 px-4 md:px-[8%]">
      {/* Header */}
      <div className="text-center mb-10">
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
        <p className="text-white/35 text-sm mt-3 max-w-sm mx-auto">
          Entrega inmediata · Anti-ban garantizado · Actualizaciones constantes
        </p>
      </div>

      {/* Grid desktop / single col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Free teaser */}
      <div className="mt-6 flex justify-center">
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
