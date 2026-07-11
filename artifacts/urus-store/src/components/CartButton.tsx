import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { count, setOpen } = useCart();

  return (
    <motion.button
      onClick={() => setOpen(true)}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center"
      style={{
        background: "#ffffff",
        boxShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
        zIndex: 100002,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div key={count} animate={count > 0 ? { rotate: [0, -12, 12, -8, 0] } : {}} transition={{ duration: 0.4 }}>
        <ShoppingCart className="h-6 w-6 text-black" />
      </motion.div>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold text-black"
            style={{ background: "#fbbf24", boxShadow: "0 0 8px rgba(251,191,36,0.6)" }}
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
