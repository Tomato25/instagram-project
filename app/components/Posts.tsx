import Post from "./Post";
import profielImage from "../../public/profileImg.jpg";


export default function Posts() {
  const posts = [
    {
      id: 123,
      username: "sadfddsad",
      userImg: "/profileImg.jpg",
      img: "/profileImg.jpg" ,
      caption: "DFKJLKFSD{D",
    },
    {
      id: 123,
      username: "sadfddsad",
      userImg: "/profileImg.jpg",
      img: "/profileImg.jpg" ,
      caption: "DFKJLKFSD{D",
    },
    {
      id: 123,
      username: "sadfddsad",
      userImg: "/profileImg.jpg",
      img: "/profileImg.jpg" ,
      caption: "DFKJLKFSD{D", 
    },
  ];

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
          />
        );
      })}
    </div>
  );
}
