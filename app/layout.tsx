import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram clone WebApp",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
        <Nav />
        {children}
      </body>
    </html>
  );
}
