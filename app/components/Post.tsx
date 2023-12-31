import { db } from "@/firebase";
import {
  BookmarkIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled, BookmarkIcon as BookmarkIconFilled } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Snapshot } from "recoil";
import Comment from "./Comment";
import Moment from "react-moment";

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)


  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),

    [db, id]
  );


  useEffect(() => {
        setHasLiked(likes.findIndex(like => like.id === session?.user.uid) !== -1)


  }, [likes])

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "savedBy"), (snapshot) =>
        setSaved(snapshot.docs)
      ),

    [db, id]
  );

  useEffect(() => {
    const postRef = doc(db, "posts", id);

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
  }, [db, id, session?.user.username]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),

    [db, id]
  );

  const likePost = async () => {
    if(hasLiked) {
            await deleteDoc(doc(db, "posts" , id, "likes" , session?.user.uid))
    } else {
    await setDoc(doc(db, "posts", id , "likes", session?.user.uid), {
            username: session?.user.username,
    })
}
  }

  const savePost = async () => { 

    const postDoc = await getDoc(doc(db, "posts", id ));

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const newSavedBy = postData.savedBy || [];

      const usernameIndex = newSavedBy.indexOf(session?.user.username);

      if (usernameIndex !== -1) {
        newSavedBy.splice(usernameIndex, 1); // Remove the username
      } else {
        newSavedBy.push(session?.user.username); // Add the username
      }
  
      await updateDoc(doc(db, "posts", id), {
        savedBy: newSavedBy
      });
    }
  }

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="my-7 border-b border-accent rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="profileImg"
          className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold ">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      <img src={img} className="object-cover w-full" alt="postImage" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">

            {hasLiked ? (

                <HeartIconFilled  onClick={() => likePost()} className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out text-red-600" />

            ): (

                <HeartIcon onClick={() => likePost()} className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out" />


            )}
            <ChatBubbleOvalLeftIcon className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out" />
            <PaperAirplaneIcon className="hover:scale-125 cursor-pointer transition-all duration-150 ease-out -rotate-45 h-7" />
          </div>
          {hasSaved ? (

            <BookmarkIconFilled onClick={() => savePost()} className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out text-blue-500" />
          ):(
            <BookmarkIcon onClick={() => savePost()} className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out" />
          )}
        </div>
      )}
      <p className="p-5 truncate">
        {likes.length > 0 && (
            <p className="font-bold mb-1 ">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-primary scrollbar-thin">
          {comments.map((comment) => (
            <div
              key={comment.data().id}
              className="flex items-center space-x-2 mb-3"
            >
              <img
                className="h-7 w-7 rounded-full"
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

      {session && (
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
      )}
    </div>
  );
}
