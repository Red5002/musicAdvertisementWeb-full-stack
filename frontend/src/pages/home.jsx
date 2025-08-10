import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const GetPromo = () => {
    return posts
      .filter((post) => post.post_type === "promo")
      .slice(0, 4)
      .map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <p>type: {post.post_type}</p>
        </div>
      ));
  };
  const GetSong = () => {
    return posts
      .filter((post) => post.post_type === "song")
      .slice(0, 3)
      .map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <p>type: {post.post_type}</p>
        </div>
      ));
  };
  const GetVideo = () => {
    return posts
      .filter((post) => post.post_type === "video")
      .slice(0, 3)
      .map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <p>type: {post.post_type}</p>
        </div>
      ));
  };
  const GetBeat = () => {
    return posts
      .filter((post) => post.post_type === "beat")
      .slice(0, 3)
      .map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <p>type: {post.post_type}</p>
        </div>
      ));
  };

  return (
    <>
      <h1 className="text-2xl font-bold ">Home</h1>
      <h3 className="font-bold"></h3>

      {posts.find((post) => post.post_type === "promo") && (
        <div>
          <h4>Promo</h4>
          <GetPromo />
          <button onClick={() => navigate(`/posts/promo`)}>see more..</button>
        </div>
      )}
      {posts.find((post) => post.post_type === "song") && (
        <div>
          <h4>Song</h4>
          <GetSong />
          <button onClick={() => navigate(`/posts/song`)}>see more..</button>
        </div>
      )}
      {posts.find((post) => post.post_type === "video") && (
        <div>
          <h4>Video</h4>
          <GetVideo />
          <button onClick={() => navigate(`/posts/video`)}>see more..</button>
        </div>
      )}
      {posts.find((post) => post.post_type === "beat") && (
        <div>
          <h4>Beats</h4>
          <GetBeat />
          <button onClick={() => navigate(`/posts/beat`)}>see more..</button>
        </div>
      )}
    </>
  );
}
