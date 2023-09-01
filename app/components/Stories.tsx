'use client'

import { Key} from "react";
import Story from "./Story";
import {USERS} from "../utilities/faker"
import ProfileType from "../types/ProfileType";
import { useSession } from "next-auth/react";



export default function Stories() {

  const {data: session} = useSession()

  return (
    <div className="flex space-x-2 p-6 mt-8 border-accent border-b rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-primary">
        {session && (
          <Story      
          img={session.user?.image as string}
          username={session.user.username}
        />
        )}
        {USERS.map((profile: ProfileType) => {
        return (
          <>
            <Story
              key={profile.userId as Key}
              img={profile.avatar}
              username={profile.username}
            />
          </>
        );
      })} 
    </div>
  ); 


}
