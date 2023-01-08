from django.urls import path, include

from rest_framework import routers

from weets import views

router = routers.DefaultRouter()
router.register(r'weets', views.WeetViewSet, basename = 'weet')
router.register(r'digs', views.DigViewSet, basename = 'dig')
router.register(r'comments', views.CommentViewSet, basename = 'comment')

urlpatterns = [
    path('digs/digged/', views.diggedWeet, name='diggedWeet'),
    path('comments/weetComments/', views.getWeetComments, name='weetComments'),
    path('api/', include(router.urls)),

]