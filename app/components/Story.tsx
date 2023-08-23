import Image from "next/image"

interface PropType {
    img: string,
    username: string
}
export default function Story({img, username}: PropType) {


    return(
        <div className="">
            <img alt="avatar" src={img} className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out" />
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    )
}