from django.urls import path, include

from rest_framework import routers
from rest_framework.authtoken import views as tokenview

from users import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet, basename = 'user')


urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/getuser/', views.get_user_by_token, name='api-getuser'),
    path('auth/csrf/', views.get_csrf, name='api-csrf'),
    path('auth/login/', views.login_view, name='api-login'),
    path('auth/logout/', views.logout_view, name='api-logout'),
    path('auth/obtain-token/', tokenview.obtain_auth_token, name='get-token'),
]