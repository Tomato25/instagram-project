import { BookmarkIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, PaperAirplaneIcon, ChatBubbleOvalLeftIcon  } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid"

export default function Post({id, username, userImg, img, caption}) {


    return(
        <div className="bg-white my-7 border rounded-sm">
            <div className="flex items-center p-5">
                <img src={userImg}  alt="profileImg" className="h-12 w-12 rounded-full object-contain border p-1 mr-3"/>
                <p className="flex-1 font-bold ">{username}</p>
                <EllipsisHorizontalIcon className="h-5"/>
            </div>
            <img src={img} className="object-cover w-full" alt="postImage"/>
            <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
                <HeartIcon className="btn"/>
                <ChatBubbleOvalLeftIcon className="btn"/>
                <PaperAirplaneIcon className="btn -rotate-45 h-6"/>
            </div>
                <BookmarkIcon className="btn" />
            </div>
            <p className="p-5 truncate">
                <span className="font-bold mr-1">{username}</span>
                {caption}
            </p>
            <form className="flex items-center p-4">
                <FaceSmileIcon className="h-7"/>
                <input type="text" placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none"/>
                <button className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    )
} 