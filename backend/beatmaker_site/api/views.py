from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import * 
from .permissions import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status



class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

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