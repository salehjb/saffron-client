import { separatePrice } from "@/lib";
import { FC, HTMLAttributes } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductBoxProps extends HTMLAttributes<HTMLDivElement> {
  product: IProduct;
}

const ProductBox: FC<ProductBoxProps> = ({ product, ...props }) => {
  return (
    <div className="overflow-hidden rounded-md bg-white" {...props}>
      <img src={product.image} className="object-cover w-full h-52" />
      <div className="p-3 space-y-3">
        <p>{product.title}</p>
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
          <Button className="bg-[var(--saffron-light)] hover:bg-[var(--saffron-dark)]">
            افزودن به سبد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
