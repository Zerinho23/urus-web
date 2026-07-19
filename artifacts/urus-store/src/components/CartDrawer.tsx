import { useState } from "react";
import { X, ShoppingCart, Trash2, Tag, Package, Zap, Shield, Minus, Plus } from "lucide-react";
import { useCart, itemKey } from "@/context/CartContext";

const DiscordIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size * 0.76} viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const VALID_COUPONS: Record<string, number> = { URUS10: 10, URUS15: 15, URUS20: 20 };

function hexToRgba(hex: string, alpha: number) {
  if (hex.startsWith("linear")) return `rgba(168,85,247,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function CartDrawer() {
  const { items, count, total, open, setOpen, removeItem, updateQty, clearCart } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  if (!open) return null;

  const discountPct = appliedCoupon ? VALID_COUPONS[appliedCoupon] : 0;
  const discountAmt = (total * discountPct) / 100;
  const finalTotal = total - discountAmt;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) { setAppliedCoupon(code); setCouponError(""); setCouponInput(""); }
    else { setCouponError("Cupón inválido"); setTimeout(() => setCouponError(""), 2000); }
  };

  const handleDiscordCheckout = () => {
    const itemList = items.map((i) => `${i.name} x${i.quantity}`).join(", ");
    const msg = encodeURIComponent(`Hola, quiero comprar: ${itemList}${appliedCoupon ? ` (cupón: ${appliedCoupon})` : ""}`);
    window.open(`https://discord.gg/panelurus`, "_blank");
  };

  return (
    <>
      <div className="fixed inset-0 z-[100010] transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={() => setOpen(false)} />
      <div className="fixed right-0 top-0 h-full z-[100011] flex flex-col"
        style={{ width: "min(440px, 100vw)", background: "linear-gradient(180deg, #0a0c12 0%, #07080b 100%)", borderLeft: "1px solid rgba(255,255,255,0.07)", boxShadow: "-20px 0 80px rgba(0,0,0,0.9)", animation: "slideInRight 0.28s cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}>
              <ShoppingCart className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <span className="text-white font-extrabold text-base uppercase tracking-wide font-mono">[ Mi Carrito ]</span>
              {count > 0 && <span className="text-white/40 text-xs ml-2 font-mono">{count} {count === 1 ? "ítem" : "ítems"}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button onClick={clearCart} className="flex items-center gap-1.5 text-white/25 hover:text-red-400 transition-colors text-xs font-medium">
                <Trash2 className="h-3.5 w-3.5" /> Vaciar
              </button>
            )}
            <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-all" style={{ background: "rgba(255,255,255,0.05)" }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Package className="h-9 w-9 text-white/15" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center">
                  <span className="text-yellow-400 text-[10px] font-extrabold">0</span>
                </div>
              </div>
              <div>
                <p className="text-white/50 font-semibold text-sm">Tu carrito está vacío</p>
                <p className="text-white/20 text-xs mt-1">Agrega algún producto para comenzar</p>
              </div>
              <button onClick={() => { setOpen(false); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", boxShadow: "0 0 20px rgba(251,191,36,0.3)" }}>
                Ver Productos →
              </button>
            </div>
          ) : (
            <div className="p-5 flex flex-col gap-3">
              {items.map((item) => (
                <div key={`${item.id}-${item.name}`} className="relative flex items-center gap-3.5 p-4 rounded-2xl overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)", border: `1px solid ${hexToRgba(item.accentColor, 0.2)}` }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl" style={{ background: item.accentColor, boxShadow: `0 0 8px ${hexToRgba(item.accentColor, 0.6)}` }} />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${hexToRgba(item.accentColor, 0.2)}, ${hexToRgba(item.accentColor, 0.08)})`, border: `1px solid ${hexToRgba(item.accentColor, 0.3)}`, color: item.accentColor }}>
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm leading-tight truncate">{item.name}</p>
                    <p className="text-white/35 text-[11px] mt-0.5">{item.game}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-base" style={{ color: item.accentColor }}>${(item.price * item.quantity).toFixed(2)}</span>
                        <span className="text-white/25 text-[10px]">USD</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg overflow-hidden" style={{ border: `1px solid ${hexToRgba(item.accentColor, 0.3)}` }}>
                        <button onClick={() => updateQty(itemKey(item), item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">{item.quantity}</span>
                        <button onClick={() => updateQty(itemKey(item), item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center transition-colors" style={{ background: hexToRgba(item.accentColor, 0.15), color: item.accentColor }}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(itemKey(item))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 shrink-0 self-start">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              <div className="mt-1 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Cupón de descuento</span>
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-extrabold tracking-wider" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>{appliedCoupon}</span>
                      <span className="text-green-400 text-xs font-bold">−{discountPct}% aplicado ✓</span>
                    </div>
                    <button onClick={() => setAppliedCoupon(null)} className="text-white/25 hover:text-white/60 transition-colors text-xs">Quitar</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      placeholder="Ej: URUS10" className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-white placeholder:text-white/20 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: couponError ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)" }} />
                    <button onClick={applyCoupon} className="px-4 py-2 text-xs font-bold text-black uppercase tracking-wide transition-all hover:scale-105 active:scale-95"
                      style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}>Aplicar</button>
                  </div>
                )}
                {couponError && <p className="text-red-400 text-[10px] mt-1.5">{couponError}</p>}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 flex flex-col gap-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-sm">Subtotal</span>
                <span className="text-white/60 text-sm font-semibold">${total.toFixed(2)} USD</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center">
                  <span className="text-green-400 text-sm flex items-center gap-1.5"><Tag className="h-3 w-3" /> Descuento ({discountPct}%)</span>
                  <span className="text-green-400 text-sm font-bold">−${discountAmt.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <span className="text-white font-bold text-base uppercase tracking-wide">Total</span>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-white font-extrabold text-2xl">[ ${finalTotal.toFixed(2)} ]</span>
                  <span className="text-white/30 text-xs">USD</span>
                </div>
              </div>
            </div>
            <button onClick={handleDiscordCheckout}
              className="w-full flex items-center justify-center gap-2.5 py-4 font-extrabold text-white uppercase tracking-wide transition-all text-sm hover:scale-[1.02] active:scale-95"
              style={{ background: "linear-gradient(135deg, #5865F2 0%, #4752c4 100%)", boxShadow: "0 0 30px rgba(88,101,242,0.4), 0 4px 20px rgba(0,0,0,0.4)", clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}>
              <DiscordIcon size={16} />
              Comprar por Discord
            </button>
            <div className="flex items-center justify-center gap-4">
              {[{ icon: <Zap className="h-3 w-3" />, label: "Entrega inmediata" }, { icon: <Shield className="h-3 w-3" />, label: "100% seguro" }].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1 text-white/25 text-[10px]">{icon}{label}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
