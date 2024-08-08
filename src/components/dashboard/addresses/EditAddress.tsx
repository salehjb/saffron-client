"use client";

import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useDashboardAddress } from "@/context/dashboard/DashboardAddressContext";
import { useUser } from "@/context/UserContext";
import { useCities } from "@/hooks/use-cities";
import { useProvinces } from "@/hooks/use-provinces";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  createAndUpdateAddressPayload,
  createAndUpdateAddressValidator,
} from "@/validations/dashboard/address.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, ChevronsUpDown, Edit } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface EditAddressProps {
  address: IAddress;
}

const EditAddress: FC<EditAddressProps> = ({ address }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [provinceSearch, setProvinceSearch] = useState<string>("");
  const [isProvincePopoverOpen, setIsProvincePopoverOpen] =
    useState<boolean>(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >(address.province.id || undefined);

  const [citySearch, setCitySearch] = useState<string>("");
  const [isCityPopoverOpen, setIsCityPopoverOpen] = useState<boolean>(false);

  const { provinces } = useProvinces();
  const { cities: allCities } = useCities();
  const { refreshAddresses } = useDashboardAddress();
  const { user } = useUser();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<createAndUpdateAddressPayload>({
    resolver: zodResolver(createAndUpdateAddressValidator),
    defaultValues: {
      isReceiverMe: address.isReceiverMe || false,
      province: address.province,
      city: address.city,
      address: address.address,
      receiverInformation: address.receiverInformation,
      floor: String(address.floor),
      unit: String(address.unit),
      houseNumber: String(address.houseNumber),
      postalCode: String(address.postalCode),
    },
  });

  const { mutate: updateAddressHandler, isPending: isUpdateAddressLoading } =
    useMutation({
      mutationFn: async (payload: createAndUpdateAddressPayload) => {
        await api.put(`/user/addresses/update/${address.id}`, payload);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 400 &&
            err.response.data.data.error === "ACTIVE_ORDER"
          ) {
            toast({
              title:
                "شما با این آدرس سفارش تکمیل نشده دارید. امکان بروزرسانی وجود ندارد",
              variant: "destructive",
            });
          } else {
            toast({
              title: "مشکلی در بروزرسانی آدرس به وجود آمد",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: () => {
        setIsOpenModal(false);
        toast({
          title: "آدرس با موفقیت بروزرسانی شد",
          variant: "success",
        });
        resetForm();
        refreshAddresses();
      },
    });

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start gap-2">
          <Edit className="w-4 h-4" />
          بروزرسانی آدرس
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit((e) => updateAddressHandler(e))}
        >
          <div className="space-y-1">
            <Label>استان</Label>
            <Popover
              open={isProvincePopoverOpen}
              onOpenChange={setIsProvincePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between text-zinc-600"
                >
                  {watch("province.title").length > 0
                    ? watch("province.title")
                    : "انتخاب استان..."}
                  <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-h-64 overflow-y-auto">
                <Input
                  value={provinceSearch}
                  onChange={(e) => setProvinceSearch(e.target.value)}
                  className="h-8 text-sm"
                  placeholder="سرچ کنید..."
                />
                <ul className="flex flex-col mt-2">
                  {provinces
                    .filter((item) => item.title.includes(provinceSearch))
                    .map((province) => (
                      <li
                        key={province.id}
                        className="p-2 text-sm cursor-pointer hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                        onClick={() => {
                          setValue("province", province);
                          setValue("city", {
                            id: 0,
                            title: "",
                            slug: "",
                            province_id: 0,
                            latitude: 0,
                            longitude: 0,
                          });
                          setSelectedProvinceId(province.id);
                          setIsProvincePopoverOpen(false);
                          setProvinceSearch("");
                        }}
                      >
                        {province.title}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            watch("province.title") === province.title
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </li>
                    ))}
                </ul>
              </PopoverContent>
            </Popover>
            <ErrorText error={errors.province?.title} />
          </div>
          <div className="space-y-1">
            <Label>شهر</Label>
            <Popover
              open={isCityPopoverOpen}
              onOpenChange={setIsCityPopoverOpen}
            >
              <PopoverTrigger asChild disabled={!selectedProvinceId}>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between text-zinc-600"
                >
                  {watch("city.title").length > 0
                    ? watch("city.title")
                    : "انتخاب شهر..."}
                  <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-h-64 overflow-y-auto">
                <Input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="h-8 text-sm"
                  placeholder="سرچ کنید..."
                />
                <ul className="flex flex-col mt-2">
                  {allCities
                    .filter((item) => item.province_id === selectedProvinceId)
                    .filter((item) => item.title.includes(citySearch))
                    .map((city) => (
                      <li
                        key={city.id}
                        className="p-2 text-sm cursor-pointer hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                        onClick={() => {
                          setValue("city", city);
                          setIsCityPopoverOpen(false);
                          setCitySearch("");
                        }}
                      >
                        {city.title}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            watch("city.title") === city.title
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </li>
                    ))}
                </ul>
              </PopoverContent>
            </Popover>
            <ErrorText error={errors.city?.title} />
          </div>
          <div className="space-y-1">
            <Label>آدرس دقیق</Label>
            <Input {...register("address")} />
            <ErrorText error={errors.address} />
          </div>
          <div className="space-y-1">
            <Label>پلاک</Label>
            <Input {...register("houseNumber")} />
            <ErrorText error={errors.houseNumber} />
          </div>
          <div className="space-y-1">
            <Label>طبقه</Label>
            <Input {...register("floor")} />
            <ErrorText error={errors.floor} />
          </div>
          <div className="space-y-1">
            <Label>واحد</Label>
            <Input {...register("unit")} />
            <ErrorText error={errors.unit} />
          </div>
          <div className="space-y-1">
            <Label>کد پستی</Label>
            <Input {...register("postalCode")} />
            <ErrorText error={errors.postalCode} />
          </div>
          <div className="col-span-2 border-t pt-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>گیرنده خودم هستم</span>
              <Checkbox
                checked={watch("isReceiverMe")}
                onCheckedChange={(checked: boolean) => {
                  setValue("isReceiverMe", checked);
                  if (checked) {
                    setValue("receiverInformation", {
                      fullName: user?.fullName || "",
                      phoneNumber: user?.phoneNumber || "",
                    });
                  } else {
                    setValue("receiverInformation", {
                      fullName: "",
                      phoneNumber: "",
                    });
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>نام و نام خانوادگی گیرنده</Label>
                <Input
                  {...register("receiverInformation.fullName")}
                  disabled={watch("isReceiverMe")}
                />
                <ErrorText error={errors.receiverInformation?.fullName} />
              </div>
              <div className="space-y-1">
                <Label>شماره همراه گیرنده</Label>
                <Input
                  {...register("receiverInformation.phoneNumber")}
                  disabled={watch("isReceiverMe")}
                />
                <ErrorText error={errors.receiverInformation?.phoneNumber} />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="col-span-2 bg-green-500 hover:bg-green-600"
            isLoading={isUpdateAddressLoading}
          >
            بروزرسانی آدرس
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddress;
