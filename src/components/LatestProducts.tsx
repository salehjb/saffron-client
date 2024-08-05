"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ProductBox, SkeletonProductBox } from "./products/ProductBox";

const LatestProducts = () => {
  const fetchLatestProducts = async (skip: number = 0, limit: number = 5) => {
    const {
      data: { data },
    } = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return data.products;
  };

  const { data: products, isLoading } = useQuery<IProduct[]>({
    queryKey: ["latest-products"],
    queryFn: () => fetchLatestProducts(),
  });

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
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-auto md:basis-1/2 lg:basis-1/4 shadow-lg"
                >
                  <SkeletonProductBox />
                </CarouselItem>
              ))
            : products?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-auto md:basis-1/2 lg:basis-1/4 shadow-lg"
                >
                  <ProductBox product={product} />
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
