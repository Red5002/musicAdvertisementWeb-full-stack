import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sun,
  Moon,
  Music,
  Video,
  FileText,
  Disc,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "@/api";
import { useTheme } from "next-themes";

export default function AdminPanel() {
  const [refresh, setRefresh] = useState(false);
  const [stats, setStats] = useState({
    posts: 0,
    beats: 0,
    videos: 0,
    songs: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();
  const { theme, setTheme} = useTheme();

  useEffect(() => {
    Promise.all([
      api.get("/api/posts/"),
      api.get("/api/beats/"),
      api.get("/api/videos/"),
      api.get("/api/songs/"),
      api.get("/api/songs/latest/"),
      api.get("/api/videos/latest/"),
      api.get("/api/beats/latest/"),
      api.get("/api/posts/latest/"),
      api.get("/api/chart-data/"), // ✅ your backend endpoint
    ])
      .then(([p, b, v, s, sl, vl, bl, pl, chart]) => {
        setStats({
          posts: p.data.length,
          beats: b.data.length,
          videos: v.data.length,
          songs: s.data.length,
        });

        // ✅ Use backend chart data if available, fallback if not
        setChartData(
          chart.data.length
            ? chart.data
            : [
                { name: "Mon", posts: 2, beats: 1, songs: 1, videos: 0 },
                { name: "Tue", posts: 4, beats: 2, songs: 0, videos: 1 },
                { name: "Wed", posts: 3, beats: 0, songs: 2, videos: 1 },
              ]
        );

        setActivity([
          {
            text: "🎵 New song posted",
            title: sl.data.title.toUpperCase(),
            date: new Date(sl.data.created_at).toLocaleString(),
          },
          {
            text: "🎬 Video uploaded",
            title: vl.data.title.toUpperCase(),
            date: new Date(vl.data.created_at).toLocaleString(),
          },
          {
            text: "📝 News-Letter created",
            title: pl.data.title.toUpperCase(),
            date: new Date(pl.data.created_at).toLocaleString(),
          },
          {
            text: "🎧 Beat created",
            title: bl.data.title.toUpperCase(),
            date: new Date(bl.data.created_at).toLocaleString(),
          },
        ]);
      })
      .catch(console.error);
  }, [refresh]);

  const cards = [
    {
      title: "Posts",
      count: stats.posts,
      icon: FileText,
      color: "bg-blue-500",
    },
    { title: "Beats", count: stats.beats, icon: Disc, color: "bg-purple-500" },
    { title: "Videos", count: stats.videos, icon: Video, color: "bg-red-500" },
    { title: "Songs", count: stats.songs, icon: Music, color: "bg-green-500" },
  ];

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };
  return (
    <div className="min-h-screen p-4 bg-gray-200 dark:bg-gray-900 relative">
      {/* Navbar */}
      <nav className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold dark:text-white md:text-3xl">
          Admin Panel
        </h1>
        <div className="space-x-3 flex items-center">
          {/* Theme toggle */}
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => navigate("/logout")}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* refresh button */}
      <button
        onClick={handleRefresh}
        className="fixed bottom-10 right-10 bg-gray-200 dark:bg-white p-2 rounded-full z-20"
      >
        <RefreshCw
          size={40}
          className={`text-blue-600 bg-transparent ${
            refresh ? "animate-spin duration-700" : ""
          }`}
        />
      </button>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(({ title, count, icon: Icon, color }) => (
          <Card
            key={title}
            className="shadow-lg hover:scale-105 transition-transform"
          >
            <CardContent className="flex flex-col justify-between p-6 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-4xl font-bold">{count}</p>
                </div>
                <div className={`${color} p-4 rounded-full`}>
                  <Icon className="text-white" size={28} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/admin/${title.toLowerCase()}`)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg"
                >
                  View All
                </button>
                <button
                  onClick={() =>
                    navigate(`/admin/create/${title.toLowerCase()}`)
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                  + New
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-4">Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 5, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="posts" stroke="#8884d8" />
              <Line type="monotone" dataKey="beats" stroke="#82ca9d" />
              <Line type="monotone" dataKey="songs" stroke="#ff7f50" />
              <Line type="monotone" dataKey="videos" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-lg mb-4">Recent Uploads</h3>
          <ul className="space-y-2">
            {activity.map((act, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                {act.text}{" "}-{" "}<span className="text-gray-500">{act.title}</span>{" "}<br />                <span className="text-gray-500">{act.date}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
