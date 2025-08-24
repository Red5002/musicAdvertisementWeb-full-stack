from django.contrib import admin
from .models import Post, Song, Music_video, Beat

# Register your models here.
admin.site.register(Post)
admin.site.register(Song)
admin.site.register(Music_video)
admin.site.register(Beat)