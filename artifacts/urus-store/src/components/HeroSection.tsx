import { Shield, Zap, MessageCircle, CreditCard, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DiscordIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.94 13.94 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.09.237-.185.351-.285a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

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

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.08,
      size: Math.random() * 1.8 + 0.5,
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

  const fadeUp = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  });

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100svh",
        background: "#050608",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      {/* Cyan orb top-center */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 700, height: 400,
          top: -100, left: "50%", transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, transparent 70%)",
          zIndex: 2,
        }}
      />

      {/* Purple orb bottom-right */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 500, height: 500,
          bottom: -100, right: -100,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
          zIndex: 2,
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
      />

      {/* Fade-to-black at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #050608, transparent)", zIndex: 4 }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-center items-center text-center px-5 md:px-16"
        style={{ zIndex: 5, minHeight: "100svh", paddingTop: 120, paddingBottom: 60 }}
      >
        {/* Status pill */}
        <div style={fadeUp(0)}>
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.25)",
              color: "#22d3ee",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#22d3ee",
                boxShadow: "0 0 6px #22d3ee",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            Status: Indetectable
          </span>
        </div>

        {/* Headline */}
        <div style={fadeUp(120)}>
          <h1
            className="font-extrabold text-white leading-[1.05] mb-3"
            style={{ fontSize: "clamp(2.6rem, 8vw, 5.5rem)" }}
          >
            Domina todo el lobby
          </h1>
        </div>

        <div style={fadeUp(200)}>
          <p
            className="font-extrabold leading-[1.05] mb-5"
            style={{
              fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
              background: "linear-gradient(135deg, #06b6d4, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Urus Store
          </p>
        </div>

        {/* Subtitle */}
        <div style={fadeUp(300)}>
          <p
            className="text-white/55 leading-relaxed max-w-md mb-10"
            style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)" }}
          >
            Productos premium con entrega rápida, actualizaciones constantes y soporte dedicado.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 w-full"
          style={{ maxWidth: 420, ...fadeUp(420) }}
        >
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #0891b2)",
              boxShadow: "0 0 30px rgba(6,182,212,0.45), 0 4px 20px rgba(0,0,0,0.4)",
              fontSize: "1rem",
            }}
          >
            Compra Ahora
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="https://discord.gg/urus"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white/80 border border-white/15 bg-white/5 hover:border-white/30 hover:text-white transition-all duration-200"
            style={{ fontSize: "0.9rem", backdropFilter: "blur(8px)" }}
          >
            <DiscordIcon />
            Únete en Discord
          </a>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 justify-center items-center"
          style={fadeUp(540)}
        >
          {[
            { icon: <Shield className="h-3.5 w-3.5" />, label: "Indetectable" },
            { icon: <Zap className="h-3.5 w-3.5" />, label: "Entrega Inmediata" },
            { icon: <MessageCircle className="h-3.5 w-3.5" />, label: "Soporte 24/7" },
            { icon: <CreditCard className="h-3.5 w-3.5" />, label: "Pagos seguros" },
          ].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/40 text-xs font-medium">
              <span className="text-cyan-400/60">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
