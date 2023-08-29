"use client";
import { themeState } from "@/atoms/themeAtom";
import {useRecoilState} from "recoil"
import { MoonIcon,SunIcon } from "@heroicons/react/24/outline";


export default function DarkLight() {

  const [theme, setTheme] = useRecoilState(themeState)

  console.log(theme)

  return (
    <label className="swap swap-rotate">
      <input
        defaultChecked={theme === 'wireframe' ? false : true}
        type="checkbox"
        className="hidden"
        onClick={() => {
        
          if (theme === "wireframe") {
            setTheme("black");
          } else {
            setTheme("wireframe");
          }
        }}
      />

      <MoonIcon
        className="swap-off hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out"
        />

      <SunIcon className="swap-on hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out" />

    </label>
  );
}
