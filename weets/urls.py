from django.urls import path, include

from rest_framework import routers

from weets import views

router = routers.DefaultRouter()
router.register(r'weets', views.WeetViewSet, basename = 'weet')

urlpatterns = [
    path('', include(router.urls))
]