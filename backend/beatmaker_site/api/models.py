from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Post(models.Model):
    POST_TYPES = [
        ('beat', 'Beat'),
        ('song', 'Song'),
        ('video', 'Video'),
        ('promo', 'Promo/Announcement'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    post_type = models.CharField(max_length=20, choices=POST_TYPES, default='song')
    audio_url = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.post_type})"