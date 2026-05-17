import { useEffect, useRef, useState } from "react";
import { MessageSquare, Star, ChevronLeft, ChevronRight, PenLine } from "lucide-react";
import ReviewFormModal from "./ReviewFormModal";

interface Review {
  id: number;
  discordUsername: string;
  discordDisplayName: string;
  discordAvatarUrl: string | null;
  content: string;
  product: string | null;
  rating: number;
  imageUrl: string | null;
  createdAt: string;
}

const FALLBACK_REVIEWS: Review[] = [
  { id: 1, discordUsername: "diego_ff", discordDisplayName: "Diego", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Full\n💚 **Soporte:** Mattizyn 🤚\n⭐⭐⭐⭐⭐ (5/5) 💬 La atención es 100/10, excelente servicio 🤚", product: "Panel Full", rating: 5, imageUrl: null, createdAt: "2026-03-15T00:00:00Z" },
  { id: 2, discordUsername: "theninoig", discordDisplayName: "Theninoig", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Android 🤍\n**Soporte:** @unknownx444 ⭐\n⭐⭐⭐⭐⭐ (5/5) 💬 La atención rápida y respetuosa. Muy excelente producto y el mejor", product: "Panel Android", rating: 5, imageUrl: null, createdAt: "2026-03-15T00:00:00Z" },
  { id: 3, discordUsername: "gersonorellan", discordDisplayName: "Gersonorellan", discordAvatarUrl: null, content: "🛒 **Producto:** Aimbot Color 💚\n**Soporte:** Vendedor excelente ⭐\n⭐⭐⭐⭐⭐ (5/5) 💬 Ellos te explican todo, te dicen cómo funciona. El servicio es el mejor.", product: "Aimbot Color", rating: 5, imageUrl: null, createdAt: "2026-03-15T00:00:00Z" },
  { id: 4, discordUsername: "carlos_gamer", discordDisplayName: "Carlos", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Secure 🔒\n**Soporte:** @mattizyn ⭐\n⭐⭐⭐⭐⭐ (5/5) 💬 Increíble, no me han detectado ni una sola vez. Vale cada peso.", product: "Panel Secure", rating: 5, imageUrl: null, createdAt: "2026-03-14T00:00:00Z" },
  { id: 5, discordUsername: "xander_plays", discordDisplayName: "Xander", discordAvatarUrl: null, content: "🛒 **Producto:** Panel CSGO 🎯\n**Soporte:** @unknownx444 ⭐\n⭐⭐⭐⭐⭐ (5/5) 💬 Top tier, el soporte responde rápido y el producto funciona perfecto.", product: "Panel CSGO", rating: 5, imageUrl: null, createdAt: "2026-03-13T00:00:00Z" },
  { id: 6, discordUsername: "luisito_ff", discordDisplayName: "Luisito", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Full 🤍\n**Soporte:** Mattizyn ⭐\n⭐⭐⭐⭐⭐ (5/5) 💬 El mejor panel que he probado, actualizaciones constantes y soporte top.", product: "Panel Full", rating: 5, imageUrl: null, createdAt: "2026-03-12T00:00:00Z" },
];

const AVATAR_COLORS = ["#3b82f6","#8b5cf6","#ef4444","#f97316","#22c55e","#06b6d4","#ec4899","#eab308"];
function getColor(s: string) { let h = 0; for (const c of s) h = c.charCodeAt(0) + ((h << 5) - h); return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]; }
function initials(s: string) { return s.slice(0, 2).toUpperCase(); }
function fmtDate(iso: string) { const d = new Date(iso); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; }
function fmtContent(raw: string) {
  return raw.replace(/\*\*(.+?)\*\*/g, "<strong class='text-white/90'>$1</strong>");
}

function ReviewCard({ review }: { review: Review }) {
  const color = getColor(review.discordUsername);
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden shrink-0 select-none"
      style={{ width: "300px", background: "#0c0e14", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex items-center gap-2.5">
          {review.discordAvatarUrl ? (
            <img src={review.discordAvatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold shrink-0"
              style={{ background: color }}>
              {initials(review.discordDisplayName)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-sm leading-none">{review.discordDisplayName}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.053a19.89 19.89 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </div>
            <p className="text-white/25 text-[10px] mt-0.5">{fmtDate(review.createdAt)}</p>
          </div>
        </div>
        <span className="text-white/15 text-2xl font-serif leading-none">"</span>
      </div>

      <div className="flex items-center gap-0.5 px-4 pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3" fill={i < review.rating ? "#fbbf24" : "none"}
            style={{ color: i < review.rating ? "#fbbf24" : "rgba(255,255,255,0.12)" }} />
        ))}
        <span className="text-white/30 text-[10px] ml-1">({review.rating}/5)</span>
      </div>

      {review.product && (
        <div className="mx-4 mb-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}>
            {review.product}
          </span>
        </div>
      )}

      <div className="px-4 pb-4 flex-1">
        <div className="text-white/65 text-xs leading-relaxed space-y-0.5">
          {review.content.split("\n").filter(Boolean).map((line, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: fmtContent(line) }} />
          ))}
        </div>
      </div>

      {review.imageUrl && (
        <div className="mx-4 mb-4 rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img src={review.imageUrl} alt="Screenshot" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const loadReviews = () => {
    const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
    fetch(`${base}/api/reviews`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: Review[] | null) => { if (data && data.length > 0) setReviews(data); })
      .catch(() => {});
  };

  useEffect(() => { loadReviews(); }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let paused = false;
    const tick = () => {
      if (!paused) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [reviews]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 4);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const doubled = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-16 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-4 mb-12 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: "rgba(88,101,242,0.12)", border: "1px solid rgba(88,101,242,0.3)", color: "#7289da" }}>
          <MessageSquare className="h-3.5 w-3.5" />
          Opiniones de la Comunidad
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Lo que dicen nuestros{" "}
          <span style={{ color: "#06b6d4", textShadow: "0 0 24px rgba(6,182,212,0.4)" }}>jugadores</span>
        </h2>
        <p className="text-white/40 text-sm max-w-md">Opiniones reales de nuestra comunidad.</p>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #06b6d4, #0891b2)",
            boxShadow: "0 0 20px rgba(6,182,212,0.3)",
            color: "#fff",
          }}
        >
          <PenLine className="h-4 w-4" />
          Escribir reseña
        </button>
      </div>

      <div className="relative">
        {canLeft && (
          <button onClick={() => scroll("left")} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/10 text-white flex items-center justify-center hover:bg-black/90 transition-all">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: "none",
            paddingLeft: "max(1.5rem, calc((100vw - 1100px) / 2))",
            paddingRight: "max(1.5rem, calc((100vw - 1100px) / 2))",
          }}
        >
          {doubled.map((r, i) => <ReviewCard key={`${r.id}-${i}`} review={r} />)}
        </div>
        {canRight && (
          <button onClick={() => scroll("right")} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/10 text-white flex items-center justify-center hover:bg-black/90 transition-all">
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: "linear-gradient(90deg, #050608, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: "linear-gradient(270deg, #050608, transparent)" }} />
      </div>

      {showForm && <ReviewFormModal onClose={() => { setShowForm(false); loadReviews(); }} />}
    </section>
  );
}
