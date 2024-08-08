"use client";

import { useEffect, useState } from "react";

export const useProvinces = () => {
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [isProvincesLoading, setIsProvincesLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsProvincesLoading(true);
    fetch("/provinces.json")
      .then((data) => data.json())
      .then((provinces) => setProvinces(provinces))
      .finally(() => setIsProvincesLoading(false));
  }, []);

  return { provinces, isProvincesLoading };
};
