"use client";

import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/firebase";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timeStamp", "desc")),
      snapshot => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db]);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
          />
        );
      })}
    </div>
  );
}
