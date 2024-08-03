import Cookies from "js-cookie";

export const getAccessToken = (): string | undefined => {
  return Cookies.get("accessToken");
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get("refreshToken");
};

export const setAccessToken = (token: string): void => {
  Cookies.set("accessToken", token, { expires: 7 });
};

export const setRefreshToken = (token: string): void => {
  Cookies.set("refreshToken", token, { expires: 30 });
};

export const removeAccessToken = (): void => {
  Cookies.remove("accessToken");
};

export const removeRefreshToken = (): void => {
  Cookies.remove("refreshToken");
};
