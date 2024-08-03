"use client";

import { useAdminProducts } from "@/context/admin/AdminProductsContext";
import { Boxes, Coins, PackageCheck } from "lucide-react";

const ProductsMetadata = () => {
  const { metadata } = useAdminProducts();

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-yellow-200 p-2 rounded-md">
          <Boxes className="text-yellow-500" />
        </div>
        <span className="text-zinc-600">
          تعداد کل محصولات: {metadata.totalProducts} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-blue-200 p-2 rounded-md">
          <PackageCheck className="text-blue-500" />
        </div>
        <span className="text-zinc-600">
          تعداد کل فروش: {metadata.totalSoldProducts} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-green-200 p-2 rounded-md">
          <Coins className="text-green-500" />
        </div>
        <span className="text-zinc-600">
          جمع فروش: {metadata.totalSalesAmount} تومان
        </span>
      </div>
    </div>
  );
};

export default ProductsMetadata;
