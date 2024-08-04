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

interface AdminOrdersContextType {
  orders: IOrder[];
  isOrdersLoading: boolean;
  isOrdersRefresh: boolean;
  isFetchingNextPage: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  lastOrderRef: (element: any) => void;
  refreshOrders: () => void;
  metadata: AdminOrdersMetadataType;
}

interface AdminOrdersMetadataType {
  totalOrders: number;
  totalPendingOrders: number;
  totalProcessingOrders: number;
  totalShippedOrders: number;
  totalDeliveredOrders: number;
  totalCanceledOrders: number;
}

const AdminOrdersContext = createContext<AdminOrdersContextType | undefined>(
  undefined
);

export const AdminOrdersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [metadata, setMetadata] = useState<AdminOrdersMetadataType>({
    totalOrders: 0,
    totalPendingOrders: 0,
    totalProcessingOrders: 0,
    totalShippedOrders: 0,
    totalDeliveredOrders: 0,
    totalCanceledOrders: 0,
  });

  const fetchOrders = async (skip: number = 0, limit: number = 0) => {
    try {
      const {
        data: { data },
      } = await api.get(
        `/admin/orders?limit=${limit}&skip=${skip}&search=${search}`
      );

      // Destructure Metadata
      const {
        totalOrders,
        totalPendingOrders,
        totalProcessingOrders,
        totalShippedOrders,
        totalDeliveredOrders,
        totalCanceledOrders,
      }: AdminOrdersMetadataType = data.metadata;

      // If Finished Orders
      if (totalOrders <= skip + limit) setHasNextPage(false);

      // Set Orders Metadata
      setMetadata({
        totalOrders,
        totalPendingOrders,
        totalProcessingOrders,
        totalShippedOrders,
        totalDeliveredOrders,
        totalCanceledOrders,
      });

      // Return Orders
      return data.orders;
    } catch (error) {
      toast({
        title: "مشکلی در واکشی سفارشات به وجود آمد",
        variant: "destructive",
      });
    }
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isOrdersLoading,
    refetch: refreshOrders,
    isRefetching: isOrdersRefresh,
  } = useInfiniteQuery({
    queryKey: ["orders", search],
    queryFn: ({ pageParam }) => fetchOrders(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.flat(1).length,
    enabled: !search,
  });

  const { data: searchResults } = useQuery({
    queryKey: ["orders-search", search],
    queryFn: () => fetchOrders(0, 10),
    enabled: !!search,
  });

  const lastOrderRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastOrderRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    refreshOrders();
  }, [search]);

  const orders = search ? searchResults || [] : data?.pages.flat(1) || [];

  return (
    <AdminOrdersContext.Provider
      value={{
        orders,
        metadata,
        isOrdersLoading,
        isOrdersRefresh,
        isFetchingNextPage,
        search,
        setSearch,
        lastOrderRef: ref,
        refreshOrders,
      }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useAdminOrders = () => {
  const context = useContext(AdminOrdersContext);
  if (!context) {
    throw new Error("useAdminOrders must be used within a AdminOrdersProvider");
  }
  return context;
};
