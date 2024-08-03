import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./lib/api";

async function getUserRoleFromToken(token: string): Promise<RoleType | null> {
  try {
    const { data } = await api.get("/profile/get-me", {
      headers: {
        authorization: token,
      },
    });

    const user = data.data.user;

    if (!user) {
      return null;
    }

    return user.role;
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/admin"];
  const url = req.nextUrl.clone();

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const userRole = await getUserRoleFromToken(token);

    if (userRole !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
