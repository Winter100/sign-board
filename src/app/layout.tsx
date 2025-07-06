import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { TanstackProviders } from "@/provider/TanstackProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-popins",
});

export const metadata: Metadata = {
  title: "Signatures",
  description: "서명을 담아 응원하기!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${poppins.variable} min-h-screen bg-gray-50 antialiased`}>
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
