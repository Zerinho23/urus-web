import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { count, setOpen } = useCart();

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "#ffffff",
        boxShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
        zIndex: 100002,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)";
      }}
    >
      <ShoppingCart className="h-6 w-6 text-black" />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold text-black"
          style={{ background: "#fbbf24", boxShadow: "0 0 8px rgba(251,191,36,0.6)" }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
