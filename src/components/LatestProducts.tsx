import { separatePrice } from "@/lib";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";
import ProductBox from "./ProductBox";

const LATEST_PRODUCTS = [
  {
    image:
      "https://i.pinimg.com/236x/c6/03/82/c60382b2b5b7144b9e227e28408e6868.jpg",
    title: "زعفران سر گل ۲ مثقال",
    price: 1775000,
  },
  {
    image:
      "https://i.pinimg.com/236x/8b/c2/89/8bc28931b25ae7f327c18d26a1c3e432.jpg",
    title: "زعفران نگین ۴ گرم",
    price: 775000,
  },
  {
    image:
      "https://i.pinimg.com/236x/38/27/2a/38272a3a9805bb7cf7e75ff6ae0e8a8a.jpg",
    title: "زعفران سرگل ۱ مثقال کاور",
    price: 895000,
  },
  {
    image:
      "https://i.pinimg.com/236x/b0/e2/93/b0e293a5d37592a5b711aa600f1ba83f.jpg",
    title: "زعفران سرگل ۵ گرم خاتم",
    price: 235000,
  },
  {
    image:
      "https://i.pinimg.com/236x/a5/1d/1f/a51d1fdf600eb1d15830e73a638bd4b7.jpg",
    title: "زعفران سرگل ۵ گرم خاتم",
    price: 235000,
  },
];

const LatestProducts = () => {
  return (
    <div className="container">
      {/* Title */}
      <h2 className="text-xl lg:text-2xl font-yekan-bakh-heavy mb-6">
        آخرین محصولات
      </h2>
      {/* Products */}
      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent>
          {LATEST_PRODUCTS.map((product, i) => (
            <CarouselItem
              key={i}
              className="basis-auto md:basis-1/2 lg:basis-1/4 shadow-lg"
            >
              <ProductBox key={i} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselNext />
          <CarouselPrevious />
        </div>
      </Carousel>
    </div>
  );
};

export default LatestProducts;
