# django utilsdata
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

# drf
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

# py
from .models import User
from .serializers import UserSerializer
import json

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request):
        serializer = UserSerializer(data = request.data)

        if serializer.is_valid():
            serializer.create(data = request.data)
            return Response({'message': "User is successfully created"})
        else:
            return Response(serializer.errors,
            status = status.HTTP_400_BAD_REQUEST)
    
    def get_user(id_):
        try:
            return User.objects.get(pk=id_) # <-- tried to get by email here
        except User.DoesNotExist:
            return None


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})



def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def currentuser_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({'username': request.user.username})