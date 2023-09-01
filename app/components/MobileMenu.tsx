"use client";
import motion from "framer-motion";
import { menuState } from "@/atoms/menuAtom";
import { useRecoilState } from "recoil";
import {
  HeartIcon,
  MoonIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import DarkLight from "./DarkLight";
import { themeState } from "@/atoms/themeAtom";
import { modalState } from "@/atoms/modalAtom";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useRecoilState(menuState);
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [theme, setTheme] = useRecoilState(themeState);

  function btnFunction() {
    setMenuOpen(false), setOpen(true);
  }

  return (
    <>
      {menuOpen ? (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed w-full h-screen md:hidden left-0 top-0 bg-black/25"
        >
          {/* Cart */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col justify-center gap-6 items-start bg-base-200 absolute top-0 right-0 h-screen p-12 overflow-y-scroll w-1/2"
          >
            <Link
              href="/"
              className="flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out"
            >
              <HomeIcon className=" h-7  " />
              <p className="text-lg ">Home</p>
            </Link>
            <label className="swap swap-rotate">
              <input
                defaultChecked={theme === "wireframe" ? false : true}
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
              <div className=" swap-off flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
                <MoonIcon className=" h-7 " />
                <p className="text-lg ">Night mode</p>
              </div>
              <div className=" swap-on flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
                <SunIcon className=" h-7 " />
                <p className="text-lg ">Light mode</p>
              </div>
            </label>

            {session ? (
              <>
                <div className="flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
                  <div className="h-7 relative">
                    <PaperAirplaneIcon className="h-7 -rotate-45" />
                    <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-400 rounded-full flex items-center justify-center animate-pulse text-white">
                      3
                    </div>
                  </div>
                  <p className="text-lg ">Messages</p>
                </div>
                <div
                  onClick={() => btnFunction()}
                  className="flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out"
                >
                  <PlusCircleIcon className="  h-7" />
                  <p className="text-lg ">Create</p>
                </div>
                <div className="flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
                  <UserGroupIcon className="  h-7" />
                  <p className="text-lg ">People</p>
                </div>
                <div className="flex flex-row items-center gap-4 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
                  <HeartIcon className="  h-7" />
                  <p className="text-lg ">Notifications</p>
                </div>
              </>
            ) : (
              <button onClick={() => signIn()}>Sign in</button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
