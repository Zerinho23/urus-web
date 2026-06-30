import { useEffect, useRef, useState } from "react";
import { Users, Package, Star, Clock } from "lucide-react";

const stats = [
  { icon: <Users className="h-6 w-6" />, value: 50000, suffix: "+", label: "Clientes satisfechos" },
  { icon: <Package className="h-6 w-6" />, value: 7, suffix: "", label: "Productos disponibles" },
  { icon: <Star className="h-6 w-6" />, value: 99, suffix: "%", label: "Tasa de satisfacción" },
  { icon: <Clock className="h-6 w-6" />, value: 24, suffix: "/7", label: "Soporte disponible" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
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
    <div ref={ref} className="text-3xl md:text-4xl font-extrabold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 px-4 md:px-[10%]">
      <div className="rounded-2xl p-8 md:p-12 border"
        style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.05), rgba(8,145,178,0.03))", borderColor: "rgba(6,182,212,0.15)" }}>
        <div className="text-center mb-10">
          <p className="text-sm text-cyan-400/70 uppercase tracking-widest mb-1">Nuestros Números</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Confianza que Habla por Sí Sola</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-cyan-400"
                style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                {stat.icon}
              </div>
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
