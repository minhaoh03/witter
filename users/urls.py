from django.urls import path, include

from rest_framework import routers

from users import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet, basename = 'user')


urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/csrf/', views.get_csrf, name='api-csrf'),
    path('auth/login/', views.login_view, name='api-login'),
    path('auth/logout/', views.logout_view, name='api-logout'),
    path('auth/session/', views.session_view, name='api-session'),
    path('auth/currentuser/', views.currentuser_view, name='api-currentuser'),
]