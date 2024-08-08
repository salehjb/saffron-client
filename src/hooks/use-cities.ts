"use client";

import { useEffect, useState } from "react";

export const useCities = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsCitiesLoading(true);
    fetch("/cities.json")
      .then((data) => data.json())
      .then((cities: ICity[]) => {
        setCities(cities);
      })
      .finally(() => setIsCitiesLoading(false));
  }, []);

  return { cities, isCitiesLoading };
};
