import { useState } from "react";
import { Tag, X } from "lucide-react";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="w-full border-b px-3 py-2.5 relative flex items-center justify-center"
      style={{ backgroundColor: "#1a0e00", borderColor: "rgba(251,191,36,0.2)" }}
    >
      <div className="flex items-center justify-center gap-2 flex-wrap text-center pr-6">
        <Tag className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
        <p className="text-xs sm:text-sm font-medium text-orange-100 leading-tight">
          <span className="font-extrabold text-yellow-300">10% de descuento</span>
          {" "}con el cupón{" "}
          <span className="font-extrabold text-white bg-white/10 px-1.5 py-0.5 rounded text-xs tracking-widest">URUS10</span>
        </p>
        <button
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="px-3 py-1 rounded-lg text-xs font-bold text-black transition-all hover:scale-105 shrink-0"
          style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
        >
          Usar cupón
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
