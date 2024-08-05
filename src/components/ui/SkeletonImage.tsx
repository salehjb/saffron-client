"use client";

import { ImageIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";
import { Skeleton } from "./Skeleton";

interface SkeletonImageProps extends ImageProps {}

const SkeletonImage: FC<SkeletonImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      {isLoading && <div className="absolute h-full w-full bg-zinc-200" />}
      <Image
        {...props}
        onLoadingComplete={() => setIsLoading(false)}
        className={`transition-opacity duration-500 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
};

export default SkeletonImage;
