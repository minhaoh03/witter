# django utils
from django.shortcuts import render

# drf
from rest_framework import viewsets, permissions

# py
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer