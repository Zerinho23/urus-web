import { useEffect, useRef, useState } from "react";
import { getApiBase } from "@/lib/api";
import { MessageSquare, Star, Shield, ThumbsUp, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
  { id: 1, discordUsername: "diego_ff", discordDisplayName: "Diego", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Full\n💚 **Soporte:** Mattizyn\n⭐⭐⭐⭐⭐ La atención es 100/10, excelente servicio. Recomendado al 100% sin dudas.", product: "Panel Full", rating: 5, imageUrl: null, createdAt: "2026-03-15T00:00:00Z" },
  { id: 2, discordUsername: "theninoig", discordDisplayName: "Theninoig", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Android\n**Soporte:** @unknownx444\n⭐⭐⭐⭐⭐ La atención rápida y respetuosa. Muy excelente producto y el mejor que he probado.", product: "Panel Android", rating: 5, imageUrl: null, createdAt: "2026-03-14T00:00:00Z" },
  { id: 3, discordUsername: "gersonorellan", discordDisplayName: "Gersonorellan", discordAvatarUrl: null, content: "🛒 **Producto:** Aimbot Color\n**Soporte:** Vendedor excelente\n⭐⭐⭐⭐⭐ Te explican todo, dicen cómo funciona. El servicio es el mejor que he visto.", product: "Aimbot Color", rating: 5, imageUrl: null, createdAt: "2026-03-13T00:00:00Z" },
  { id: 4, discordUsername: "carlos_gamer", discordDisplayName: "Carlos", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Secure\n**Soporte:** @mattizyn\n⭐⭐⭐⭐⭐ Increíble, no me han detectado ni una sola vez. Vale cada peso que gasté.", product: "Panel Secure", rating: 5, imageUrl: null, createdAt: "2026-03-12T00:00:00Z" },
  { id: 5, discordUsername: "xander_plays", discordDisplayName: "Xander", discordAvatarUrl: null, content: "🛒 **Producto:** Bypass APK\n**Soporte:** @unknownx444\n⭐⭐⭐⭐⭐ Top tier, el soporte responde rápido y el producto funciona perfecto sin ningún problema.", product: "Bypass APK", rating: 5, imageUrl: null, createdAt: "2026-03-11T00:00:00Z" },
  { id: 6, discordUsername: "luisito_ff", discordDisplayName: "Luisito", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Xtreme\n**Soporte:** Mattizyn\n⭐⭐⭐⭐⭐ El mejor panel que he probado, actualizaciones constantes y soporte top siempre disponible.", product: "Panel Xtreme", rating: 5, imageUrl: null, createdAt: "2026-03-10T00:00:00Z" },
  { id: 7, discordUsername: "javier_pro", discordDisplayName: "Javier Pro", discordAvatarUrl: null, content: "🛒 **Producto:** Chams ESP\n**Soporte:** @mattizyn\n⭐⭐⭐⭐⭐ Funciona increíble, el ESP es clarisimo. Llevo 2 meses sin ningún tipo de problema.", product: "Chams ESP", rating: 5, imageUrl: null, createdAt: "2026-03-09T00:00:00Z" },
  { id: 8, discordUsername: "mike_ff99", discordDisplayName: "Mike FF", discordAvatarUrl: null, content: "🛒 **Producto:** Panel Supreme\n**Soporte:** @unknownx444\n⭐⭐⭐⭐⭐ Excelente todo. El panel es premium de verdad, vale la pena cada centavo invertido.", product: "Panel Supreme", rating: 5, imageUrl: null, createdAt: "2026-03-08T00:00:00Z" },
];

const AVATAR_COLORS = ["#3b82f6","#8b5cf6","#ef4444","#f97316","#22c55e","#06b6d4","#ec4899","#eab308"];
const ACCENT_COLORS = ["#3b82f6","#8b5cf6","#ef4444","#f97316","#22c55e","#06b6d4","#ec4899","#eab308"];
function getColor(s: string) { let h = 0; for (const c of s) h = c.charCodeAt(0) + ((h << 5) - h); return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]; }
function getAccent(s: string) { let h = 0; for (const c of s) h = c.charCodeAt(0) + ((h << 5) - h); return ACCENT_COLORS[Math.abs(h) % ACCENT_COLORS.length]; }
function fmtDate(iso: string) { const d = new Date(iso); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; }
function fmtContent(raw: string) {
  return raw.replace(/\*\*(.+?)\*\*/g, "<strong style='color:rgba(255,255,255,0.9)'>$1</strong>");
}
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const DiscordIcon = () => (
  <svg width="14" height="11" viewBox="0 0 127.14 96.36" fill="#5865F2">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const color = getColor(review.discordUsername);
  const accent = getAccent(review.discordUsername + index);
  const initials = review.discordDisplayName.slice(0, 2).toUpperCase();
  const lines = review.content.split("\n").filter(Boolean);

  return (
    <div className="relative flex flex-col overflow-hidden shrink-0 select-none"
      style={{ width: "320px", background: "linear-gradient(160deg, #0f1117 0%, #0a0b0f 100%)", border: `1px solid ${hexToRgba(accent, 0.18)}`, boxShadow: `0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)`, clipPath: "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          {review.discordAvatarUrl ? (
            <img src={review.discordAvatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold shrink-0"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 0 12px ${hexToRgba(color, 0.4)}`, outline: `2px solid ${hexToRgba(color, 0.3)}`, outlineOffset: "2px" }}>
              {initials}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-sm leading-none">{review.discordDisplayName}</span>
              <DiscordIcon />
            </div>
            <p className="text-white/30 text-[10px] mt-0.5">@{review.discordUsername}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3" fill={i < review.rating ? "#fbbf24" : "none"} style={{ color: i < review.rating ? "#fbbf24" : "rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <p className="text-white/20 text-[9px]">{fmtDate(review.createdAt)}</p>
        </div>
      </div>
      {review.product && (
        <div className="px-5 pb-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2.5 py-1 uppercase tracking-wide"
            style={{ background: hexToRgba(accent, 0.12), border: `1px solid ${hexToRgba(accent, 0.28)}`, color: accent, clipPath: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)" }}>
            <Shield className="h-2.5 w-2.5" />
            {review.product}
          </span>
        </div>
      )}
      <div className="px-5 pb-4 flex-1">
        <div className="relative pl-3 text-white/65 text-xs leading-relaxed space-y-1" style={{ borderLeft: `2px solid ${hexToRgba(accent, 0.35)}` }}>
          {lines.map((line, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: fmtContent(line) }} />
          ))}
        </div>
      </div>
      {review.imageUrl && (
        <div className="mx-5 mb-5 rounded-xl overflow-hidden" style={{ aspectRatio: "16/9", border: `1px solid ${hexToRgba(accent, 0.2)}` }}>
          <img src={review.imageUrl} alt="Screenshot" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="px-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-white/20 text-[10px]">
          <ThumbsUp className="h-3 w-3" />
          Compra verificada
        </div>
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-serif leading-none opacity-20" style={{ color: accent }}>"</div>
      </div>
    </div>
  );
}

const MARQUEE_STYLE = `
@keyframes urus-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${getApiBase()}/reviews`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: Review[] | null) => { if (data && data.length > 0) setReviews(data); })
      .catch(() => {});
  }, []);

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1);
  // Duplicate so the CSS marquee can loop seamlessly: animate -50% = exactly one copy
  const doubled = [...reviews, ...reviews];

  const pauseAnim = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; };
  const resumeAnim = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; };

  return (
    <section id="reviews" className="py-20 overflow-hidden">
      <style>{MARQUEE_STYLE}</style>

      <Reveal className="flex flex-col items-center text-center gap-4 mb-10 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: "rgba(88,101,242,0.12)", border: "1px solid rgba(88,101,242,0.3)", color: "#7289da" }}>
          <MessageSquare className="h-3.5 w-3.5" />
          Opiniones Verificadas
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Lo que dicen nuestros{" "}
          <span style={{ color: "#06b6d4", textShadow: "0 0 24px rgba(6,182,212,0.4)" }}>jugadores</span>
        </h2>
        <div className="flex items-center gap-6 mt-2 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4" fill="#fbbf24" style={{ color: "#fbbf24" }} />)}
            </div>
            <span className="text-white font-extrabold text-lg">{avgRating}</span>
            <span className="text-white/40 text-sm">/ 5</span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Users className="h-4 w-4" />
            <span>{totalReviews}+ reseñas</span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Shield className="h-4 w-4 text-green-400" />
            <span>Compras verificadas</span>
          </div>
        </div>
      </Reveal>

      <div className="relative">
        {/* Overflow hidden clips the track; the track animates via CSS keyframes */}
        <div style={{ overflow: "hidden" }}>
          <div
            ref={trackRef}
            className="flex gap-4 pb-2"
            style={{
              width: "max-content",
              animation: `urus-marquee ${reviews.length * 5}s linear infinite`,
              willChange: "transform",
              paddingLeft: "max(1.5rem, calc((100vw - 1200px) / 2))",
            }}
            onMouseEnter={pauseAnim}
            onMouseLeave={resumeAnim}
            onTouchStart={pauseAnim}
            onTouchEnd={resumeAnim}
          >
            {doubled.map((r, i) => (
              <ReviewCard key={`${r.id}-${i}`} review={r} index={i} />
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(90deg, #050608 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(270deg, #050608 0%, transparent 100%)" }} />
      </div>
    </section>
  );
}
