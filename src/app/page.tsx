import AboutUsHome from "@/components/AboutUsHome";
import HeroSection from "@/components/HeroSection";
import LatestProducts from "@/components/LatestProducts";
import WhyUs from "@/components/WhyUs";

const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <LatestProducts />
      <AboutUsHome />
      <WhyUs />
    </div>
  );
};

export default Home;
