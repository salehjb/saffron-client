"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import {
  ChevronDown,
  Loader2,
  LogOut,
  MapPin,
  Menu,
  Shield,
  ShoppingBasket,
  ShoppingCart,
  UserCog2,
  UserRound,
  UserRoundPen,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import AuthButtonNavbar from "./AuthButtonNavbar";
import { logoutUser, useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { useCart } from "@/context/CartContext";
import CartSheet from "./cart/CartSheet";

const NAV_LINKS = [
  { text: "صفحه اصلی", href: "/" },
  { text: "محصولات", href: "/products" },
  { text: "درباره ما", href: "/about-us" },
  { text: "تماس با ما", href: "/contact-us" },
];

const DROPDOWN_MENU_ITEMS = [
  { text: "مدیریت حساب", href: "/dashboard", icon: UserRoundPen },
  { text: "آدرس های من", href: "/dashboard/addresses", icon: MapPin },
  { text: "سفارش های من", href: "/dashboard/orders", icon: ShoppingCart },
];

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const { cart } = useCart();

  useEffect(() => {
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <div className="md:container">
      <div className="bg-white xl:mt-6 p-3 rounded-md shadow-sm flex items-center justify-between">
        {/* Hamburger Menu */}
        <div
          className={`p-4 fixed top-0 z-50 ${
            isOpenMenu ? "right-0" : "-right-full"
          } transition-all duration-150 w-full h-full bg-white`}
        >
          {/* Close Hamburger */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-yekan-bakh-heavy sm:text-lg">
                زعفران زروند
              </span>
            </Link>
            <X className="w-6 h-6" onClick={() => setIsOpenMenu(false)} />
          </div>
          <hr className="mb-5 mt-2" />
          {/* Profile */}
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-zinc-100 p-4 rounded-full">
                  <UserRound />
                </div>
                <span className="font-yekan-bakh-heavy">
                  خوش اومدی {user.fullName.split(" ")[0]}
                </span>
              </div>
              <Button variant="destructive">خروج</Button>
            </div>
          )}
          {/* Hamburger Links */}
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className={`block p-2 border rounded-md ${
                    pathname === link.href
                      ? "border-2 border-[var(--saffron-light)] text-[var(--saffron-light)] font-yekan-bakh-heavy"
                      : ""
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Menu
          className="sm:hidden w-6 h-6"
          onClick={() => setIsOpenMenu(true)}
        />
        {/* Logo */}
        <Link href="/" className="hidden sm:flex items-center gap-2">
          <Logo />
          <span className="font-yekan-bakh-heavy sm:text-lg">زعفران زروند</span>
        </Link>
        {/* Links */}
        <ul className="hidden items-center gap-5 sm:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={i} className="flex items-center">
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-[var(--saffron-light)] font-yekan-bakh-heavy"
                    : ""
                }`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        {isUserLoading && !user ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : user === null ? (
          <AuthButtonNavbar />
        ) : (
          <div className="flex items-center gap-2">
            <CartSheet />
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-1 cursor-pointer">
                  <div className="bg-zinc-100 h-10 w-10 flex justify-center items-center rounded-full">
                    {user.role === "ADMIN" ? (
                      <UserCog2 className="w-5 h-5" />
                    ) : (
                      <UserRound className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-yekan-bakh-heavy">
                    {user?.fullName}
                  </span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px]">
                <DropdownMenuLabel>حساب من</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "ADMIN" && (
                  <DropdownMenuItem className="gap-2">
                    <Shield className="w-5 h-5" />
                    <Link href="/admin" className="w-full">
                      پنل ادمین
                    </Link>
                  </DropdownMenuItem>
                )}
                {DROPDOWN_MENU_ITEMS.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem className="gap-2">
                      <Icon className="w-5 h-5" />
                      <Link href={item.href} className="w-full">
                        {item.text}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    className="w-full gap-2 flex items-center text-red-600"
                    onClick={logoutUser}
                  >
                    <LogOut className="w-5 h-5" />
                    <p>خروج از حساب</p>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
