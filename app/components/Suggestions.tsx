import { USERSSUG } from "../utilities/faker";
import ProfileType from "../types/ProfileType";
import { Key } from "react";


export default function Suggestions ()  {
    return ( 
        <div className="mt-4 ml-10">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
            {USERSSUG.map((profile: ProfileType) => {
        return (
            <div key={profile.userId} className="flex items-center justify-between mt-3">
                <img src={profile.avatar} className="w-10 h-10 rounded-full p-[2px] border" alt="profile Image" />
                <div className="flex-1 ml-4">
                    <h2 className="font-semibold text-sm">{profile.username}</h2>
                    <h3 className="text-xz text-gray-400">Works at {profile.company}</h3>
                </div>

                <button className="text-blue-400 text-xs font-bold">Follow</button>

            </div>
        );
      })} 
        </div>
     );
}