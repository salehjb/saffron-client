import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";
import z from "zod";

export const createProductValidator = z.object({
  name: z
    .string()
    .min(5, "نام محصول باید بین 5 تا 40 کاراکتر باشد")
    .max(40, "نام محصول باید بین 5 تا 40 کاراکتر باشد"),
  description: z
    .string()
    .min(8, "توضیحات محصول نمیتواند کمتر از 8 کاراکتر باشد"),
  price: z.number({
    required_error: "وارد کردن قیمت محصول اجباری است",
  }),
  image: z
    .any()
    .refine((file) => !!file, "آپلود تصویر محصول اجباری میباشد")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "تایپ فایل آپلود شده صحیح نمیباشد"
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "حجم تصویر نمیتواند بیش از 2 مگابایت باشد"
    ),
  categoryId: z.string().min(1, "وارد کردن دسته بندی اجباری است"),
});

export type createProductPayload = z.infer<typeof createProductValidator>;

export const updateProductValidator = z.object({
  name: z
    .string()
    .min(5, "نام محصول باید بین 5 تا 40 کاراکتر باشد")
    .max(40, "نام محصول باید بین 5 تا 40 کاراکتر باشد"),
  description: z
    .string()
    .min(8, "توضیحات محصول نمیتواند کمتر از 8 کاراکتر باشد"),
  price: z.number({
    required_error: "وارد کردن قیمت محصول اجباری است",
  }),
  image: z
    .any()
    .refine((file) => !!file, "آپلود تصویر محصول اجباری میباشد")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "تایپ فایل آپلود شده صحیح نمیباشد"
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "حجم تصویر نمیتواند بیش از 2 مگابایت باشد"
    )
    .or(z.literal(null)),
  categoryId: z.string().min(1, "وارد کردن دسته بندی اجباری است"),
});

export type updateProductPayload = z.infer<typeof updateProductValidator>;
