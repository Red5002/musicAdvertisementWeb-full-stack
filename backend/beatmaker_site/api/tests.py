from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Post, Song, Music_video, Beat


class BaseAPITest(APITestCase):
    def setUp(self):
        # Create normal user
        self.user = User.objects.create_user(
            username="user", password="password123"
        )
        # Create admin user
        self.admin = User.objects.create_superuser(
            username="admin", password="adminpass"
        )
        # Auth URL
        self.token_url = "/api/token/"

    def get_token(self, username, password):
        response = self.client.post(self.token_url, {
            "username": username,
            "password": password
        })
        self.assertEqual(response.status_code, 200, response.data)
        return response.data["access"]


class PostViewSetTest(BaseAPITest):
    def test_anyone_can_list_posts(self):
        Post.objects.create(
            title="Test Post",
            description="Test description",
            post_type="promotion",
            created_by=self.admin
        )
        response = self.client.get("/api/posts/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_admin_can_create_post(self):
        token = self.get_token("admin", "adminpass")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post("/api/posts/", {
            "title": "Admin Post",
            "description": "By admin",
            "post_type": "song"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.first().created_by, self.admin)


class SongViewSetTest(BaseAPITest):
    def test_anyone_can_list_songs(self):
        Song.objects.create(
            title="Test Song",
            cover_img="https://example.com/cover.jpg",
            created_by=self.admin
        )
        response = self.client.get("/api/songs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_admin_can_create_song(self):
        token = self.get_token("admin", "adminpass")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post("/api/songs/", {
            "title": "New Song",
            "cover_img": "https://example.com/cover.jpg"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Song.objects.count(), 1)
        self.assertEqual(Song.objects.first().created_by, self.admin)


class MusicVideoViewSetTest(BaseAPITest):
    def test_anyone_can_list_videos(self):
        Music_video.objects.create(
            title="Test Video",
            youtube_url="https://youtube.com/watch?v=123",
            created_by=self.admin
        )
        response = self.client.get("/api/videos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_admin_can_create_video(self):
        token = self.get_token("admin", "adminpass")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post("/api/videos/", {
            "title": "New Video",
            "youtube_url": "https://youtube.com/watch?v=abc"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Music_video.objects.count(), 1)
        self.assertEqual(Music_video.objects.first().created_by, self.admin)


class BeatViewSetTest(BaseAPITest):
    def test_anyone_can_list_beats(self):
        Beat.objects.create(
            title="Test Beat",
            beat_url="https://example.com/beat.mp3",
            created_by=self.admin
        )
        response = self.client.get("/api/beats/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_admin_can_create_beat(self):
        token = self.get_token("admin", "adminpass")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post("/api/beats/", {
            "title": "New Beat",
            "beat_url": "https://example.com/beat.mp3"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Beat.objects.count(), 1)
        self.assertEqual(Beat.objects.first().created_by, self.admin)

class SongLatestTest(BaseAPITest):
    def test_latest_song_returns_most_recent(self):
        song1 = Song.objects.create(
            title="Old Song",
            cover_img="https://example.com/cover1.jpg",
            created_by=self.admin
        )
        song2 = Song.objects.create(
            title="New Song",
            cover_img="https://example.com/cover2.jpg",
            created_by=self.admin
        )
        response = self.client.get("/api/songs/latest/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], song2.title)

    def test_latest_song_returns_404_if_none_exist(self):
        response = self.client.get("/api/songs/latest/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

