from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import * 
from .permissions import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now, timedelta
from django.db.models.functions import TruncDay
from django.db.models import Count # adjust names

@api_view(["GET"])
@permission_classes([IsAuthenticated])  # or remove if public
def chart_data(request):
    today = now().date()
    last_7_days = today - timedelta(days=6)

    def count_by_day(queryset):
        return (
            queryset.filter(created_at__date__gte=last_7_days)
            .annotate(day=TruncDay("created_at"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

    posts = count_by_day(Post.objects.all())
    beats = count_by_day(Beat.objects.all())
    songs = count_by_day(Song.objects.all())
    videos = count_by_day(Music_video.objects.all())

    # Convert to dict for quick lookup
    posts_dict = {p["day"].strftime("%a"): p["count"] for p in posts}
    beats_dict = {b["day"].strftime("%a"): b["count"] for b in beats}
    songs_dict = {s["day"].strftime("%a"): s["count"] for s in songs}
    videos_dict = {v["day"].strftime("%a"): v["count"] for v in videos}

    # Build response
    data = []
    for i in range(7):
        day = (last_7_days + timedelta(days=i)).strftime("%a")
        data.append({
            "name": day,
            "posts": posts_dict.get(day, 0),
            "beats": beats_dict.get(day, 0),
            "songs": songs_dict.get(day, 0),
            "videos": videos_dict.get(day, 0),
        })

    return Response(data)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

    @action(detail=False, methods=["get"], url_path="latest")
    def latest(self, request):
        try:
            post = Post.latest_post()
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response(
                {"detail": "No posts available."},
                status=status.HTTP_404_NOT_FOUND
            )            

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all().order_by('-created_at')
    serializer_class = SongSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

    @action(detail=False, methods=["get"], url_path="latest")
    def latest(self, request):
        try:
            song = Song.latest_song()
            serializer = self.get_serializer(song)
            return Response(serializer.data)
        except Song.DoesNotExist:
            return Response(
                {"detail": "No songs available."},
                status=status.HTTP_404_NOT_FOUND
            )    

class MusicVideoViewSet(viewsets.ModelViewSet):
    queryset = Music_video.objects.all().order_by('-created_at')
    serializer_class = MusicVideoSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

    @action(detail=False, methods=["get"], url_path="latest")
    def latest(self, request):
        try:
            video = Music_video.latest_video()
            serializer = self.get_serializer(video)
            return Response(serializer.data)
        except Music_video.DoesNotExist:
            return Response(
                {"detail": "No videos available."},
                status=status.HTTP_404_NOT_FOUND
            )        

class BeatViewSet(viewsets.ModelViewSet):
    queryset = Beat.objects.all().order_by('-created_at')
    serializer_class = BeatSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

    @action(detail=False, methods=["get"], url_path="latest")
    def latest(self, request):
        try:
            beat = Beat.latest_beat()
            serializer = self.get_serializer(beat)
            return Response(serializer.data)
        except Beat.DoesNotExist:
            return Response(
                {"detail": "No beats available."},
                status=status.HTTP_404_NOT_FOUND
            )        