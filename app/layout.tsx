import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram clone WebApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Nav />
        {children}
      </body>
    </html>
  );
}
