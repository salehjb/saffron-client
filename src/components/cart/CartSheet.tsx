"use client";

import { Loader2, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/Sheet";
import { useCart } from "@/context/CartContext";
import SkeletonImage from "../ui/SkeletonImage";
import { separatePrice } from "@/lib";
import { useState } from "react";
import {
  useAddToCartMutation,
  useDecreaseFromCartMutation,
} from "@/mutations/cartMutations";
import CartItemBox from "./CartItemBox";

const CartSheet = () => {
  const { cart, refreshCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="bg-zinc-100 hover:bg-zinc-200 text-black rounded-full"
        >
          <ShoppingBasket className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader></SheetHeader>
        {!cart ? (
          <Loader2 className="w-7 h-7 animate-spin mx-auto" />
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-4 mt-10">
              {cart.items.map((item, i) => (
                <CartItemBox
                  key={item.product.id}
                  className={`flex gap-3 ${
                    cart.items.length - 1 !== i ? "border-b pb-4" : ""
                  }`}
                  item={item}
                  refreshCart={refreshCart}
                />
              ))}
            </ul>
            <SheetFooter></SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
