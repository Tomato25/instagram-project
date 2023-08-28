'use client'

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function MiniProfile() {

  const{ data: session} = useSession()

  return (
    <div className="flex items-center justify-between mt-14 ml-10">

      <Image
        className="rounded-full border p-[2px]"
        src={session?.user?.image as string}
        alt="profile image"
        height={70}
        width={70}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button onClick={() => signOut()} className="text-blue-400 text-sm font-semibold">Sign out</button>
    </div>
  );
}
