"use client";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
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
import { useIntersection } from "@mantine/hooks";

interface AdminUsersContextType {
  users: IUser[] | null;
  isUsersLoading: boolean;
  isUsersRefresh: boolean;
  isFetchingNextPage: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  lastUserRef: (element: any) => void;
  refreshUsers: () => void;
  metadata: AdminUsersMetadataType;
}

interface AdminUsersMetadataType {
  totalUsers: number;
  numberOfUsers: number;
  numberOfAdmins: number;
}

const AdminUsersContext = createContext<AdminUsersContextType | undefined>(
  undefined
);

export const AdminUsersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [metadata, setMetadata] = useState<AdminUsersMetadataType>({
    totalUsers: 0,
    numberOfUsers: 0,
    numberOfAdmins: 0,
  });

  const fetchUsers = async (skip: number = 0, limit: number = 10) => {
    try {
      const {
        data: { data },
      } = await api.get(
        `/admin/users?limit=${limit}&skip=${skip}&search=${search}`
      );

      // Destructure Metadata
      const {
        totalUsers,
        numberOfUsers,
        numberOfAdmins,
      }: AdminUsersMetadataType = data.metadata;

      // If Finished Users
      if (totalUsers <= skip + limit) setHasNextPage(false);

      // Set Users Metadata
      setMetadata({
        totalUsers,
        numberOfUsers,
        numberOfAdmins,
      });

      // Return Users
      return data.users;
    } catch (error) {
      toast({
        title: "مشکلی در واکشی کاربران به وجود آمد",
        variant: "destructive",
      });
    }
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isUsersLoading,
    refetch: refreshUsers,
    isRefetching: isUsersRefresh,
  } = useInfiniteQuery({
    queryKey: ["users", search],
    queryFn: ({ pageParam }) => fetchUsers(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.flat(1).length,
    enabled: !search,
  });

  const { data: searchResults } = useQuery({
    queryKey: ["users-search", search],
    queryFn: () => fetchUsers(0, 10),
    enabled: !!search,
  });

  const lastUserRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastUserRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry]);

  useEffect(() => {
    refreshUsers();
  }, [search]);

  const users = search ? searchResults || [] : data?.pages.flat(1) || [];

  return (
    <AdminUsersContext.Provider
      value={{
        users,
        metadata,
        isUsersLoading,
        isUsersRefresh,
        isFetchingNextPage,
        search,
        setSearch,
        lastUserRef: ref,
        refreshUsers,
      }}
    >
      {children}
    </AdminUsersContext.Provider>
  );
};

export const useAdminUsers = () => {
  const context = useContext(AdminUsersContext);
  if (!context) {
    throw new Error("useAdminUsers must be used within a AdminUsersProvider");
  }
  return context;
};
