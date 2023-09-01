import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import UserPost from "./UserPost";


export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [postsID, setPostsID] = useState([]);

  const { data: session } = useSession();

  const postData = [];
  const dataId = [];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("username", "==", `${session?.user?.username}`)
      ),

      (snapshot) => {
        snapshot.forEach((doc) => {
          postData.push(doc.data()), dataId.push(doc.id);
        });
        setPosts(postData);
        setPostsID(dataId);
      }
    );

    return unsubscribe;
  }, [db, session]);

  const mergedData = posts.map((value, index) => ({
    ...value,
    id: postsID[index],
  }));

  console.log(mergedData);

  return (
    <div className="flex flex-row flex-wrap gap-1 justify-center mb-10 w-full">
      {mergedData.map((post) => {
        return <UserPost img={post.image} id={post.id} username={post.username} profileImg={post.profileImg} timestamp={post.timestamp} caption={post.caption}  key={post.id}/>;
      })}
    </div>
  );
}
