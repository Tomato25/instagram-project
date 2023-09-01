"use client";

import { postModalState } from "@/atoms/postModalAtom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { BookmarkIcon, ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { db } from "@/firebase";
import { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import Moment from "react-moment";
import { HeartIcon as HeartIconFilled, BookmarkIcon as BookmarkIconFilled } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";


export default function PostModal() {
  const [postModalUrl, setPostModalUrl] = useRecoilState(postModalState);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)


  function closeModal() {
    setPostModalUrl(null);
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postModalUrl.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),

    [db, postModalUrl.id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postModalUrl.id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),

    [db, postModalUrl.id]
  );

  console.log(postModalUrl)

  useEffect(() => {
        setHasLiked(likes.findIndex(like => like.id === session?.user.uid) !== -1)


  }, [likes])

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postModalUrl.id, "saved"), (snapshot) =>
        setSaved(snapshot.docs)
      ),

    [db, postModalUrl.id]
  );


  const likePost = async () => {
    if(hasLiked) {
            await deleteDoc(doc(db, "posts" , postModalUrl.id, "likes" , session?.user.uid))
    } else {
    await setDoc(doc(db, "posts", postModalUrl.id , "likes", session?.user.uid), {
            username: session?.user.username,
    })
}
  }

  const savePost = async () => { 

    const postDoc = await getDoc(doc(db, "posts", postModalUrl.id ));

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const newSavedBy = postData.savedBy || [];

      const usernameIndex = newSavedBy.indexOf(session?.user.username);

      if (usernameIndex !== -1) {
        newSavedBy.splice(usernameIndex, 1); // Remove the username
      } else {
        newSavedBy.push(session?.user.username); // Add the username
      }
  
      await updateDoc(doc(db, "posts", postModalUrl.id), {
        savedBy: newSavedBy
      });
    }
  }

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postModalUrl.id, "savedBy"), (snapshot) =>
        setSaved(snapshot.docs)
      ),

    [db, postModalUrl.id]
  );

  useEffect(() => {
    const postRef = doc(db, "posts", postModalUrl.id);

    const unsubscribe = onSnapshot(postRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();
        const savedByArray = postData.savedBy || [];
        const isUserSaved = savedByArray.includes(session?.user.username);
        setHasSaved(isUserSaved);
      }
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, [db, postModalUrl.id, session?.user.username]);

  
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", postModalUrl.id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => closeModal()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25 flex items-center justify-center "
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-100 grid grid-cols-1 h-2/3 grid-rows-6 md:grid-rows-1 md:max-w-4xl w-full lg:max-w-6xl md:grid-cols-3 m-10 align-bottom rounded-lg text-left overflow-hidden shadow-xl sm:align-middle "
      >
        <section className="md:col-span-2 row-span-4  ">
          <img src={postModalUrl.img} className="object-cover w-full h-full" />
        </section>
        <section className="relative md:col-span-1 row-span-2 md:flex flex-col">
          <div className="flex items-center p-3 border-b border-accent">
            <img
              src={postModalUrl.profileImg}
              alt="profileImg"
              className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
            />
            <p className="flex-1 font-bold ">{postModalUrl.username}</p>
            <EllipsisHorizontalIcon className="h-5" />
          </div>

          {comments.length > 0 && (
            <div className="hidden sm:inline h-32 overflow-y-scroll scrollbar-thumb-primary scrollbar-thin p-4 flex-1">
              {comments.map((comment) => (
                <div
                  key={comment.data().id}
                  className="flex items-center space-x-2 mb-3"
                >
                  <img
                    className="h-10 w-10 rounded-full p-1 mr-3 border"
                    src={comment.data().userImage}
                    alt=""
                  />
                  <p className="text-sm flex-1">
                    <span className="font-bold">{comment.data().username}</span>{" "}
                    {comment.data().comment}
                  </p>
                  <Moment fromNow className="pr-5 text-xs">
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </div>
          )}

          <div className="absolute bottom-0 w-full">
          <div className="flex justify-between px-4 pt-4 border-b border-accent pb-3 ">
            <div className="flex space-x-4">
              {hasLiked ? (
                <HeartIconFilled
                  onClick={() => likePost()}
                  className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out text-red-600"
                />
              ) : (
                <HeartIcon
                  onClick={() => likePost()}
                  className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out"
                />
              )}
              <ChatBubbleOvalLeftIcon className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out" />
              <PaperAirplaneIcon className="hover:scale-125 cursor-pointer transition-all duration-150 ease-out -rotate-45 h-7" />
            </div>
            {hasSaved ? (
              <BookmarkIconFilled
                onClick={() => savePost()}
                className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out text-blue-500"
              />
            ) : (
              <BookmarkIcon
                onClick={() => savePost()}
                className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out"
              />
            )}
       
        </div>
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0 outline-none bg-base-100"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400 hover:scale-110 transition-all duration-150 ease-out"
          >
            Post
          </button>
        </form>
        </div>
        </section>
      </motion.div>
    </motion.div>
  );
}
