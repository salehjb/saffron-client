"use client";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AdminCategoriesContextType {
  categories: ICategory[] | null;
  metadata: AdminCategoriesMetadataType;
  isCategoriesLoading: boolean;
  isCategoriesRefresh: boolean;
  isFetchingNextPage: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  lastCategoryRef: (element: any) => void;
  refreshCategories: () => void;
}

interface AdminCategoriesMetadataType {
  totalCategories: number;
}

const AdminCategoriesContext = createContext<
  AdminCategoriesContextType | undefined
>(undefined);

export const AdminCategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [metadata, setMetadata] = useState<AdminCategoriesMetadataType>({
    totalCategories: 0,
  });

  const fetchCategories = async (skip: number = 0, limit: number = 30) => {
    try {
      const {
        data: { data },
      } = await api.get(
        `/admin/categories?limit=${limit}&skip=${skip}&search=${search}`
      );

      // Destructure Metadata
      const { totalCategories }: AdminCategoriesMetadataType = data.metadata;

      // If Finished Categories
      if (totalCategories <= skip + limit) setHasNextPage(false);

      // Set Categories Metadata
      setMetadata({
        totalCategories,
      });

      // Return Categories
      return data.categories;
    } catch (error) {
      toast({
        title: "مشکلی در واکشی دسته بندی ها به وجود آمد",
        variant: "destructive",
      });
    }
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isCategoriesLoading,
    refetch: refreshCategories,
    isRefetching: isCategoriesRefresh,
  } = useInfiniteQuery({
    queryKey: ["categories", search],
    queryFn: ({ pageParam }) => fetchCategories(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.flat(1).length,
    enabled: !search,
  });

  const { data: searchResults } = useQuery({
    queryKey: ["categories-search", search],
    queryFn: () => fetchCategories(0, 30),
    enabled: !!search,
  });

  const lastCategoryRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastCategoryRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    refreshCategories();
  }, [search]);

  const categories = search ? searchResults || [] : data?.pages.flat(1) || [];

  return (
    <AdminCategoriesContext.Provider
      value={{
        categories,
        metadata,
        isCategoriesLoading,
        isCategoriesRefresh,
        isFetchingNextPage,
        search,
        setSearch,
        lastCategoryRef: ref,
        refreshCategories,
      }}
    >
      {children}
    </AdminCategoriesContext.Provider>
  );
};

export const useAdminCategories = () => {
  const context = useContext(AdminCategoriesContext);
  if (!context) {
    throw new Error(
      "useAdminCategories must be used within a AdminCategoriesProvider"
    );
  }
  return context;
};
