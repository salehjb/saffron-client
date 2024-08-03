"use client";

import { Button } from "@/components/ui/Button";
import { useAdminCategories } from "@/context/admin/AdminCategoriesContext";
import { Edit, Loader2 } from "lucide-react";
import RemoveCategory from "./RemoveCategory";
import EditCategory from "./EditCategory";

const CategoriesList = () => {
  const {
    categories,
    isCategoriesLoading,
    isFetchingNextPage,
    lastCategoryRef,
  } = useAdminCategories();

  return (
    <>
      <ul className="grid grid-cols-4 gap-4">
        {categories?.map((category, i) => (
          <li
            key={category.id}
            ref={categories.length - 1 === i ? lastCategoryRef : null}
            className="p-4 border rounded-md text-sm space-y-2"
          >
            <p className="font-yekan-bakh-heavy">{category.name}</p>
            <p>تعداد محصولات: {category._count.products} عدد</p>
            <div className="grid grid-cols-2 gap-2">
              <EditCategory category={category} />
              <RemoveCategory category={category} />
            </div>
          </li>
        ))}
      </ul>
      {(isCategoriesLoading || isFetchingNextPage) && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {!isCategoriesLoading && categories?.length === 0 && (
        <p className="text-center">دسته بندی یافت نشد!</p>
      )}
    </>
  );
};

export default CategoriesList;
