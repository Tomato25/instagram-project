"use client";

import { TableCellsIcon,BookmarkIcon } from "@heroicons/react/24/outline";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import UserPosts from "../components/UserPosts";
import SavedPosts from "../components/SavedPosts";

export default function Profile() {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState("posts")

  return (
    <div className="flex items-center justify-center flex-col md:max-w-3xl xl:max-w-6xl mx-auto">
      {session ? (
        <>
          <div className="flex items-center justify-between mt-14 pb-14 px-4  md:gap-16 border-b border-accent w-full">
          <div className="md:h-32 md:w-32 w-24 h-24 relative">
          <Image
            className="rounded-full border p-[2px] "
            src={session?.user?.image as string}
            alt="profile image"
            layout="fill"
            objectFit="cover" 
          />
          </div>  
          <div className="flex-1 mx-4 flex flex-col space-y-3">
          <h2 className="font-bold text-xl">{session?.user.username}</h2>
          <div className="flex flex-row space-x-4">
          <h3><span className="font-bold">2</span> posts</h3>
          <h3><span className="font-bold">8</span> followers</h3>
          <h3><span className="font-bold">36</span> following</h3>
          </div>
          </div>
          <div className="self-center">
          <button onClick={() => signOut()} className="text-blue-400 text-base font-semibold">Sign out</button>
          </div>
        </div>
  
          <div className="flex justify-around space-x-20 text-lg my-4">
              <button onClick={() => setToggle("posts")}  className={`flex flex-row align-center gap-2 ${toggle === "saved" && "text-accent"}`}><TableCellsIcon className="h-6"/>POSTS</button>
              <button onClick={() => setToggle("saved")} className={`flex flex-row align-center gap-2 ${toggle === "posts" && "text-accent"}`}><BookmarkIcon  className="h-6"/>SAVED</button>
          </div>
  
          {toggle === "posts" ? (
              <UserPosts />
          ) : (
              <SavedPosts />
  
          )}
          </>

      ):(
        <>
        <h2 className="mt-24 text-2xl">Please sign in below</h2>
        <button onClick={() => signIn()} className="bg-blue-500 flex items-center gap-4 shadow-xl rounded-lg p-3 cursor-pointer text-white mt-6">Sign in</button>
        </>
      )}
      
    </div>
  );
}
