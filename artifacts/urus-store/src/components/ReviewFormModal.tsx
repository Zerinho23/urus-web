import { useState } from "react";
import { getApiBase } from "@/lib/api";
import { X, Star, Send, CheckCircle } from "lucide-react";

const PRODUCTS = [
  "Aimbot Color", "Panel Secure", "Panel Android", "Panel CSGO",
  "Panel Full", "Panel Free", "Bypass Free",
];

interface Props {
  onClose: () => void;
}

export default function ReviewFormModal({ onClose }: Props) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    discordDisplayName: "",
    discordUsername: "",
    product: "",
    content: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.discordDisplayName.trim() || !form.content.trim()) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordDisplayName: form.discordDisplayName.trim(),
          discordUsername: form.discordUsername.trim() || form.discordDisplayName.trim(),
          content: form.content.trim(),
          product: form.product || undefined,
          rating,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setStep("success");
    } catch {
      setError("No se pudo enviar la reseña. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100020] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="w-full max-w-md rounded-2xl flex flex-col overflow-hidden"
          style={{
            background: "#07080b",
            border: "1px solid rgba(6,182,212,0.2)",
            boxShadow: "0 0 60px rgba(6,182,212,0.08)",
            animation: "scaleIn 0.2s ease-out",
          }}
        >
          {step === "success" ? (
            <div className="flex flex-col items-center justify-center gap-5 p-10 text-center">
              <CheckCircle className="h-16 w-16 text-green-400" />
              <div>
                <h3 className="text-white font-extrabold text-xl mb-2">¡Gracias por tu reseña!</h3>
                <p className="text-white/50 text-sm">Tu opinión ya está visible en nuestra página.</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-black transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <h3 className="text-white font-bold text-lg">Escribir reseña</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Puntuación *</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className="h-7 w-7 transition-colors"
                          fill={(hoverRating || rating) >= s ? "#fbbf24" : "none"}
                          style={{ color: (hoverRating || rating) >= s ? "#fbbf24" : "rgba(255,255,255,0.2)" }}
                        />
                      </button>
                    ))}
                    <span className="text-white/40 text-sm ml-2">({rating}/5)</span>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Tu nombre *</label>
                  <input
                    type="text"
                    placeholder="Ej: Diego"
                    value={form.discordDisplayName}
                    onChange={(e) => set("discordDisplayName", e.target.value)}
                    maxLength={64}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Usuario de Discord <span className="text-white/30 normal-case">(opcional)</span></label>
                  <input
                    type="text"
                    placeholder="Ej: diego_ff"
                    value={form.discordUsername}
                    onChange={(e) => set("discordUsername", e.target.value)}
                    maxLength={64}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Producto <span className="text-white/30 normal-case">(opcional)</span></label>
                  <select
                    value={form.product}
                    onChange={(e) => set("product", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    <option value="" style={{ background: "#07080b" }}>Seleccionar producto...</option>
                    {PRODUCTS.map((p) => (
                      <option key={p} value={p} style={{ background: "#07080b" }}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Tu reseña *</label>
                  <textarea
                    placeholder="Cuéntanos tu experiencia con el producto y el soporte..."
                    value={form.content}
                    onChange={(e) => set("content", e.target.value)}
                    maxLength={1000}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                  <p className="text-white/20 text-[11px] mt-1 text-right">{form.content.length}/1000</p>
                </div>

                {error && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Publicar reseña
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
