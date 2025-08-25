from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']

class MusicVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music_video
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']

class BeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beat
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']