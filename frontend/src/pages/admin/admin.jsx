import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Sun, Moon, Music, Video, FileText, Disc } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import api from "@/api";
import { useTheme } from "next-themes";

export default function AdminPanel() {
  const [stats, setStats] = useState({
    posts: 0,
    beats: 0,
    videos: 0,
    songs: 0,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    Promise.all([
      api.get("/api/posts/"),
      api.get("/api/beats/"),
      api.get("/api/videos/"),
      api.get("/api/songs/"),
    ])
      .then(([p, b, v, s]) => {
        setStats({
          posts: p.data.length,
          beats: b.data.length,
          videos: v.data.length,
          songs: s.data.length,
        });
        setActivity([
          { text: "✅ New song posted", date: "Aug 25" },
          { text: "🎬 Video updated", date: "Aug 24" },
          { text: "📝 Blog created", date: "Aug 23" },
        ]);
      })
      .catch(console.error);
  }, []);

  const cards = [
    { title: "Posts", count: stats.posts, icon: FileText, color: "bg-blue-500" },
    { title: "Beats", count: stats.beats, icon: Disc, color: "bg-purple-500" },
    { title: "Videos", count: stats.videos, icon: Video, color: "bg-red-500" },
    { title: "Songs", count: stats.songs, icon: Music, color: "bg-green-500" },
  ];

  const chartData = [
    { name: "Mon", posts: 2, beats: 1 },
    { name: "Tue", posts: 4, beats: 2 },
    { name: "Wed", posts: 3, beats: 0 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-3 flex items-center">
          {/* Theme toggle */}
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => navigate("/admin/create/")}
          >
            + New Post
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => navigate("/logout")}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">Filter by type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="posts">Posts</SelectItem>
            <SelectItem value="beats">Beats</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
            <SelectItem value="songs">Songs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards with Quick Actions */}
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
                  onClick={() => navigate(`/admin/${title.toLowerCase()}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                  + New
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs: Drafts / Published */}
      <Tabs defaultValue="published" className="mb-8">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="published">
          <p className="text-gray-600 dark:text-gray-300">Published content list…</p>
        </TabsContent>
        <TabsContent value="drafts">
          <p className="text-gray-600 dark:text-gray-300">Draft content list…</p>
        </TabsContent>
      </Tabs>

      {/* Stats over time + Activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-4">Growth Over Time</h3>
          <LineChart width={500} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="posts" stroke="#8884d8" />
            <Line type="monotone" dataKey="beats" stroke="#82ca9d" />
          </LineChart>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <ul className="space-y-2">
            {activity.map((act, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                {act.text} - <span className="text-gray-500">{act.date}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
