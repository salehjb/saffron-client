import { MOBILE_REGEX } from "@/regexes";
import { z } from "zod";

export const createAndUpdateAddressValidator = z.object({
  isReceiverMe: z.boolean(),
  receiverInformation: z.object({
    fullName: z
      .string()
      .min(4, "نام و نام خانوادگی باید بین 4 تا 30 کاراکتر باشد")
      .max(30, "نام و نام خانوادگی باید بین 4 تا 30 کاراکتر باشد"),
    phoneNumber: z
      .string()
      .regex(MOBILE_REGEX, "شماره موبایل وارد شده اشتباه است"),
  }),
  province: z.object({
    id: z.number({
      required_error: "وارد کردن شناسه استان اجباریست",
    }),
    title: z.string().min(1, "وارد کردن نام استان اجباریست"),
    slug: z.string().min(1, "وارد کردن شناسه یکتا استان اجباریست"),
    latitude: z.number({
      required_error: "وارد کردن latitude استان اجباریست",
    }),
    longitude: z.number({
      required_error: "وارد کردن longitude استان اجباریست",
    }),
  }),
  city: z.object({
    id: z.number({
      required_error: "وارد کردن شناسه شهر اجباریست",
    }),
    title: z.string().min(1, "وارد کردن نام شهر اجباریست"),
    slug: z.string().min(1, "وارد کردن شناسه یکتا شهر اجباریست"),
    province_id: z.number({
      required_error: "وارد کردن شناسه استان اجباریست",
    }),
    latitude: z.number({
      required_error: "وارد کردن latitude شهر اجباریست",
    }),
    longitude: z.number({
      required_error: "وارد کردن longitude شهر اجباریست",
    }),
  }),
  address: z.string().min(8, "آدرس نمیتواند کمتر از 8 کاراکتر باشد"),
  houseNumber: z.string().min(1, "وارد کردن پلاک اجباری است"),
  floor: z.string().min(1, "وارد کردن طبقه اجباری است"),
  unit: z.string().min(1, "وارد کردن واحد اجباری است"),
  postalCode: z.string().length(10, "کد پستی باید 10 رقم باشد"),
});

export type createAndUpdateAddressPayload = z.infer<
  typeof createAndUpdateAddressValidator
>;
