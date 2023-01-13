from django.urls import path, include

from rest_framework import routers

from weets import views

router = routers.DefaultRouter()
router.register(r'weets', views.WeetViewSet, basename = 'weet')
router.register(r'digs', views.DigViewSet, basename = 'dig')

urlpatterns = [
    path('digs/digged/', views.diggedWeet, name='diggedWeet'),
    path('weets/reweeted/', views.reweetedWeet, name='reweetedWeet'),
    path('comments/', views.comments, name='comments'),
    path('api/', include(router.urls)),

]