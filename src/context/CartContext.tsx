"use client";

import api from "@/lib/api";
import { getAccessToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

interface CartContextType {
  cart: ICart;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getAccessToken();

  const fetchCart = async () => {
    if (!accessToken) return;
    const {
      data: { data },
    } = await api.get("/cart");
    return data.cart;
  };

  const { data: cart, refetch: refreshCart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
