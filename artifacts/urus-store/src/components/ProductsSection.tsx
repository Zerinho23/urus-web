import { useState } from "react";
import {
  ShieldCheck, ShoppingCart, Gift, Zap, Cpu, Shield,
  Smartphone, Monitor, Wifi, Eye, Lock, Star, Flame, Crown, Swords, ChevronDown
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "freefire" | "bloodstrike";
interface Plan { duration: string; price: number; }

const products = [
  { id: 1, name: "Panel Xtreme", game: "Free Fire", category: "freefire" as const, accentColor: "#f97316", gradientFrom: "#2a1200", gradientTo: "#0a0b0f", badge: "TOP", badgeBg: "#f97316", icon: <Flame className="h-9 w-9" />, features: ["Aimbot avanzado", "Wallhack ESP", "Anti-ban activo"], tagline: "El panel más completo de Free Fire", plans: [{ duration: "7 días", price: 8 }, { duration: "14 días", price: 12 }, { duration: "30 días", price: 20 }, { duration: "60 días", price: 30 }, { duration: "90 días", price: 45 }, { duration: "365 días", price: 90 }] as Plan[] },
  { id: 2, name: "Panel Supreme", game: "Free Fire", category: "freefire" as const, accentColor: "#a855f7", gradientFrom: "#150025", gradientTo: "#0a0b0f", badge: "POPULAR", badgeBg: "linear-gradient(135deg,#a855f7,#7c3aed)", icon: <Crown className="h-9 w-9" />, features: ["Aim auto", "Chams incluidos", "Updates semanales"], tagline: "Experiencia premium garantizada", plans: [{ duration: "7 días", price: 8 }, { duration: "14 días", price: 12 }, { duration: "30 días", price: 20 }, { duration: "60 días", price: 30 }, { duration: "90 días", price: 45 }, { duration: "365 días", price: 90 }] as Plan[] },
  { id: 3, name: "Panel Básico", game: "Free Fire", category: "freefire" as const, accentColor: "#22c55e", gradientFrom: "#001a0a", gradientTo: "#0a0b0f", badge: "STARTER", badgeBg: "#22c55e", icon: <Shield className="h-9 w-9" />, features: ["Aimbot external", "Menu chams pie 64", "Fake lag y teleport"], tagline: "Ideal para empezar", plans: [{ duration: "3 días", price: 2 }, { duration: "7 días", price: 5 }, { duration: "14 días", price: 9 }, { duration: "30 días", price: 10 }, { duration: "60 días", price: 18 }] as Plan[] },
  { id: 4, name: "Emulador Competitivo", game: "Free Fire PC", category: "freefire" as const, accentColor: "#06b6d4", gradientFrom: "#001a1f", gradientTo: "#0a0b0f", badge: "PC", badgeBg: "#06b6d4", icon: <Monitor className="h-9 w-9" />, image: "/emulador-competitivo.png", features: ["100% indetectable", "Compatible Windows 10/11", "Soporte 24/7"], tagline: "Sin rastros en Kellerss 2.0 y ProcessHacker", plans: [{ duration: "1 mes", price: 50 }, { duration: "2 meses", price: 70 }] as Plan[] },
  { id: 5, name: "Chams ESP", game: "Free Fire", category: "freefire" as const, accentColor: "#eab308", gradientFrom: "#1a1500", gradientTo: "#0a0b0f", badge: "VISUAL", badgeBg: "#eab308", icon: <Eye className="h-9 w-9" />, features: ["Panel Chams & ESP", "Visión total del mapa", "Ajustes de color"], tagline: "Ve a todos los enemigos", plans: [{ duration: "1 día", price: 2 }, { duration: "3 días", price: 3 }, { duration: "7 días", price: 6 }, { duration: "15 días", price: 7 }, { duration: "1 mes", price: 10 }] as Plan[] },
  { id: 6, name: "Bypass APK", game: "Free Fire", category: "freefire" as const, accentColor: "#ef4444", gradientFrom: "#3b0000", gradientTo: "#0a0b0f", badge: "BYPASS", badgeBg: "#ef4444", icon: <Lock className="h-9 w-9" />, features: ["Bluestacks 5 & MSI 5", "Sin ban garantizado", "FF Normal"], tagline: "Sortea el sistema anti-cheat", plans: [{ duration: "1 día", price: 4 }, { duration: "7 días", price: 6 }, { duration: "30 días", price: 10 }, { duration: "90 días", price: 25 }, { duration: "180 días", price: 45 }, { duration: "360 días", price: 80 }] as Plan[] },
  { id: 7, name: "Bypass UID", game: "Free Fire", category: "freefire" as const, accentColor: "#f43f5e", gradientFrom: "#2a0010", gradientTo: "#0a0b0f", badge: "BYPASS", badgeBg: "#f43f5e", icon: <Wifi className="h-9 w-9" />, features: ["Bluestacks 5, MSI 5, MEMUPlay", "Anti-reporte", "FF Normal / FF Max"], tagline: "Tu cuenta protegida por UID", plans: [{ duration: "7 días", price: 6 }, { duration: "30 días", price: 10 }, { duration: "90 días", price: 25 }, { duration: "180 días", price: 45 }, { duration: "360 días", price: 80 }] as Plan[] },
  { id: 8, name: "Bypass Tela", game: "Free Fire", category: "freefire" as const, accentColor: "#fb923c", gradientFrom: "#1a0a00", gradientTo: "#0a0b0f", badge: "BYPASS", badgeBg: "#fb923c", icon: <Shield className="h-9 w-9" />, features: ["Compatible Bluestacks", "FF Tela", "Actualizado"], tagline: "Bypass exclusivo para FF Tela", plans: [{ duration: "7 días", price: 6 }, { duration: "30 días", price: 10 }] as Plan[] },
  { id: 9, name: "Bypass Panel", game: "Free Fire", category: "freefire" as const, accentColor: "#c084fc", gradientFrom: "#1a0030", gradientTo: "#0a0b0f", badge: "COMBO", badgeBg: "#c084fc", icon: <Cpu className="h-9 w-9" />, features: ["Combo Bypass + Panel", "Bluestacks 5 & MSI 5", "FF Normal & FF Tela"], tagline: "Combo completo: bypass y panel", plans: [{ duration: "7 días", price: 13 }, { duration: "30 días", price: 25 }, { duration: "90 días", price: 50 }, { duration: "180 días", price: 80 }, { duration: "360 días", price: 100 }] as Plan[] },
  { id: 10, name: "Panel iOS", game: "Free Fire iOS", category: "freefire" as const, accentColor: "#a855f7", gradientFrom: "#150025", gradientTo: "#0a0b0f", badge: "iOS", badgeBg: "linear-gradient(135deg,#a855f7,#ec4899)", icon: <Smartphone className="h-9 w-9" />, image: "/panel-ios.png", features: ["Sin jailbreak requerido", "Aimbot suave", "ESP incluido"], tagline: "Exclusivo para iPhone/iPad", plans: [{ duration: "1 día", price: 5 }, { duration: "7 días", price: 15 }, { duration: "15 días", price: 28 }, { duration: "30 días", price: 32 }, { duration: "60 días", price: 48 }] as Plan[] },
  { id: 13, name: "Panel Undetected", game: "Free Fire", category: "freefire" as const, accentColor: "#06b6d4", gradientFrom: "#001a1f", gradientTo: "#0a0b0f", badge: "UNDETECTED", badgeBg: "linear-gradient(135deg,#06b6d4,#0e7490)", icon: <ShieldCheck className="h-9 w-9" />, image: "/panel-undetected.png", features: ["100% indetectable", "Anti-ban activo", "Actualizaciones constantes"], tagline: "El panel que el anti-cheat no puede ver", plans: [{ duration: "7 días", price: 6 }, { duration: "15 días", price: 13 }, { duration: "30 días", price: 20 }] as Plan[] },
  { id: 11, name: "Panel Blood Supreme", game: "BloodStrike", category: "bloodstrike" as const, accentColor: "#dc2626", gradientFrom: "#2d0000", gradientTo: "#0a0b0f", badge: "SUPREME", badgeBg: "linear-gradient(135deg,#dc2626,#7f1d1d)", icon: <Swords className="h-9 w-9" />, features: ["Aimbot para BloodStrike", "Wallhack ESP", "Funciones 100% seguras"], tagline: "Domina BloodStrike al máximo", plans: [{ duration: "7 días", price: 8 }, { duration: "15 días", price: 12 }, { duration: "30 días", price: 18 }] as Plan[] },
  { id: 12, name: "Panel Blood Private", game: "BloodStrike", category: "bloodstrike" as const, accentColor: "#b91c1c", gradientFrom: "#1a0000", gradientTo: "#0a0b0f", badge: "PRIVATE", badgeBg: "linear-gradient(135deg,#991b1b,#450a0a)", icon: <Crown className="h-9 w-9" />, features: ["Acceso privado exclusivo", "Updates prioritarios", "Funciones 100% seguras"], tagline: "Nivel máximo de privacidad", plans: [{ duration: "7 días", price: 10 }, { duration: "14 días", price: 15 }, { duration: "30 días", price: 20 }] as Plan[] },
];

function hexToRgba(hex: string, alpha: number) {
  if (hex.startsWith("linear")) return `rgba(168,85,247,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function parseDays(duration: string): number {
  const n = parseInt(duration, 10) || 1;
  if (duration.includes("año")) return n * 365;
  if (duration.includes("mes")) return n * 30;
  return n;
}

function bestValueIndex(plans: Plan[]): number {
  let best = 0;
  let bestRate = Infinity;
  plans.forEach((p, i) => {
    const rate = p.price / parseDays(p.duration);
    if (rate < bestRate) { bestRate = rate; best = i; }
  });
  return best;
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showPlans, setShowPlans] = useState(false);
  const { addItem } = useCart();
  const c = product.accentColor;
  const glow = hexToRgba(c, 0.25);
  const hasImage = "image" in product && product.image;
  const plan = product.plans[selectedPlan];
  const bestIdx = bestValueIndex(product.plans);

  const handleAdd = () => {
    addItem({ id: product.id, name: `${product.name} — ${plan.duration}`, game: product.game, price: plan.price, accentColor: c });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const corner = (pos: string) => (
    <span className="absolute w-3.5 h-3.5 pointer-events-none z-20 transition-opacity duration-300"
      style={{
        opacity: hovered ? 1 : 0,
        borderColor: c,
        ...(pos === "tl" ? { top: 6, left: 6, borderTop: "2px solid", borderLeft: "2px solid" } : {}),
        ...(pos === "tr" ? { top: 6, right: 6, borderTop: "2px solid", borderRight: "2px solid" } : {}),
        ...(pos === "bl" ? { bottom: 6, left: 6, borderBottom: "2px solid", borderLeft: "2px solid" } : {}),
        ...(pos === "br" ? { bottom: 6, right: 6, borderBottom: "2px solid", borderRight: "2px solid" } : {}),
      }} />
  );

  return (
    <div className="relative flex flex-col overflow-hidden font-mono"
      style={{ background: "#0a0b0f", clipPath: "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)", border: `1px solid ${hovered ? hexToRgba(c, 0.55) : hexToRgba(c, 0.18)}`, boxShadow: hovered ? `0 0 0 1px ${hexToRgba(c, 0.12)}, 0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${glow}` : "0 4px 24px rgba(0,0,0,0.5)", transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {corner("tl")}{corner("tr")}{corner("bl")}{corner("br")}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: c, boxShadow: `0 0 10px ${hexToRgba(c, 0.7)}` }} />
      {hovered && (
        <div className="absolute left-0 right-0 h-10 pointer-events-none z-20" style={{ background: `linear-gradient(to bottom, transparent, ${hexToRgba(c, 0.12)}, transparent)`, animation: "scan-sweep 1.4s ease-in-out infinite" }} />
      )}
      <div className="relative overflow-hidden" style={{ height: 160, background: `linear-gradient(160deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)` }}>
        {hasImage ? (
          <>
            <img src={(product as typeof products[0] & { image: string }).image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" style={{ transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0b0f 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${hexToRgba(c, 0.12)} 0%, transparent 60%)` }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(-45deg, ${hexToRgba(c, 0.04)} 0px, ${hexToRgba(c, 0.04)} 1px, transparent 1px, transparent 18px)` }} />
            <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ width: 180, height: 180, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${hexToRgba(c, 0.28)} 0%, transparent 70%)`, opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center rounded-2xl" style={{ width: 64, height: 64, background: hexToRgba(c, 0.1), border: `1.5px solid ${hexToRgba(c, 0.3)}`, color: c, transform: hovered ? "scale(1.12) rotate(5deg)" : "scale(1)", transition: "transform 0.3s ease", boxShadow: hovered ? `0 0 20px ${hexToRgba(c, 0.5)}` : "none" }}>
                {product.icon}
              </div>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] px-2 py-1" style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${hexToRgba(c, 0.4)}`, color: c, backdropFilter: "blur(4px)", clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}>{product.game}</span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[9px] font-extrabold tracking-widest px-2.5 py-1 text-white" style={{ background: product.badgeBg, textShadow: "0 1px 3px rgba(0,0,0,0.5)", clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 30%)" }}>{product.badge}</span>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80", backdropFilter: "blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />ACTIVO
          </span>
        </div>
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-0.5">
          {[1,2,3,4,5].map(i => <Star key={i} className="h-2 w-2" fill="#fbbf24" style={{ color: "#fbbf24" }} />)}
        </div>
        {!hasImage && <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: "linear-gradient(to top, #0a0b0f, transparent)" }} />}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="text-white font-extrabold text-base uppercase tracking-wide leading-tight">{product.name}</h3>
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
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/25 text-[9px] uppercase tracking-widest">Desde</p>
              <div className="flex items-baseline gap-1">
                <p className="font-extrabold text-xl leading-none mt-0.5" style={{ color: hovered ? c : "white", transition: "color 0.2s" }}>[ ${plan.price} ]</p>
                <span className="text-white/30 text-[10px]">USD</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/22 text-[10px] uppercase tracking-wider">
              <Zap className="h-3 w-3" />Inmediato
            </div>
          </div>
          <button onClick={() => setShowPlans(!showPlans)} className="w-full flex items-center justify-between px-3 py-1.5 mb-2 text-[11px] font-semibold transition-all"
            style={{ background: hexToRgba(c, 0.08), border: `1px solid ${hexToRgba(c, 0.2)}`, color: c }}>
            <span className="flex items-center gap-1.5">
              {plan.duration} — ${plan.price} USD
              {selectedPlan === bestIdx && <span className="text-[8px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: hexToRgba(c, 0.25), color: c }}>Mejor precio</span>}
            </span>
            <ChevronDown className="h-3 w-3 transition-transform" style={{ transform: showPlans ? "rotate(180deg)" : "rotate(0)" }} />
          </button>
          {showPlans && (
            <div className="rounded-xl overflow-hidden mb-2" style={{ border: `1px solid ${hexToRgba(c, 0.2)}`, background: "rgba(0,0,0,0.5)" }}>
              {product.plans.map((p, i) => (
                <button key={i} onClick={() => { setSelectedPlan(i); setShowPlans(false); }} className="w-full flex items-center justify-between px-3 py-2 text-[11px] transition-all"
                  style={{ background: selectedPlan === i ? hexToRgba(c, 0.15) : "transparent", borderBottom: i < product.plans.length - 1 ? `1px solid ${hexToRgba(c, 0.1)}` : "none", color: selectedPlan === i ? c : "rgba(255,255,255,0.5)" }}>
                  <span className="font-semibold flex items-center gap-1.5">
                    {p.duration}
                    {i === bestIdx && <Star className="h-2.5 w-2.5" fill={c} style={{ color: c }} />}
                  </span>
                  <span className="font-extrabold">${p.price} USD</span>
                </button>
              ))}
            </div>
          )}
          <button onClick={handleAdd} className="w-full flex items-center justify-center gap-2 py-2.5 font-bold text-xs text-black uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)", background: added ? "linear-gradient(135deg,#22c55e,#16a34a)" : c.startsWith("linear") ? c : `linear-gradient(135deg, ${c}, ${c}cc)`, boxShadow: added ? "0 0 14px rgba(34,197,94,0.4)" : `0 0 14px ${hexToRgba(c, 0.35)}`, color: "#000" }}>
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
      <Reveal className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
          style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}>
          <Zap className="h-3 w-3" />Nuestros Productos
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Elige tu{" "}<span style={{ color: "#06b6d4", textShadow: "0 0 30px rgba(6,182,212,0.5)" }}>herramienta</span>
        </h2>
        <p className="text-white/35 text-sm mt-2 max-w-sm mx-auto">Entrega inmediata · Anti-ban garantizado · Actualizaciones constantes</p>
      </Reveal>
      <Reveal delay={0.1} className="flex justify-center gap-2 mb-8 flex-wrap">
        {CATEGORIES.map(({ key, label, count }) => {
          const active = activeTab === key;
          return (
            <button key={key} onClick={() => setActiveTab(key)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide font-mono transition-all duration-200 hover:scale-[1.03] active:scale-95"
              style={{ background: active ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.04)", border: active ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.08)", color: active ? "#22d3ee" : "rgba(255,255,255,0.45)", boxShadow: active ? "0 0 16px rgba(6,182,212,0.2)" : "none", clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
              {label}
              <span className="inline-flex items-center justify-center text-[10px] rounded-full px-1.5 py-0.5 font-black"
                style={{ background: active ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.07)", color: active ? "#22d3ee" : "rgba(255,255,255,0.35)", minWidth: 20 }}>
                {count}
              </span>
            </button>
          );
        })}
      </Reveal>
      <AnimatePresence mode="wait">
        <StaggerGroup key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </AnimatePresence>
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={() => document.getElementById("free-products")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{ background: "rgba(251,191,36,0.06)", border: "1.5px dashed rgba(251,191,36,0.3)", color: "#fbbf24" }}>
          <Gift className="h-4 w-4" />¿Sin presupuesto? Ver productos gratis →
        </button>
      </motion.div>
    </section>
  );
}
