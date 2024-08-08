"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface DashboardAddressContextType {
  addresses: IAddress[];
  refreshAddresses: () => void;
  isAddressesLoading: boolean;
}

const DashboardAddressContext = createContext<
  DashboardAddressContextType | undefined
>(undefined);

export const DashboardAddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetchAddresses = async () => {
    const {
      data: { data },
    } = await api.get("/user/addresses");
    return data.addresses;
  };

  const {
    data: addresses,
    refetch: refreshAddresses,
    isLoading: isAddressesLoading,
  } = useQuery({
    queryKey: ["dashboard-addresses"],
    queryFn: () => fetchAddresses(),
  });

  return (
    <DashboardAddressContext.Provider
      value={{ addresses, refreshAddresses, isAddressesLoading }}
    >
      {children}
    </DashboardAddressContext.Provider>
  );
};

export const useDashboardAddress = () => {
  const context = useContext(DashboardAddressContext);
  if (!context) {
    throw new Error(
      "useDashboardAddresses must be used within a DashboardAddressProvider"
    );
  }
  return context;
};
