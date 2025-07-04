import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { TanstackProviders } from "@/provider/TanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sign Board",
  description: "싸인을 남겨주세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 antialiased`}
      >
        <TanstackProviders>
          <Header />
          <div className="mx-auto w-full max-w-xl">
            <main className="w-full pt-10">{children}</main>
          </div>
        </TanstackProviders>
      </body>
    </html>
  );
}
