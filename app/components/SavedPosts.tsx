"use client";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SavedPost from "./SavedPost";

export default function SavedPosts() {
  const { data: session } = useSession();
  const [savedPostId, setSavedPostId] = useState([]);
  const [posts, setPosts] = useState([]);


  const postData = [];
  const dataId = [];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("savedBy", "array-contains", `${session?.user?.username}`)
      ),

      (snapshot) => {
        snapshot.forEach((doc) => {
          postData.push(doc.data()), dataId.push(doc.id);
        });
        setPosts(postData);
        setSavedPostId(dataId);
      }
    );

    return unsubscribe;
  }, [db, session]);

  const mergedData = posts.map((value, index) => ({
    ...value,
    id: savedPostId[index],
  }));

  console.log(mergedData);



  return (
    <div className="flex flex-row flex-wrap gap-1 justify-center mb-10 w-full">
      {mergedData.map((post) => {
        return <SavedPost  img={post.image} id={post.id} username={post.username} profileImg={post.profileImg} timestamp={post.timestamp} caption={post.caption}  key={post.id} />;
      })}
    </div>
  );
}
