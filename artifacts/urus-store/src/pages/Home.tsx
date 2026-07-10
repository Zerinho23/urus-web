import { Suspense, lazy } from "react";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";

// Below-the-fold sections are code-split so the initial bundle only ships
// what's needed for the first paint (hero + products).
const FreeProductsSection = lazy(() => import("@/components/FreeProductsSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));

function SectionFallback() {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-cyan-400 animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: "#050608", minHeight: "100vh", color: "white", fontFamily: "'Outfit', sans-serif" }}>
      <div className="fixed top-0 left-0 w-full z-50 flex flex-col">
        <TopBanner />
        <Header />
      </div>

      <main>
        <HeroSection />
        <div className="px-0">
          <ProductsSection />
          <Suspense fallback={<SectionFallback />}>
            <FreeProductsSection />
            <ReviewsSection />
            <FeaturesSection />
          </Suspense>
        </div>
      </main>

      <Footer />
      <CartButton />
    </div>
  );
}
