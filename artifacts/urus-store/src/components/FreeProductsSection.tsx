import { useEffect, useState } from "react";
import { Clock, Gift, RotateCcw, ShieldCheck } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";

function getNextReset(): Date {
  const now = new Date();
  const next = new Date(now);
  const day = now.getDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  next.setDate(now.getDate() + daysUntilMonday);
  next.setHours(0, 0, 0, 0);
  return next;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function TimerBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden font-mono"
        style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(251,191,36,0.06))", border: "1px solid rgba(251,191,36,0.35)", boxShadow: "0 0 20px rgba(251,191,36,0.1) inset, 0 4px 12px rgba(0,0,0,0.4)", clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)" }} />
        <span className="text-3xl sm:text-4xl font-extrabold tabular-nums"
          style={{ color: "#fbbf24", textShadow: "0 0 16px rgba(251,191,36,0.7), 0 0 32px rgba(251,191,36,0.3)" }}>
          {value}
        </span>
      </div>
      <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="text-3xl font-extrabold pb-6 select-none" style={{ color: "rgba(251,191,36,0.5)" }}>:</span>;
}

const freeProducts = [
  { id: "panel-free", name: "Panel Free", shortName: "PANEL", game: "FREE FIRE", description: "Versión gratuita del panel — 3 días de prueba", features: ["Aimbots external", "Chams", "Fix Lag"], color: "#fbbf24", glowColor: "rgba(251,191,36,0.25)", bgFrom: "rgba(251,191,36,0.12)" },
  { id: "bypass-free", name: "Bypass Free", shortName: "BYPASS", game: "FREE FIRE", description: "Versión gratuita del bypass — 3 días de prueba. Contacta soporte en discord para recibir tu...", features: ["Indetectable", "Activacion Rapida", "Sin riesgo de black/ban"], color: "#fbbf24", glowColor: "rgba(251,191,36,0.25)", bgFrom: "rgba(251,191,36,0.12)" },
];

function FreeCard({ product }: { product: typeof freeProducts[0] }) {
  const [hovered, setHovered] = useState(false);
  const corner = (pos: string) => (
    <span className="absolute w-3.5 h-3.5 pointer-events-none z-20 transition-opacity duration-300"
      style={{
        opacity: hovered ? 1 : 0, borderColor: "#fbbf24",
        ...(pos === "tl" ? { top: 6, left: 6, borderTop: "2px solid", borderLeft: "2px solid" } : {}),
        ...(pos === "tr" ? { top: 6, right: 6, borderTop: "2px solid", borderRight: "2px solid" } : {}),
        ...(pos === "bl" ? { bottom: 6, left: 6, borderBottom: "2px solid", borderLeft: "2px solid" } : {}),
        ...(pos === "br" ? { bottom: 6, right: 6, borderBottom: "2px solid", borderRight: "2px solid" } : {}),
      }} />
  );
  return (
    <div className="relative flex flex-col overflow-hidden font-mono transition-all duration-300"
      style={{ backgroundColor: "#07080b", clipPath: "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)", border: `1px solid ${hovered ? "rgba(251,191,36,0.7)" : "rgba(251,191,36,0.35)"}`, boxShadow: hovered ? "0 0 32px rgba(251,191,36,0.2), 0 8px 32px rgba(0,0,0,0.6)" : "0 0 10px rgba(251,191,36,0.06), 0 4px 16px rgba(0,0,0,0.4)", transform: hovered ? "translateY(-4px)" : "none" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {corner("tl")}{corner("tr")}{corner("bl")}{corner("br")}
      <div className="relative h-52 overflow-hidden" style={{ background: `linear-gradient(135deg, ${product.bgFrom}, rgba(7,8,11,0.95))` }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full blur-3xl" style={{ background: "rgba(251,191,36,0.12)" }} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 flex-wrap">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)", color: "#4ade80" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />Indetectable
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24" }}>
            <Gift className="h-2.5 w-2.5" />FREE
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-extrabold text-black uppercase tracking-wide" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", boxShadow: "0 0 12px rgba(251,191,36,0.4)", clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 30%)" }}>FREE</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">{product.game}</p>
          <div className="px-5 py-2 rounded text-xl font-extrabold tracking-widest" style={{ background: "rgba(255,255,255,0.92)", color: "#000", letterSpacing: "0.1em", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>{product.shortName}</div>
          <div className="mt-1.5 flex items-center justify-center gap-1">
            <Gift className="h-3 w-3 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">FREE</span>
            <Gift className="h-3 w-3 text-yellow-400" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/30 to-transparent" />
      </div>
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-extrabold text-base uppercase tracking-wide text-white">{product.name}</h3>
          <p className="text-white/40 text-xs mt-1 leading-relaxed">{product.description}</p>
        </div>
        <ul className="flex flex-col gap-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-white/70 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-yellow-400 shrink-0" /><span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest font-semibold">Precio</p>
            <p className="font-extrabold text-lg" style={{ color: "#fbbf24" }}>FREE</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold text-black uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", boxShadow: "0 0 16px rgba(251,191,36,0.35)", clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}>
            <Gift className="h-3 w-3" />Obtener →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FreeProductsSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = getNextReset();
      const diff = Math.max(0, target.getTime() - now.getTime());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="free-products" className="py-16 px-4 md:px-[10%]">
      <Reveal className="flex flex-col items-center text-center gap-4 mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24" }}>
          <Gift className="h-3.5 w-3.5" />Productos Gratuitos
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Prueba{" "}<span style={{ color: "#fbbf24", textShadow: "0 0 24px rgba(251,191,36,0.4)" }}>Gratis</span>
        </h2>
        <p className="text-white/50 text-sm max-w-md">Empieza sin pagar nada — 3 días de prueba completamente gratis.</p>
      </Reveal>
      <Reveal delay={0.1} className="max-w-xl mx-auto mb-10">
        <div className="px-6 py-7 flex flex-col items-center gap-5"
          style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.07), rgba(251,191,36,0.02))", border: "1px solid rgba(251,191,36,0.2)", boxShadow: "0 0 40px rgba(251,191,36,0.05)", clipPath: "polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <Clock className="h-3.5 w-3.5" />
            <span>Tiempo restante para el reset</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <TimerBox value={pad(timeLeft.days)} label="días" />
            <Colon />
            <TimerBox value={pad(timeLeft.hours)} label="horas" />
            <Colon />
            <TimerBox value={pad(timeLeft.minutes)} label="minutos" />
            <Colon />
            <TimerBox value={pad(timeLeft.seconds)} label="segundos" />
          </div>
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <RotateCcw className="h-3 w-3" />
            <span>Disponible gratuitamente · Se renueva cada semana</span>
          </div>
        </div>
      </Reveal>
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {freeProducts.map((p) => (
          <StaggerItem key={p.id}>
            <FreeCard product={p} />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Reveal delay={0.1} className="flex justify-center mt-10">
        <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24", clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
          <Gift className="h-4 w-4" />Ver todos los productos gratis
        </button>
      </Reveal>
    </section>
  );
}
