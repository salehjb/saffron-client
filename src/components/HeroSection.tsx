import { cn } from "@/lib/utils";
import Image from "next/image";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="container grid lg:grid-cols-2 items-center">
      {/* Right Section */}
      <div className="animate-slidein-right space-y-3 order-2 lg:order-1 mt-10 lg:mt-0 flex flex-col items-center lg:items-start">
        <h2 className="text-3xl text-center lg:text-right lg:text-6xl font-yekan-bakh-fat text-[var(--saffron-light)]">
          زعفرانی به رنگ طلای سرخ، به عطر باغ‌های ایران. کیفیت را تجربه کنید.
        </h2>
        <div>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-[var(--saffron-light)] text-[var(--saffron-light)] hover:text-[var(--saffron-light)]"
            )}
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
      {/* Left Section */}
      <div className="animate-slidein-left flex justify-center lg:justify-end order-1 lg:order-2">
        <div className="relative w-full h-44 lg:w-[400px] lg:h-[400px]">
          <div className="absolute w-full h-full bg-red-500 rounded-full blur-2xl"></div>
          <Image
            src="/photos/saffron-hero-section.png"
            alt="saffron hero section"
            fill
            className="object-contain rotate-12"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
