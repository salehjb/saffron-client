import { MOBILE_REGEX } from "@/regexes";
import z from "zod";

export const editUserValidator = z.object({
  fullName: z
    .string()
    .min(4, "نام و نام خانوادگی باید بین 4 تا 30 کاراکتر باشد")
    .max(30, "نام و نام خانوادگی باید بین 4 تا 30 کاراکتر باشد"),
  phoneNumber: z
    .string()
    .regex(MOBILE_REGEX, "شماره موبایل وارد شده اشتباه است"),
  role: z.enum(["USER", "ADMIN"], {
    message: "نقش وارد شده صحیح نمیباشد",
  }),
});

export type editUserPayload = z.infer<typeof editUserValidator>;
