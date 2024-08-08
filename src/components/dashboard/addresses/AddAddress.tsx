"use client";

import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { MapPinPlus } from "@/components/ui/MyIcons";
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
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddAddress = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [provinceSearch, setProvinceSearch] = useState<string>("");
  const [isProvincePopoverOpen, setIsProvincePopoverOpen] =
    useState<boolean>(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >(undefined);

  const [citySearch, setCitySearch] = useState<string>("");
  const [isCityPopoverOpen, setIsCityPopoverOpen] = useState<boolean>(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const { provinces } = useProvinces();
  const { cities: allCities } = useCities();
  const { refreshAddresses } = useDashboardAddress();
  const { user } = useUser();

  useEffect(() => {
    const filteredCities = allCities.filter(
      (city) => city.province_id === selectedProvinceId
    );
    setCities(filteredCities);
  }, [selectedProvinceId]);

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
      isReceiverMe: false,
      province: {
        id: undefined,
        title: "",
        slug: "",
        latitude: undefined,
        longitude: undefined,
      },
      city: {
        id: undefined,
        title: "",
        slug: "",
        province_id: undefined,
        latitude: undefined,
        longitude: undefined,
      },
      address: "",
      receiverInformation: {
        fullName: "",
        phoneNumber: "",
      },
      floor: undefined,
      unit: undefined,
      houseNumber: undefined,
      postalCode: undefined,
    },
  });

  const { mutate: addAddressHandler, isPending: isAddAddressLoading } =
    useMutation({
      mutationFn: async (payload: createAndUpdateAddressPayload) => {
        await api.post("/user/addresses/create", payload);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 400 &&
            err.response.data.data.error === "LIMIT_ADDRESS_COUNT"
          ) {
            toast({
              title: "شما نمیتوانید بیش از ۵ آدرس بسازید",
              variant: "destructive",
            });
          } else {
            toast({
              title: "مشکلی در ایجاد آدرس به وجود آمد",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: () => {
        setIsOpenModal(false);
        toast({
          title: "آدرس با موفقیت ایجاد شد",
          variant: "success",
        });
        resetForm();
        refreshAddresses();
      },
    });

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 gap-1">
          <MapPinPlus className="w-5 h-5" />
          افزودن آدرس
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit((e) => addAddressHandler(e))}
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
                        className="p-2 text-sm cursor-pointer hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                        onClick={() => {
                          setValue("province", province);
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
            <ErrorText error={errors.province} />
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
                  {cities
                    .filter((item) => item.title.includes(citySearch))
                    .map((city) => (
                      <li
                        className="p-2 text-sm   cursor-pointer hover:bg-muted rounded-md transition-colors flex items-center justify-between"
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
            <ErrorText error={errors.city} />
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
            isLoading={isAddAddressLoading}
          >
            افزودن آدرس
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
