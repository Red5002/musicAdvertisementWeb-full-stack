from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import * 
from .permissions import *



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

class MusicVideoViewSet(viewsets.ModelViewSet):
    queryset = Music_video.objects.all().order_by('-created_at')
    serializer_class = MusicVideoSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)

class BeatViewSet(viewsets.ModelViewSet):
    queryset = Beat.objects.all().order_by('-created_at')
    serializer_class = BeatSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(created_by = self.request.user)