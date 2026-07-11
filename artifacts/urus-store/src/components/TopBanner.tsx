import { useState } from "react";
import { Tag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full border-b px-3 py-2.5 relative flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#1a0e00", borderColor: "rgba(251,191,36,0.2)" }}
        >
          <div className="flex items-center justify-center gap-2 flex-wrap text-center pr-6">
            <Tag className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-orange-100 leading-tight">
              <span className="font-extrabold text-yellow-300">10% de descuento</span>
              {" "}con el cupón{" "}
              <span className="font-extrabold text-white bg-white/10 px-1.5 py-0.5 font-mono text-xs tracking-widest" style={{ clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" }}>URUS10</span>
            </p>
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="px-3 py-1 text-xs font-bold text-black uppercase tracking-wide transition-all hover:scale-105 shrink-0"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
