import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative w-10 h-10 overflow-hidden rounded-full",
        className
      )}
    >
      <Image src="/logo.png" alt="logo" fill className="object-cover" />
    </div>
  );
};

export default Logo;
