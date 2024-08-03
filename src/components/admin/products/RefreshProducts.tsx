"use client";

import { Button } from "@/components/ui/Button";
import { useAdminProducts } from "@/context/admin/AdminProductsContext";
import { RotateCw } from "lucide-react";

const RefreshProducts = () => {
  const { refreshProducts, isProductsRefresh } = useAdminProducts();

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 gap-2"
      onClick={refreshProducts}
    >
      <RotateCw
        className={`w-5 h-5 ${isProductsRefresh ? "animate-spin" : ""}`}
      />
      رفرش
    </Button>
  );
};

export default RefreshProducts;
