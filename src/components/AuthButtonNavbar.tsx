"use client";

import { useMediaQuery } from "usehooks-ts";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { Button } from "./ui/Button";
import { LogIn } from "lucide-react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/InputOtp";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/Drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { useForm, UseFormReset } from "react-hook-form";
import {
  checkOtpPayload,
  checkOtpValidator,
  loginPayload,
  loginValidator,
  registerPayload,
  registerValidator,
} from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { setAccessToken, setRefreshToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import ErrorText from "./ErrorText";

interface AuthButtonNavbarProps {}

const AuthButtonNavbar: FC<AuthButtonNavbarProps> = () => {
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpenAuthModal} onOpenChange={setIsOpenAuthModal}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-1">
            <LogIn className="w-5 h-5" />{" "}
            <span className="font-yekan-bakh-bold">ورود</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <AuthContent
            isOtpSend={isOtpSend}
            setIsOtpSend={setIsOtpSend}
            setIsOpenAuthModal={setIsOpenAuthModal}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpenAuthModal} onOpenChange={setIsOpenAuthModal}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-1">
          <LogIn className="w-5 h-5" />{" "}
          <span className="font-yekan-bakh-bold">ورود</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <AuthContent
          isOtpSend={isOtpSend}
          setIsOtpSend={setIsOtpSend}
          setIsOpenAuthModal={setIsOpenAuthModal}
        />
      </DrawerContent>
    </Drawer>
  );
};

interface AuthContentProps {
  isOtpSend: boolean;
  setIsOtpSend: Dispatch<SetStateAction<boolean>>;
  setIsOpenAuthModal: Dispatch<SetStateAction<boolean>>;
}

