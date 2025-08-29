// src/pages/ContentListPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaSpotify, FaApple, FaDeezer, FaYoutube } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import AudiomackLogo from "@/assets/audiomack.svg";
import BoomplayLogo from "@/assets/boomplay.svg";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function extractVideoId(url) {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function ContentListPage() {
  const { resourceType } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/${resourceType}/`)
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [resourceType]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await api.delete(`/api/${resourceType}/${id}/`);
        setItems((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold capitalize">{resourceType}</h1>
        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <Button
            onClick={() => navigate(`/admin/create/${resourceType}`)}
            className="bg-blue-600 text-white"
          >
            + New {resourceType.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* 🔎 Search */}
      <div className="mb-6">
        <Input
          placeholder={`Search ${resourceType}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Content List */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p>No {resourceType} found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const imageSrc =
              item.cover_img || item.thumbnail_url || item.image_url;

            return (
              <Card
                key={item.id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <CardHeader>
                  <CardTitle>{item.title || "Untitled"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Cover Image */}
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={item.title || "content image"}
                      className="mb-3 rounded-lg h-40 w-full object-cover"
                    />
                  )}

                  {/* Different render by resourceType */}
                  {resourceType === "songs" || resourceType === "beats" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">🎧 Listen now</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                        {item.spotify && (
                          <DropdownMenuItem
                            onClick={() => window.open(item.spotify, "_blank")}
                          >
                            <FaSpotify className="mr-2 text-green-500" />{" "}
                            Spotify
                          </DropdownMenuItem>
                        )}
                        {item.apple_music && (
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(item.apple_music, "_blank")
                            }
                          >
                            <FaApple className="mr-2 text-gray-600" /> Apple
                            Music
                          </DropdownMenuItem>
                        )}
                        {item.audio_mack && (
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(item.audio_mack, "_blank")
                            }
                          >
                            <img
                              src={AudiomackLogo}
                              alt="Audiomack"
                              className="w-4 h-4 mr-2"
                            />
                            Audiomack
                          </DropdownMenuItem>
                        )}
                        {item.boomplay && (
                          <DropdownMenuItem
                            onClick={() => window.open(item.boomplay, "_blank")}
                          >
                            <img
                              src={BoomplayLogo}
                              alt="Boomplay"
                              className="w-4 h-4 mr-2"
                            />
                            Boomplay
                          </DropdownMenuItem>
                        )}
                        {item.deezer && (
                          <DropdownMenuItem
                            onClick={() => window.open(item.deezer, "_blank")}
                          >
                            <FaDeezer className="mr-2 text-pink-600" /> Deezer
                          </DropdownMenuItem>
                        )}
                        {item.youtube_music && (
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(item.youtube_music, "_blank")
                            }
                          >
                            <SiYoutubemusic className="mr-2 text-red-500" /> YT
                            Music
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : resourceType === "videos" ? (
                    <div className="aspect-w-16 aspect-h-9 mb-3">
                      {extractVideoId(item.youtube_url) ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${extractVideoId(
                            item.youtube_url
                          )}`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-56 rounded-lg"
                        />
                      ) : (
                        <p className="text-red-500">Invalid YouTube link</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.description || "No details available"}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(`/admin/edit/${resourceType}/${item.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
