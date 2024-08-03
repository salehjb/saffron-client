"use client";

import { useAdminCategories } from "@/context/admin/AdminCategoriesContext";
import { ListTree } from "lucide-react";

const CategoriesMetadata = () => {
  const { metadata } = useAdminCategories();

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-yellow-200 p-2 rounded-md">
          <ListTree className="text-yellow-500" />
        </div>
        <span className="text-zinc-600">
          تعداد دسته بندی ها: {metadata.totalCategories} عدد
        </span>
      </div>
    </div>
  );
};

export default CategoriesMetadata;
