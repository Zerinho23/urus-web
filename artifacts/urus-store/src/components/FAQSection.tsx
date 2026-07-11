import { useState } from "react";
import { HelpCircle, Plus } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";

const faqs = [
  { q: "¿Los productos son realmente indetectables?", a: "Sí. Todos nuestros paneles y bypass se prueban contra los sistemas anti-cheat vigentes antes de publicarse, y se actualizan apenas se detecta un parche nuevo." },
  { q: "¿Cómo recibo mi producto después de comprar?", a: "La entrega es inmediata. Tras completar el pago con Tebex recibirás tus credenciales y la guía de instalación al instante, sin esperas ni verificación manual." },
  { q: "¿Qué pasa si me banean usando el producto?", a: "Nuestros productos cuentan con protección anti-ban activa. En el caso puntual de un ban, nuestro soporte en Discord te ayuda a resolverlo según la política de cada producto." },
  { q: "¿Puedo usar el cupón de bienvenida junto a otras promociones?", a: "El cupón de bienvenida se puede aplicar en cualquier compra desde el carrito. No es acumulable con otros cupones de descuento activos al mismo tiempo." },
  { q: "¿Qué métodos de pago aceptan?", a: "El checkout se procesa mediante Tebex con cifrado SSL, aceptando tarjetas, PayPal y otros métodos locales según tu región." },
  { q: "¿Tienen productos gratuitos para probar antes de pagar?", a: "Sí, en la sección de productos gratis puedes activar una prueba de 3 días que se renueva cada semana, sin necesidad de tarjeta." },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: open ? "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(10,11,15,0.95))" : "rgba(255,255,255,0.02)", border: `1px solid ${open ? "rgba(6,182,212,0.3)" : "rgba(255,255,255,0.07)"}` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="flex items-center gap-3">
          <span className="text-[11px] font-black shrink-0" style={{ color: open ? "#22d3ee" : "rgba(255,255,255,0.2)" }}>0{index + 1}</span>
          <span className="text-white font-semibold text-sm">{q}</span>
        </span>
        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ background: open ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.05)", color: open ? "#22d3ee" : "rgba(255,255,255,0.4)", transform: open ? "rotate(45deg)" : "rotate(0)" }}>
          <Plus className="h-3.5 w-3.5" />
        </span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, transition: "max-height 0.3s ease" }} className="overflow-hidden">
        <p className="px-5 pb-4 pl-11 text-white/50 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 md:px-[10%]">
      <Reveal className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}>
          <HelpCircle className="h-3.5 w-3.5" />
          Preguntas frecuentes
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Antes de que{" "}<span style={{ color: "#06b6d4", textShadow: "0 0 30px rgba(6,182,212,0.5)" }}>preguntes</span>
        </h2>
        <p className="text-white/35 text-sm mt-3 max-w-md mx-auto">Todo lo que necesitas saber antes de tu primera compra.</p>
      </Reveal>
      <StaggerGroup className="max-w-2xl mx-auto flex flex-col gap-3">
        {faqs.map((f, i) => (
          <StaggerItem key={f.q}>
            <FaqItem q={f.q} a={f.a} index={i} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
