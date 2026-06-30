import { useState } from "react";
import { Shield, Zap, HeadphonesIcon, RefreshCw, CreditCard, Lock, CheckCircle2 } from "lucide-react";

const features = [
  { icon: <Shield className="h-7 w-7" />, title: "100% Indetectable", description: "Tecnología avanzada que garantiza invisibilidad total frente a todos los sistemas anti-cheat actuales.", color: "#22c55e", glow: "rgba(34,197,94,0.3)", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", stat: "0 bans", statLabel: "reportados" },
  { icon: <Zap className="h-7 w-7" />, title: "Entrega Inmediata", description: "Acceso instantáneo a tus productos en segundos. Sin esperas, sin verificaciones manuales.", color: "#06b6d4", glow: "rgba(6,182,212,0.3)", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)", stat: "< 10s", statLabel: "tiempo de entrega" },
  { icon: <HeadphonesIcon className="h-7 w-7" />, title: "Soporte 24/7", description: "Equipo disponible las 24 horas del día, los 7 días de la semana. Respondemos en minutos.", color: "#a855f7", glow: "rgba(168,85,247,0.3)", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.25)", stat: "< 5 min", statLabel: "tiempo de respuesta" },
  { icon: <RefreshCw className="h-7 w-7" />, title: "Actualizaciones Constantes", description: "Todos los productos se actualizan frente a los últimos parches. Siempre en la última versión.", color: "#f97316", glow: "rgba(249,115,22,0.3)", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.25)", stat: "24h", statLabel: "tras cada parche" },
  { icon: <CreditCard className="h-7 w-7" />, title: "Pagos Seguros", description: "Múltiples métodos de pago con cifrado SSL. Transacciones 100% seguras y protegidas.", color: "#eab308", glow: "rgba(234,179,8,0.3)", bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.25)", stat: "SSL", statLabel: "cifrado total" },
  { icon: <Lock className="h-7 w-7" />, title: "Privacidad Total", description: "Tu identidad y datos personales son completamente confidenciales. Nunca compartidos.", color: "#3b82f6", glow: "rgba(59,130,246,0.3)", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)", stat: "0 datos", statLabel: "compartidos" },
];

function FeatureCard({ f, index }: { f: typeof features[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-default"
      style={{
        background: hovered ? `linear-gradient(135deg, ${f.bg} 0%, rgba(10,11,15,0.95) 100%)` : "linear-gradient(135deg, rgba(12,14,20,0.9) 0%, rgba(10,11,15,0.95) 100%)",
        border: `1px solid ${hovered ? f.border : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${f.bg}, 0 0 30px ${f.glow}` : "0 2px 16px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-4 right-4 text-xs font-black" style={{ color: hovered ? f.color : "rgba(255,255,255,0.07)", transition: "color 0.3s" }}>
        0{index + 1}
      </div>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{ background: f.bg, border: `1px solid ${f.border}`, color: f.color, boxShadow: hovered ? `0 0 20px ${f.glow}` : "none" }}>
        {f.icon}
      </div>
      <div>
        <h3 className="text-white font-extrabold text-base mb-1.5 flex items-center gap-2">
          {f.title}
          {hovered && <CheckCircle2 className="h-4 w-4" style={{ color: f.color }} />}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed">{f.description}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${hovered ? f.border : "rgba(255,255,255,0.05)"}`, transition: "border-color 0.3s" }}>
        <div>
          <div className="font-extrabold text-lg leading-none" style={{ color: f.color }}>{f.stat}</div>
          <div className="text-white/30 text-[10px] mt-0.5 uppercase tracking-widest">{f.statLabel}</div>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: hovered ? f.bg : "rgba(255,255,255,0.03)", border: `1px solid ${hovered ? f.border : "rgba(255,255,255,0.06)"}`, color: hovered ? f.color : "rgba(255,255,255,0.2)" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 md:px-[6%]">
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          Por qué elegirnos
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Todo lo que{" "}
          <span style={{ color: "#06b6d4", textShadow: "0 0 30px rgba(6,182,212,0.5)" }}>necesitas</span>
        </h2>
        <p className="text-white/35 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
          Urus Store combina tecnología de punta con soporte dedicado para ofrecerte la mejor experiencia del mercado.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
      </div>
      <div className="mt-10 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.07) 0%, rgba(168,85,247,0.07) 100%)", border: "1px solid rgba(6,182,212,0.15)" }}>
        <div>
          <p className="text-white font-extrabold text-lg">¿Listo para dominar?</p>
          <p className="text-white/40 text-sm mt-0.5">Únete a miles de jugadores que ya confían en Urus Store.</p>
        </div>
        <button
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="shrink-0 px-6 py-3 rounded-xl font-bold text-sm text-black transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)", boxShadow: "0 0 20px rgba(6,182,212,0.35)" }}
        >
          Ver productos →
        </button>
      </div>
    </section>
  );
}
