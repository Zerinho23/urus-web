import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FreeProductsSection from "@/components/FreeProductsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";

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
          <FreeProductsSection />
          <ReviewsSection />
          <FeaturesSection />
        </div>
      </main>

      <Footer />
      <CartButton />
    </div>
  );
}
