import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";

export default function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const [beats, setBeats] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const fetchedRef = useRef(false);
  const annoucement = "../src/assets/announcement2.svg";

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    api
      .get("/api/posts/")
      .then((res) => setPosts(res.data))
      .catch(console.error);
    api
      .get("/api/beats/")
      .then((res) => setBeats(res.data))
      .catch(console.error);
    api
      .get("/api/videos/")
      .then((res) => setMusicVideos(res.data))
      .catch(console.error);
    api
      .get("/api/songs/")
      .then((res) => setSongs(res.data))
      .catch(console.error);
  }, []);

  function handleCreate() {
    navigate("/admin/create/");
  }

  return (
    <div className="min-h-screen w-full dark:bg-orange-700 bg-christine950 dark:text-white pt-11 p-3 overflow-x-hidden">
      <nav className="flex justify-between items-center fixed top-0 left-0 right-0 p-2 z-10  backdrop-blur-sm">
        <h1 className="font-extrabold text-2xl sm:text-3xl dark:text-white">
          Admin Panel
        </h1>

        <div className="space-x-4">
          <button
            className="bg-blue-800 p-1 sm:p-2 rounded sm:font-bold text-white"
            onClick={handleCreate}
          >
            + New Post
          </button>
          <button
            className="bg-red-600 p-1 sm:p-2 rounded sm:font-bold text-white"
            onClick={() => navigate("/logout")}
          >
            Logout
          </button>
        </div>
      </nav>
      <section className="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide whitespace-nowrap p-4 pr-0">
        <div
          style={{
            backgroundImage: `url(${annoucement})`,
          }}
          className="p-2 bg-green-600 rounded-sm bg-no-repeat bg-contain bg-right inline-block w-64 sm:w-96 h-36 mr-5 snap-start"
        >
          <h3 className="text-xl mb-4 sm:text-5xl text-left">Blogs</h3>
          <p className="text-5xl text-left">{posts.length}</p>
        </div>
        <div
          style={{
            backgroundImage: `url(${annoucement})`,
          }}
          className="p-2 bg-green-600 rounded-sm bg-no-repeat bg-contain bg-right inline-block w-64 sm:w-96 h-36 mr-5 snap-start"
        >
          <h3 className="text-xl mb-4 sm:text-5xl text-left">Beats</h3>
          <p className="text-5xl text-left">{beats.length}</p>
        </div>
        <div
          style={{
            backgroundImage: `url(${annoucement})`,
          }}
          className="p-2 bg-green-600 rounded-sm bg-no-repeat bg-contain bg-right inline-block w-64 sm:w-96 h-36 mr-5 snap-start"
        >
          <h3 className="text-xl mb-4 sm:text-5xl text-left">Music Videos</h3>
          <p className="text-5xl text-left">{musicVideos.length}</p>
        </div>
        <div
          style={{
            backgroundImage: `url(${annoucement})`,
          }}
          className="p-2 bg-green-600 rounded-sm bg-no-repeat bg-contain bg-right inline-block w-64 sm:w-96 h-36 snap-start"
        >
          <h3 className="text-xl mb-4 sm:text-5xl text-left">Songs</h3>
          <p className="text-5xl text-left">{songs.length}</p>
        </div>
      </section>
    </div>
  );
}
