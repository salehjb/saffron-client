"use client";

import { Loader2, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/Button";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "../ui/Sheet";
import { useCart } from "@/context/CartContext";
import CartItemBox from "./CartItemBox";
import { Select, SelectTrigger, SelectValue } from "../ui/Select";

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
            <SheetFooter className="w-full p-4 m-0 absolute left-0 bottom-0 border-t">
              <div className="w-full flex flex-col gap-2">
                <Select dir="rtl">
                  <SelectTrigger>
                    <SelectValue placeholder="آدرس را انتخاب کنید" />
                  </SelectTrigger>
                </Select>
                <Button className="bg-[var(--saffron-light)] hover:bg-[var(--saffron-dark)]">
                  ثبت سفارش
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
