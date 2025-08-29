from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path

router = DefaultRouter()
router.register('posts', PostViewSet)
router.register('videos', MusicVideoViewSet)
router.register('songs', SongViewSet)
router.register('beats', BeatViewSet)


urlpatterns = [
    path("chart-data/", chart_data, name="chart-data"),
]

urlpatterns += router.urls
