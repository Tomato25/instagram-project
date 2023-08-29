"use client";
import { themeState } from "@/atoms/themeAtom";
import { ReactNode, useEffect, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";

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
        <body>
          <h2>Loading...</h2>
        </body>
      )}
    </>
  );
}
