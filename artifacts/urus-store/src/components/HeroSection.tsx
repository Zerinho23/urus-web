import { Shield, Zap, MessageCircle, CreditCard, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const DiscordIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.94 13.94 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.09.237-.185.351-.285a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.35 + 0.05,
      size: Math.random() * 1.5 + 0.5,
    }));

    let animId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="relative w-full overflow-hidden hero-grid-bg" style={{ minHeight: "100svh" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.2),rgba(0,0,0,0.35))", zIndex: 2 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(5,6,8,1) 0%,rgba(5,6,8,0.6) 20%,transparent 60%)", zIndex: 3 }} />

      <div className="relative flex flex-col justify-center items-center text-center h-full px-5 py-20 sm:py-28 md:px-16" style={{ zIndex: 4, minHeight: "100svh" }}>

        {/* Status pill */}
        <div className="flex items-center gap-2 mb-5 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/18 text-white text-[11px] font-semibold tracking-widest px-3.5 py-1.5 rounded-full uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            Status: Indetectable
          </span>
        </div>

        {/* Title — scales down on mobile */}
        <h1 className="font-extrabold text-white leading-tight drop-shadow-lg animate-fade-in-up-delay-1"
          style={{ fontSize: "clamp(2rem, 9vw, 5rem)", marginBottom: "0.25rem" }}>
          Domina todo el lobby
        </h1>
        <h2 className="font-extrabold leading-tight drop-shadow-lg animate-fade-in-up-delay-2"
          style={{ fontSize: "clamp(2rem, 9vw, 5rem)", color: "#06b6d4", marginBottom: "1.25rem" }}>
          Urus Store
        </h2>

        {/* Subtitle */}
        <p className="text-white/65 leading-relaxed max-w-xs sm:max-w-md text-center animate-fade-in-up-delay-3 mb-8"
          style={{ fontSize: "clamp(0.85rem, 3vw, 1.05rem)" }}>
          Productos premium con entrega rápida, actualizaciones constantes y soporte dedicado.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up-delay-4 mb-8 w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 animate-glow-pulse"
            style={{
              background: "linear-gradient(135deg,#06b6d4,#0891b2)",
              boxShadow: "0 0 25px rgba(6,182,212,0.5), 0 0 50px rgba(6,182,212,0.2)",
              fontSize: "clamp(0.875rem, 3vw, 1rem)",
            }}
          >
            Compra Ahora
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="https://discord.gg/urus"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-medium text-white/70 border border-white/18 bg-white/5 backdrop-blur-sm hover:border-white/35 hover:text-white transition-all"
            style={{ fontSize: "clamp(0.8rem, 3vw, 0.9rem)" }}
          >
            <DiscordIcon />
            Únete en Discord
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center items-center animate-fade-in-up-delay-4">
          {[
            { icon: <Shield className="h-3 w-3" />, label: "Indetectable" },
            { icon: <Zap className="h-3 w-3" />, label: "Entrega Inmediata" },
            { icon: <MessageCircle className="h-3 w-3" />, label: "Soporte 24/7" },
            { icon: <CreditCard className="h-3 w-3" />, label: "Pagos seguros" },
          ].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-1 text-white/50 text-[11px]">
              {i > 0 && <span className="text-white/15 mr-1">·</span>}
              <span className="text-white/25">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
