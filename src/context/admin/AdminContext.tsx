"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface AdminContextType {
  categories: ICategory[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchCategories = async () => {
    const {
      data: { data },
    } = await api.get(`/admin/categories?limit=unlimited`);

    return data.categories;
  };

  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: () => fetchCategories(),
  });

  return (
    <AdminContext.Provider value={{ categories: categories || [] }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within a AdminProvider");
  }
  return context;
};
