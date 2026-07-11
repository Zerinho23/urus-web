import { useEffect, useRef, useState } from "react";
import { Users, Package, Star, Clock } from "lucide-react";

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const stats = [
  { icon: <Users className="h-6 w-6" />, value: 8000, suffix: "+", label: "Miembros en Discord", color: "#06b6d4" },
  { icon: <Package className="h-6 w-6" />, value: 7, suffix: "", label: "Productos disponibles", color: "#a855f7" },
  { icon: <Star className="h-6 w-6" />, value: 99, suffix: "%", label: "Tasa de satisfacción", color: "#fbbf24" },
  { icon: <Clock className="h-6 w-6" />, value: 24, suffix: "/7", label: "Soporte disponible", color: "#22c55e" },
];

function CountUp({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-extrabold" style={{ color, textShadow: `0 0 24px ${hexToRgba(color, 0.4)}` }}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 px-4 md:px-[10%]">
      <div className="rounded-2xl p-8 md:p-12 border relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.05), rgba(8,145,178,0.03))", borderColor: "rgba(6,182,212,0.15)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative text-center mb-10">
          <p className="text-sm text-cyan-400/70 uppercase tracking-widest mb-1">Nuestros Números</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Confianza que Habla por Sí Sola</h2>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 py-6 px-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${hexToRgba(stat.color, 0.18)}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: hexToRgba(stat.color, 0.1), border: `1px solid ${hexToRgba(stat.color, 0.25)}`, color: stat.color }}>
                {stat.icon}
              </div>
              <CountUp target={stat.value} suffix={stat.suffix} color={stat.color} />
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
