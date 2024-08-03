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

interface AdminProductsContextType {
  products: IProduct[];
  isProductsLoading: boolean;
  isProductsRefresh: boolean;
  isFetchingNextPage: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  lastProductRef: (element: any) => void;
  refreshProducts: () => void;
  metadata: AdminProductsMetadataType;
}

interface AdminProductsMetadataType {
  totalProducts: number;
  totalSoldProducts: number;
  totalSalesAmount: number;
}

const AdminProductsContext = createContext<
  AdminProductsContextType | undefined
>(undefined);

export const AdminProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [metadata, setMetadata] = useState<AdminProductsMetadataType>({
    totalProducts: 0,
    totalSoldProducts: 0,
    totalSalesAmount: 0,
  });

  const fetchProducts = async (skip: number = 0, limit: number = 10) => {
    try {
      const {
        data: { data },
      } = await api.get(
        `/admin/products?limit=${limit}&skip=${skip}&search=${search}`
      );

      // Destructure Metadata
      const {
        totalProducts,
        totalSoldProducts,
        totalSalesAmount,
      }: AdminProductsMetadataType = data.metadata;

      // If Finished Products
      if (totalProducts <= skip + limit) setHasNextPage(false);

      // Set Products Metadata
      setMetadata({
        totalProducts,
        totalSoldProducts,
        totalSalesAmount,
      });

      // Return Products
      return data.products;
    } catch (error) {
      toast({
        title: "مشکلی در واکشی محصولات به وجود آمد",
        variant: "destructive",
      });
    }
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isProductsLoading,
    refetch: refreshProducts,
    isRefetching: isProductsRefresh,
  } = useInfiniteQuery({
    queryKey: ["products", search],
    queryFn: ({ pageParam }) => fetchProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.flat(1).length,
    enabled: !search,
  });

  const { data: searchResults } = useQuery({
    queryKey: ["products-search", search],
    queryFn: () => fetchProducts(0, 10),
    enabled: !!search,
  });

  const lastProductRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastProductRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    refreshProducts();
  }, [search]);

  const products = search ? searchResults || [] : data?.pages.flat(1) || [];

  return (
    <AdminProductsContext.Provider
      value={{
        products,
        metadata,
        isProductsLoading,
        isProductsRefresh,
        isFetchingNextPage,
        search,
        setSearch,
        lastProductRef: ref,
        refreshProducts,
      }}
    >
      {children}
    </AdminProductsContext.Provider>
  );
};

export const useAdminProducts = () => {
  const context = useContext(AdminProductsContext);
  if (!context) {
    throw new Error(
      "useAdminProducts must be used within a AdminProductsProvider"
    );
  }
  return context;
};
