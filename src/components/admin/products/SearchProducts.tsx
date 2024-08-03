"use client"

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAdminProducts } from "@/context/admin/AdminProductsContext";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchProducts = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const { setSearch } = useAdminProducts();

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="جستجو بر اساس نام و دسته بندی..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button
        className="bg-blue-500 hover:bg-blue-600 gap-1"
        onClick={() => setSearch(searchInput)}
      >
        <Search className="w-5 h-5" />
        جستجو
      </Button>
    </div>
  );
};

export default SearchProducts;
