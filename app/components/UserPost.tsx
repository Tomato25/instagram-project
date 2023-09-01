"use client";

import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { postModalState } from "@/atoms/postModalAtom";
import PostModal from "./PostModal";

export default function UserPost(props) {

  const id = props.id
  const [isShown, setIsShown] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  const [postModalUrl, setPostModalUrl] = useRecoilState(postModalState);

  function openModal() {
    setPostModalUrl(props);
  }

 

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),

    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
        setComments(snapshot.docs)
      ),

    [db, id]
  );

  return (
    <>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        onClick={openModal}
        className="relative xl:w-[33%] md:w-[48%] w-full h-96 cursor-pointer"
      >
        <img
          className=" object-cover w-full h-full hover:brightness-50 transition-all duration-200 ease-in-out"
          src={props.img as string}
        />
        <div
          className={`absolute pointer-events-none z-10 flex brightness-100 justify-center gap-10 w-full top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4  text-white text-xl text-center  ${
            isShown ? "visible" : "hidden"
          }`}
        >
          <p className="flex flex-row items-center gap-2">
            <ChatBubbleOvalLeftIcon className="h-6" />
            {comments.length}
          </p>
          <p className="flex flex-row items-center gap-2">
            <HeartIcon className="h-6" />
            {likes.length}
          </p>
        </div>
      </div>
      {postModalUrl && (
        <PostModal />
        
      )}
    </>
  );
}
