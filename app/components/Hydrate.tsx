"use client";
import { themeState } from "@/atoms/themeAtom";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { RotateLoader } from "react-spinners";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    setIsHydrated(true);
  }, []); 

  return (
    <>
      {isHydrated ? (
        <body data-theme={theme} className="overflow-y-scroll scrollbar-hide">{children}</body>
      ) : (
        <body className="flex justify-center items-center h-screen">
        <RotateLoader color="#0a0a0a" />
        </body>
      )}
    </>
  );
}
