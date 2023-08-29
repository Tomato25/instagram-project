import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "./components/NextAuthProvider";
import Hydrate from "./components/Hydrate";
import Modal from "./components/Modal";
import { RecoilRoot } from "recoil";

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
      <NextAuthProvider>
      <Hydrate>
      
        <Nav />
        {children}
        <Modal />
        
        </Hydrate>
        </NextAuthProvider>
    </html>
  );
}
