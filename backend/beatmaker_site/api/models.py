from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Post(models.Model):
    POST_TYPES = [
    ('beat', 'Beat'),
    ('song', 'Song'),
    ('video', 'Video'),
    ('promotion', 'Promotion'),
    ('annoucement', 'Annoucement'),
]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    post_type = models.CharField(max_length=20, choices=POST_TYPES, default='promotion')
    video_url = models.URLField(blank=True)
    audio_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.post_type})"


class Song(models.Model):
    title = models.CharField(max_length=255)
    spotify = models.URLField(blank=True)
    boomplay = models.URLField(blank=True)
    deezer = models.URLField(blank=True)
    youtube_music = models.URLField(blank=True)
    apple_music = models.URLField(blank=True)
    audio_mack = models.URLField(blank=True)
    cover_img = models.URLField(blank=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

class Music_video(models.Model):
    title = models.CharField(max_length=255)
    youtube_url = models.URLField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"

class Beat(models.Model):
    title = models.CharField(max_length=255)
    beat_url = models.URLField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"