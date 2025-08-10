import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GetPost() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [id]);

  function GetPostDetail() {
    return [data].map?.((post) => (
      <div key={id} className="mb-4 p-4 border rounded">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p>{post.description}</p>
        <p>type: {post.post_type}</p>
      </div>
    ));
  }

  return (
    <>
      <button onClick={() => navigate("/")}>Home</button>
      <GetPostDetail />
    </>
  );
}
