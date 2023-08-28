"use client";
import { ReactNode, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide"><RecoilRoot>{children}</RecoilRoot></body>
      ) : (
        <body>
          <h2>Loading...</h2>
        </body>
      )}
    </>
  );
}
