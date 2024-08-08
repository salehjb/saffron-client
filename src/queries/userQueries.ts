import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useUserAddresses = () => {
  const fetchAddresses = async () => {
    const {
      data: { data },
    } = await api.get("/user/addresses");
    return data.addresses as IAddress[];
  };

  const { data: addresses, isLoading: isUserAddressesLoading } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: () => fetchAddresses(),
  });

  return { addresses, isUserAddressesLoading };
};
