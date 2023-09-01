"use client"

import { useRecoilState } from "recoil";
import PostModal from "./PostModal"
import { postModalState } from "@/atoms/postModalAtom";

export default function SavedPost(props) {

  const [postModalUrl, setPostModalUrl] = useRecoilState(postModalState);

  function openModal() {
    setPostModalUrl(props);
    console.log(postModalUrl)

  }


 


    return (
      <>
        <div
      className="relative xl:w-[33%] md:w-[48%]  w-full h-96 brightness-50 hover:brightness-100 transition-all duration-200 ease-in-out cursor-pointer"
      onClick={openModal}
    >
      <img
        className="object-cover w-full h-full"
        src={props.img as string}
      />
    </div>
     {postModalUrl && (
      <PostModal />
      
    )}
    </>
    )
}