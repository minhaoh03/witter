from django.urls import path, include

from rest_framework import routers

from users import views

router = routers.DefaultRouter()
router.register(r'api', views.UserViewSet, basename = 'user')

urlpatterns = [
    path('', include(router.urls))
]