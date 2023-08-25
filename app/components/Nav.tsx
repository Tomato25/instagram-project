"use client";

import Image from "next/image";
import Logo from "../../public/logo.png";
import LogoMobile from "../../public/logoMobile.png";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  Bars3Icon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import profielImage from "../../public/profileImg.jpg";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

export default function Nav({ user }: Session) {

  console.log(user)

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:inline-grid w-24  cursor-pointer">
          <Image
            src={Logo}
            layout="fill"
            alt="Instagram logo"
            objectFit="contain"
          />
        </div>
        <div className="relative w-8 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src={LogoMobile}
            layout="fill"
            alt="Instagram logo"
            objectFit="contain"
          />
        </div>

        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <Bars3Icon className="md:hidden cursor-pointer h-6" />

          {user ? (
            <>
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn -rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-400 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <a href="/api/auth/signout">
              <Image
                src={user.image as string}
                className="h-10 w-10 rounded-full cursor-pointer"
                alt="Profile Image"
                height={20}
                width={20}

              /></a>
            </>
          ) : (
            <button onClick={() => signIn} className="text-blue-400">
              <a href="/api/auth/signin">Sign in</a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
