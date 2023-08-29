"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

type Props = {
  children?: React.ReactNode;
  session?: Session
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}><RecoilRoot>{children}</RecoilRoot></SessionProvider>;
};