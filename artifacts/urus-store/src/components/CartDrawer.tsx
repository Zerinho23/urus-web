import { X, ShoppingCart, Trash2, Plus, Minus, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";

const DiscordIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.94 13.94 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.09.237-.185.351-.285a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

export default function CartDrawer() {
  const { items, count, total, open, setOpen, removeItem, updateQty, clearCart } = useCart();

  if (!open) return null;

  const handleCheckout = () => {
    window.open(`https://discord.gg/urus`, "_blank");
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100010] transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={() => setOpen(false)}
      />

      <div
        className="fixed right-0 top-0 h-full z-[100011] flex flex-col"
        style={{
          width: "min(420px, 100vw)",
          background: "#07080b",
          borderLeft: "1px solid rgba(251,191,36,0.2)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.8)",
          animation: "slideInRight 0.3s ease-out",
        }}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-bold text-lg">Carrito</span>
            {count > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-black" style={{ background: "#fbbf24" }}>
                {count}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button onClick={clearCart} className="text-white/30 hover:text-red-400 transition-colors text-xs flex items-center gap-1">
                <Trash2 className="h-3.5 w-3.5" /> Vaciar
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart className="h-12 w-12 text-white/10" />
              <p className="text-white/30 text-sm">Tu carrito está vacío</p>
              <button
                onClick={() => { setOpen(false); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-4 py-2 rounded-xl text-sm font-bold text-black transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
              >
                Ver Productos
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-extrabold text-black shrink-0"
                  style={{ background: item.accentColor }}>
                  {item.name[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate">{item.name}</p>
                  <p className="text-white/40 text-[11px]">{item.game}</p>
                  <p className="text-yellow-400 font-bold text-sm mt-0.5">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-white text-sm font-bold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all ml-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t flex flex-col gap-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm">Total</span>
              <span className="text-white font-extrabold text-xl">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-98"
              style={{
                background: "linear-gradient(135deg, #5865F2, #4752c4)",
                boxShadow: "0 0 20px rgba(88,101,242,0.4)",
              }}
            >
              <DiscordIcon />
              Comprar por Discord
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </button>
            <p className="text-white/25 text-[11px] text-center">
              Un agente de soporte te atenderá en Discord para completar tu compra.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
