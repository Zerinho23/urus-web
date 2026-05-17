import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getNextReset(): Date {
  const now = new Date();
  const next = new Date(now);
  const day = now.getDay();
  const daysUntilMonday = day === 0 ? 1 : 8 - day;
  next.setDate(now.getDate() + daysUntilMonday);
  next.setHours(0, 0, 0, 0);
  return next;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimerBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.05))",
          border: "1px solid rgba(251,191,36,0.25)",
          boxShadow: "0 0 16px rgba(251,191,36,0.08) inset",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "rgba(251,191,36,0.35)" }}
        />
        <span
          className="text-2xl sm:text-3xl font-extrabold tabular-nums"
          style={{ color: "#fbbf24", textShadow: "0 0 12px rgba(251,191,36,0.5)" }}
        >
          {value}
        </span>
      </div>
      <span className="text-white/30 text-[9px] uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = getNextReset();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-10 px-4 md:px-[10%]">
      <div
        className="rounded-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.06), rgba(251,191,36,0.02))",
          border: "1px solid rgba(251,191,36,0.18)",
          boxShadow: "0 0 40px rgba(251,191,36,0.04)",
        }}
      >
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start text-yellow-400 text-sm font-semibold">
            <Clock className="h-4 w-4" />
            <span>Tiempo restante para el reset</span>
          </div>
          <p className="text-white/40 text-xs max-w-xs">
            Los precios y cupones se reinician cada lunes. Aprovecha las ofertas antes de que termine el tiempo.
          </p>
          <a
            href="#products"
            className="mt-2 inline-flex self-center sm:self-start items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              boxShadow: "0 0 16px rgba(251,191,36,0.3)",
            }}
          >
            Ver Productos →
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <TimerBox value={pad(timeLeft.days)} label="días" />
          <span
            className="text-2xl font-extrabold pb-5"
            style={{ color: "rgba(251,191,36,0.4)" }}
          >
            :
          </span>
          <TimerBox value={pad(timeLeft.hours)} label="horas" />
          <span
            className="text-2xl font-extrabold pb-5"
            style={{ color: "rgba(251,191,36,0.4)" }}
          >
            :
          </span>
          <TimerBox value={pad(timeLeft.minutes)} label="minutos" />
          <span
            className="text-2xl font-extrabold pb-5"
            style={{ color: "rgba(251,191,36,0.4)" }}
          >
            :
          </span>
          <TimerBox value={pad(timeLeft.seconds)} label="segundos" />
        </div>
      </div>
    </section>
  );
}
