import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";
import Providers from "./components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";



export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram clone WebApp",
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)
    console.log(session)
  return (
    <html lang="en">
        <body className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
          <Providers session={session}>
          <Nav user={session?.user} expires={session?.expires as string}/>
          {children}
          </Providers>
        </body>
    </html>
  );
}
