import { Shield, Zap, HeadphonesIcon, RefreshCw, CreditCard, Lock } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "100% Indetectable",
    description: "Nuestros productos utilizan tecnología avanzada que garantiza que sigas siendo invisible para los sistemas anti-cheat.",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Entrega Inmediata",
    description: "Recibe acceso instantáneo a tus productos en segundos. Sin esperas, sin complicaciones.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.1)",
    border: "rgba(6,182,212,0.2)",
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6" />,
    title: "Soporte 24/7",
    description: "Nuestro equipo de soporte está disponible las 24 horas, los 7 días de la semana para ayudarte.",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Actualizaciones Constantes",
    description: "Mantenemos todos nuestros productos actualizados frente a los últimos parches de los juegos.",
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.2)",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Pagos Seguros",
    description: "Aceptamos múltiples métodos de pago con cifrado SSL para garantizar la seguridad de tus datos.",
    color: "#eab308",
    bg: "rgba(234,179,8,0.1)",
    border: "rgba(234,179,8,0.2)",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Privacidad Total",
    description: "Tu privacidad es nuestra prioridad. Nunca compartimos tus datos con terceros.",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 md:px-[10%]">
      <div className="text-center mb-10">
        <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Por Qué Elegirnos</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Todo lo que Necesitas</h2>
        <p className="text-white/40 text-sm mt-2 max-w-xl mx-auto">
          Urus Store ofrece la mejor experiencia del mercado con productos premium y soporte dedicado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            style={{
              background: "rgba(7,8,11,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = f.border;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${f.bg}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
              style={{ background: f.bg, border: `1px solid ${f.border}`, color: f.color }}
            >
              {f.icon}
            </div>
            <h3 className="text-white font-bold text-base mb-2 group-hover:text-white transition-colors">
              {f.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
