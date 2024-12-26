import type { Metadata } from "next";
import { AuthProvider } from "@/app/context/Authcontext";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/navigation/header";
import HeaderMobile from "./components/navigation/header-mobile.tsx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="h-screen">
            <HeaderMobile></HeaderMobile>
            <Header></Header>
            <div className="" style={{ height: 'calc(100vh - 50px)' }}>
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
