"use client";

import api from "@/lib/api";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  user: IUser | null;
  isUserLoading: boolean;
  isUser: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getAccessToken();

  const [user, setUser] = useState<IUser | null>(null);
  const [isUser, setIsUser] = useState<boolean>(!!accessToken);

  const { refetch: refreshUser, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!accessToken) return;
      const { data } = await api.get("/profile/get-me");
      const user = data.data.user;
      setUser(user);
    },
  });

  return (
    <UserContext.Provider
      value={{ user, isUserLoading: isLoading, isUser, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const logoutUser = () => {
  removeAccessToken();
  removeRefreshToken();
  location.reload();
  location.replace("http://localhost:3000/");
};
