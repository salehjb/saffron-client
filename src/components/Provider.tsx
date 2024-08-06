"use client";

import { FC, useMemo } from "react";
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
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  );

  const pathname = usePathname();

  const navbarNotShowRoutes = ["/admin"];
  const footerNotShowRoutes = ["/admin"];

  const showNavbar = !navbarNotShowRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const showFooter = !footerNotShowRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          {showNavbar && (
            <div className="mb-16">
              <Navbar />
            </div>
          )}
          <div>{children}</div>
          <Toaster />
          {showFooter && <Footer />}
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Provider;
