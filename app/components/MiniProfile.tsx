'use client'

import Image from "next/image";
import profielImage from "../../public/profileImg.jpg";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function MiniProfile({ user }: Session) {

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Image
        className="rounded-full border p-[2px]"
        src={user?.image as string}
        alt="profile image"
        height={70}
        width={70}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button className="text-blue-400 text-sm font-semibold">Sign out</button>
    </div>
  );
}
