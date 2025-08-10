import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api";

export default function PostForm() {
  const [data, setData] = useState({
    title: "",
    description: "",
    post_type: "song",
    audio_url: "",
    video_url: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const btnName = id ? "Update" : "Create";

  useEffect(() => {
    if (id) {
      api.get(`/api/posts/${id}/`).then((res) =>
        setData({
          title: res.data.title,
          description: res.data.description,
          post_type: res.data.post_type,
          audio_url: res.data.audio_url,
          video_url: res.data.video_url,
          image_url: res.data.image_url,
        })
      );
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    const req = id
      ? api.put(`/api/posts/${id}/`, data)
      : api.post("/api/posts/", data);

    req.then(() => navigate("/admin"));
  }

  return (
    <>
      <div className="p-6 bg-gray-200 text-black min-h-screen dark:text-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Upload New Content</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 bg-gray-300 shadow-lg dark:bg-gray-700 rounded "
            placeholder="Title"
            value={data.title}
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
          />

          <textarea
            className="w-full p-2  rounded bg-gray-300 shadow-lg dark:bg-gray-700"
            rows="5"
            placeholder="Description"
            value={data.description}
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              })
            }
          />

          <select
            className="w-full p-2 bg-gray-300 shadow-lg dark:bg-gray-700 rounded"
            value={data.post_type}
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  post_type: e.target.value,
                };
              })
            }
          >
            <option value="beat">Beat</option>
            <option value="song">Song</option>
            <option value="video">Video</option>
            <option value="promo">Promo</option>
          </select>

          <input
            className="w-full p-2 bg-gray-300 shadow-lg dark:bg-gray-700 rounded"
            placeholder="Audio Link"
            value={data.audio_url}
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  audio_url: e.target.value,
                };
              })
            }
          />
          <input
            className="w-full p-2 bg-gray-300 shadow-lg dark:bg-gray-700 rounded"
            placeholder="Video Link"
            value={data.video_url}
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  video_url: e.target.value,
                };
              })
            }
          />
          <input
            className="w-full p-2 bg-gray-300 shadow-lg dark:bg-gray-700 rounded"
            placeholder="Image Link"
            value={data.image_url}
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  image_url: e.target.value,
                };
              })
            }
          />

          <button
            onClick={() => setLoading(true)}
            className=" py-2 px-4 bg-gray-700 rounded"
          >
            {loading === true ? "Loading..." : btnName}
          </button>
        </form>
      </div>
    </>
  );
}
