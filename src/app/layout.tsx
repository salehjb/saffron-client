import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "زعفران زروند",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
