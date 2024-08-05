"use client";

import { FC } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Navbar from "./Navbar";
import { Toaster } from "./ui/Toaster";
import Footer from "./Footer";
import { UserProvider } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          {!isAdminRoute && <Navbar />}
          <div className={`${!isAdminRoute ? "mt-14 lg:mt-20" : ""}`}>
            {children}
          </div>
          <Toaster />
          {!isAdminRoute && <Footer />}
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Provider;
