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
from rest_framework.authtoken.models import Token

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
    
    def partial_update(self, request, *args, **kwargs):
        data = request.data
        instance = self.queryset.get(pk=kwargs.get('pk'))
        serializer = UserSerializer(instance, data = data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    def get_user(id_):
        try:
            return User.objects.get(pk=id_) # <-- tried to get by email here
        except User.DoesNotExist:
            return None
        
def get_user_by_token(request):
    token = request.headers['Authorization'][6:]
    user = User.objects.get(id=Token.objects.get(key=token).user.id)
    return JsonResponse({"id": user.id,
                         "username": user.username,
                         "email": user.email,
                         "first_name": user.first_name,
                         "last_name": user.last_name, 
                         "bio": user.bio,
                         "birth_date": user.birth_date,
                         "date_joined": user.date_joined,
                         "profile_picture": str(user.profile_picture)
                        })

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
    
    username = username.lower()

    user = authenticate(username=username, password=password)
    
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    if Token.objects.filter(user=user):
        token = Token.objects.get(user=user)
    else:
        token = Token.objects.create(user=user)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.', 'Authentication' : 'Token ' + str(token)})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})