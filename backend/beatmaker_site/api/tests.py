from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from api.models import Post, Song, Music_video, Beat
from django.urls import reverse
from django.utils import timezone
from datetime import timedelta


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

class MusicVideoLatestTest(BaseAPITest):
    def test_latest_video_returns_most_recent(self):
        video1 = Music_video.objects.create(
            title="Old video",
            youtube_url="https://example.com/video1.mp4",
            created_by=self.admin
        )
        video2 = Music_video.objects.create(
            title="New video",
            youtube_url="https://example.com/video2.mp4",
            created_by=self.admin
        )
        response = self.client.get("/api/videos/latest/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], video2.title)

    def test_latest_video_returns_404_if_none_exist(self):
        response = self.client.get("/api/videos/latest/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BeatLatestTest(BaseAPITest):
    def test_latest_beat_returns_most_recent(self):
        beat1 = Beat.objects.create(
            title="Old beat",
            beat_url="https://example-beat.com/beat1.mp3",
            thumbnail_url="https://example.com/cover1.jpg",
            created_by=self.admin
        )
        beat2 = Beat.objects.create(
            title="New beat",
            beat_url="https://example-beat.com/beat2.mp3",
            thumbnail_url="https://example.com/cover2.jpg",
            created_by=self.admin
        )
        response = self.client.get("/api/beats/latest/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], beat2.title)

    def test_latest_beat_returns_404_if_none_exist(self):
        response = self.client.get("/api/beats/latest/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class PostLatestTest(BaseAPITest):
    def test_latest_post_returns_most_recent(self):
        post1 = Post.objects.create(
            title="Old post",
            description="hello guys",
            post_type="song",
            audio_url="https://example-beat.com/beat1.mp3",
            image_url="https://example.com/cover1.jpg",
            created_by=self.admin
        )
        post2 = Post.objects.create(
            title="new post",
            description="hello guys",
            post_type="song",
            audio_url="https://example-beat.com/beat2.mp3",
            image_url="https://example.com/cover2.jpg",
            created_by=self.admin
        )
       
        response = self.client.get("/api/posts/latest/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], post2.title)

    def test_latest_post_returns_404_if_none_exist(self):
        response = self.client.get("/api/posts/latest/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class ChartDataViewTest(APITestCase):
    def setUp(self):
        # Create a test user (optional if your view requires auth)
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create some content with different dates
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)

        Post.objects.create(title="Test Post",post_type="promotion", description="desc", created_at=today, created_by=self.user)
        Beat.objects.create(title="Test Beat", created_at=today, created_by=self.user)
        Song.objects.create(title="Test Song", created_at=yesterday, created_by=self.user)
        Music_video.objects.create(title="Test Video", created_at=today, created_by=self.user)

    def test_chart_data_response(self):
        url = reverse("chart-data")  # basename + -list
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure response contains the right structure
        self.assertIsInstance(response.data, list)
        self.assertTrue(all("name" in day for day in response.data))
        self.assertTrue(all("posts" in day for day in response.data))
        self.assertTrue(all("beats" in day for day in response.data))
        self.assertTrue(all("songs" in day for day in response.data))
        self.assertTrue(all("videos" in day for day in response.data))

        # Optional: Check at least one day has non-zero data
        total_posts = sum(d["posts"] for d in response.data)
        self.assertGreater(total_posts, 0)