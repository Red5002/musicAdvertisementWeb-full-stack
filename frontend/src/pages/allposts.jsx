import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GetAllPost() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { type } = useParams();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const GetPost = () => {
    return data
      .filter((post) => post.post_type === type)
      .map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <p>type: {post.post_type}</p>
          <button onClick={() => navigate(`/post/${post.id}`)}>
            Read more
          </button>
        </div>
      ));
  };

  return (
    <>
      <GetPost />
    </>
  );
}