const AuthContent: FC<AuthContentProps> = ({
  isOtpSend,
  setIsOtpSend,
  setIsOpenAuthModal,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Login Form State
  const {
    handleSubmit: loginHandleSubmit,
    register: loginFormRegister,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<loginPayload>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      phoneNumber: "",
    },
  });

  // Register Form State
  const {
    handleSubmit: registerHandleSubmit,
    register: registerFormRegister,
    formState: { errors: registerErrors },
    reset: resetRegisterForm,
  } = useForm<registerPayload>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
    },
  });

  // Login Mutation
  const { mutate: loginHandler, isPending: loginIsPending } = useMutation({
    mutationFn: async (payload: loginPayload) => {
      const { data } = await api.post("/auth/login", payload);
      return data.data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          toast({
            title: "کاربری با این شماره همراه یافت نشد",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "ورود به حساب با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: (_, payload) => {
      setPhoneNumber(payload.phoneNumber);
      setIsOtpSend(true);
    },
  });

  // Register Mutation
  const { mutate: registerHandler, isPending: registerIsPending } = useMutation(
    {
      mutationFn: async (payload: registerPayload) => {
        const { data } = await api.post("/auth/register", payload);
        return data.data;
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            toast({
              title: "این شماره موبایل از قبل موجود میباشد",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "ثبت نام با مشکل مواجه شد",
            variant: "destructive",
          });
        }
      },
      onSuccess: (_, payload) => {
        setPhoneNumber(payload.phoneNumber);
        setIsOtpSend(true);
      },
    }
  );

  return (
    <Tabs dir="rtl" className="mt-4 space-y-4" defaultValue="login">
      <TabsList
        className={`w-fit block mx-auto ${isOtpSend ? "hidden" : "true"}`}
      >
        <TabsTrigger value="login">ورود</TabsTrigger>
        <TabsTrigger value="register">ثبت نام</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <div className="grid grid-cols-1 gap-3">
          {!isOtpSend ? (
            <form
              className="grid grid-cols-1 gap-2"
              onSubmit={loginHandleSubmit((e) => loginHandler(e))}
            >
              <div className="space-y-1">
                <Label>شماره همراه</Label>
                <Input type="text" {...loginFormRegister("phoneNumber")} />
                <ErrorText error={loginErrors.phoneNumber} />
              </div>
              <Button
                type="submit"
                className="bg-[var(--saffron-light)] hover:bg-[var(--saffron-dark)]"
                isLoading={loginIsPending}
              >
                ارسال کد تایید
              </Button>
            </form>
          ) : (
            <OtpContent
              phoneNumber={phoneNumber}
              resetLoginForm={resetLoginForm}
              resetRegisterForm={resetRegisterForm}
              setIsOpenAuthModal={setIsOpenAuthModal}
            />
          )}
        </div>
      </TabsContent>
      <TabsContent value="register">
        <div className="grid grid-cols-1 gap-3">
          {!isOtpSend ? (
            <form
              className="grid grid-cols-1 gap-2"
              onSubmit={registerHandleSubmit((e) => registerHandler(e))}
            >
              <div className="space-y-1">
                <Label>نام و نام خانوادگی</Label>
                <Input type="text" {...registerFormRegister("fullName")} />
                <ErrorText error={registerErrors.fullName} />
              </div>
              <div className="space-y-1">
                <Label>شماره همراه</Label>
                <Input type="text" {...registerFormRegister("phoneNumber")} />
                <ErrorText error={registerErrors.phoneNumber} />
              </div>
              <Button
                type="submit"
                className="bg-[var(--saffron-light)] hover:bg-[var(--saffron-dark)]"
                isLoading={registerIsPending}
              >
                ارسال کد تایید
              </Button>
            </form>
          ) : (
            <OtpContent
              phoneNumber={phoneNumber}
              resetLoginForm={resetLoginForm}
              resetRegisterForm={resetRegisterForm}
              setIsOpenAuthModal={setIsOpenAuthModal}
            />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

interface OtpContentProps {
  phoneNumber: string;
  resetLoginForm: UseFormReset<loginPayload>;
  resetRegisterForm: UseFormReset<registerPayload>;
  setIsOpenAuthModal: Dispatch<SetStateAction<boolean>>;
}

const OtpContent: FC<OtpContentProps> = ({
  phoneNumber,
  resetLoginForm,
  resetRegisterForm,
  setIsOpenAuthModal,
}) => {
  // Otp Form State
  const {
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
    setValue: otpSetValue,
    watch: otpWatch,
    reset: resetOtpForm,
  } = useForm<checkOtpPayload>({
    resolver: zodResolver(checkOtpValidator),
    defaultValues: {
      code: "",
      phoneNumber,
    },
  });

  // Check Otp Mutation
  const { mutate: checkOtpHandler, isPending: checkOtpIsPending } = useMutation(
    {
      mutationFn: async (payload: checkOtpPayload) => {
        const { data } = await api.post("/auth/check-otp", payload);
        return data.data;
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 409 &&
            err.response.data.error === "OTP_INCORRECT"
          ) {
            toast({
              title: "کد وارد شده اشتباه است",
              variant: "destructive",
            });
          }
          if (
            err.response?.status === 409 &&
            err.response.data.error === "OTP_EXPIRED"
          ) {
            toast({
              title: "کد وارد شده منقضی شده است",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "عملیات اعتبار سنجی کد با مشکل مواجه شد",
            variant: "destructive",
          });
        }
      },
      onSuccess: (data) => {
        resetLoginForm();
        resetRegisterForm();
        resetOtpForm();
        setIsOpenAuthModal(false);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        location.reload();
      },
    }
  );

  return (
    <form
      className="grid grid-cols-1 gap-3"
      onSubmit={otpHandleSubmit((e) => checkOtpHandler(e))}
    >
      <div className="space-y-1">
        <Label>کد را وارد کنید</Label>
        <InputOTP
          maxLength={6}
          value={otpWatch("code")}
          onChange={(v) => otpSetValue("code", v)}
        >
          <InputOTPGroup dir="ltr" className="mr-auto">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <ErrorText error={otpErrors.code} />
      </div>
      <Button
        type="submit"
        className="bg-[var(--saffron-light)] hover:bg-[var(--saffron-dark)]"
        isLoading={checkOtpIsPending}
      >
        اعتبار سنجی کد
      </Button>
    </form>
  );
};

export default AuthButtonNavbar;
