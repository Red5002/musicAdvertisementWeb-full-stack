from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('posts', PostViewSet)
router.register('videos', MusicVideoViewSet)
router.register('songs', SongViewSet)
router.register('beats', BeatViewSet)


urlpatterns = router.urls
