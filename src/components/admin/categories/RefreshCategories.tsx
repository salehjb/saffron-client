"use client";

import { Button } from "@/components/ui/Button";
import { useAdminCategories } from "@/context/admin/AdminCategoriesContext";
import { RotateCw } from "lucide-react";

const RefreshCategories = () => {
  const { refreshCategories, isCategoriesRefresh } = useAdminCategories();

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 gap-2"
      onClick={refreshCategories}
    >
      <RotateCw
        className={`w-5 h-5 ${isCategoriesRefresh ? "animate-spin" : ""}`}
      />
      رفرش
    </Button>
  );
};

export default RefreshCategories;
