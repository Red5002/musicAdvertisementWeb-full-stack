// src/formConfig.js
export const resourceConfig = {
  post: {
    endpoint: "/api/posts/",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "post_type",
        type: "select",
        label: "Post Type",
        options: [
          { value: "beat", label: "Beat" },
          { value: "song", label: "Song" },
          { value: "video", label: "Video" },
          { value: "promotion", label: "Promotion" },
          { value: "annoucement", label: "Announcement" },
        ],
      },
      { name: "audio_url", type: "url", label: "Audio Link" },
      { name: "video_url", type: "url", label: "Video Link" },
      { name: "image_url", type: "file", label: "Image Link" },
    ],
  },
  song: {
    endpoint: "/api/songs/",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "spotify", type: "url", label: "Spotify Link" },
      { name: "boomplay", type: "url", label: "Boomplay Link" },
      { name: "deezer", type: "url", label: "Deezer Link" },
      { name: "youtube_music", type: "url", label: "YouTube Music Link" },
      { name: "apple_music", type: "url", label: "Apple Music Link" },
      { name: "audio_mack", type: "url", label: "Audiomack Link" },
      { name: "cover_img", type: "file", label: "Cover Image" },
    ],
  },
  video: {
    endpoint: "/api/videos/",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "youtube_url", type: "url", label: "YouTube URL" },
    ],
  },
  beat: {
    endpoint: "/api/beats/",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "beat_url", type: "url", label: "Beat URL" },
      { name: "thumbnail_url", type: "file", label: "Thumbnail Image" },
    ],
  },
};
