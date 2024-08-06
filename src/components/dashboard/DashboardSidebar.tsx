"use client";

import { logoutUser, useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import {
  CircleGauge,
  House,
  Loader2,
  LogOut,
  MapPin,
  ShoppingBag,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/Button";

const SIDEBAR_LINKS = [
  { text: "داشبورد", href: "/dashboard", icon: CircleGauge },
  { text: "پروفایل", href: "/dashboard/profile", icon: UserRoundPen },
  { text: "آدرس ها", href: "/dashboard/addresses", icon: MapPin },
  { text: "سفارشات", href: "/dashboard/orders", icon: ShoppingBag },
];

const DashboardSidebar = () => {
  const { user, isUserLoading } = useUser();

  const pathname = usePathname();

  return (
    <div className="bg-white p-4 rounded-md shadow-md h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-100 p-3 rounded-full">
            {isUserLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <UserRound className="w-5 h-5" />
            )}
          </div>
          {!isUserLoading && (
            <span className="font-yekan-bakh-heavy">{user?.fullName}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "icon" }),
              "bg-blue-500 hover:bg-blue-600"
            )}
          >
            <House className="w-4 h-4" />
          </Link>
          <Button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-600"
            size="icon"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <hr className="my-3" />
      <ul className="grid grid-cols-1 gap-3">
        {SIDEBAR_LINKS.map((link, i) => {
          const Icon = link.icon;

          return (
            <li key={i}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition-colors p-3 rounded-md ${
                  pathname === link.href
                    ? "border-2 border-zinc-400 font-yekan-bakh-bold"
                    : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{link.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
