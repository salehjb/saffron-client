"use client";

import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useDashboardAddress } from "@/context/dashboard/DashboardAddressContext";
import {
  Ellipsis,
  Loader2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import RemoveAddress from "./RemoveAddress";
import EditAddress from "./EditAddress";
import { useState } from "react";

const AddressesList = () => {
  const { addresses, isAddressesLoading } = useDashboardAddress();

  return (
    <>
      {!isAddressesLoading ? (
        <>
          {addresses.length ? (
            <ul className="grid grid-cols-2 gap-4">
              {addresses?.map((address) => (
                <li
                  key={address.id}
                  className="p-4 rounded-md border text-sm flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-yekan-bakh-bold">{address.address}</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Ellipsis className="w-5 h-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 !p-2">
                        <div className="text-sm grid grid-cols-1">
                          <EditAddress address={address} />
                          <RemoveAddress addressId={address.id} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="text-zinc-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {address.city.title}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {address.postalCode}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {address.receiverInformation.phoneNumber}
                    </div>
                    <div className="flex items-center gap-1">
                      <UserRound className="w-4 h-4" />
                      {address.receiverInformation.fullName}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm">شما هنوز آدرسی اضافه نکردید.</p>
          )}
        </>
      ) : (
        <Loader2 className="w-8 h-8 animate-spin mx-auto mt-4 text-zinc-500" />
      )}
    </>
  );
};

export default AddressesList;
