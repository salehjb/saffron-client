"use client";

import { separatePrice } from "@/lib";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SkeletonImage from "../ui/SkeletonImage";
import { Button, buttonVariants } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { useCart } from "@/context/CartContext";
import { Loader2, Minus, Plus } from "lucide-react";
import {
  useAddToCartMutation,
  useDecreaseFromCartMutation,
} from "@/mutations/cartMutations";

interface ProductBoxProps extends HTMLAttributes<HTMLDivElement> {
  product: IProduct;
}

export const ProductBox: FC<ProductBoxProps> = ({ product, ...props }) => {
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const { cart, refreshCart } = useCart();

  const addMutation = useAddToCartMutation(async () => {
    await refreshCart();
    setLocalLoading(false);
  });

  const decreaseMutation = useDecreaseFromCartMutation(async () => {
    await refreshCart();
    setLocalLoading(false);
  });

  const isProductInCart = cart?.items.some(
    (item) => item.productId === product.id
  );

  if (!cart) {
    return <SkeletonProductBox />;
  }

  return (
    <div
      className="overflow-hidden rounded-md bg-white h-[400px] flex flex-col justify-between"
      {...props}
    >
      <div className="relative w-full h-64">
        <SkeletonImage src={product.image} alt="product-image" fill />
      </div>
      <div className="p-3 space-y-3">
        <p>{product.name}</p>
        <p className="text-left">{separatePrice(product.price)} تومان</p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-[var(--saffron-light)] text-[var(--saffron-light)] hover:text-[var(--saffron-light)]"
            )}
          >
            مشاهده محصول
          </Link>
          {isProductInCart ? (
            <div className="grid grid-cols-3 gap-2">
              <Button
                className="bg-zinc-200 hover:bg-zinc-300 text-black"
                onClick={() => {
                  setLocalLoading(true);
                  decreaseMutation.mutate(product.id);
                }}
                disabled={localLoading}
              >
                <Minus className="w-3 h-3" />
              </Button>
              {localLoading ? (
                <Loader2 className="w-4 h-4 animate-spin m-auto text-zinc-300" />
              ) : (
                <div className="flex items-center justify-center">
                  {cart.items.find((item) => item.productId === product.id)
                    ?.quantity || 0}
                </div>
              )}
              <Button
                className="bg-zinc-200 hover:bg-zinc-300 text-black"
                onClick={() => {
                  setLocalLoading(true);
                  addMutation.mutate(product.id);
                }}
                disabled={localLoading}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-[var(--saffron-light)] hover:bg-[var(--saffron-dark)]"
              onClick={() => {
                setLocalLoading(true);
                addMutation.mutate(product.id);
              }}
              isLoading={localLoading}
            >
              افزودن به سبد
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const SkeletonProductBox = () => {
  return (
    <div className="overflow-hidden rounded-md bg-white h-[400px] flex flex-col justify-between">
      <Skeleton className="w-full h-64 rounded-b-none" />
      <div className="p-3 space-y-3">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="mr-auto w-1/3 h-4" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    </div>
  );
};
