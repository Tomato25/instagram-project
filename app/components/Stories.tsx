import { Key} from "react";
import Story from "./Story";
import {USERS} from "../utilities/faker"
import ProfileType from "../types/ProfileType";
import { Session } from "next-auth";



export default function Stories({ user }: Session) {

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        
        {user && (
          <Story img={user.image as string}
          username={user.username} />
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
