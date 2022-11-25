# django utils
from django.shortcuts import render

# DRF
from rest_framework import viewsets, permissions
from rest_framework.response import Response

# py
from .models import Weet, Dig, Comment
from .serializers import WeetSerializer, DigSerializer, CommentSerializer

def home_view(request, *args, **kwargs):
    return render(request, "home.html")

class WeetViewSet(viewsets.ModelViewSet):
    queryset = Weet.objects.all()
    serializer_class = WeetSerializer
    
class DigViewSet(viewsets.ModelViewSet):
    queryset = Dig.objects.all()
    serializer_class = DigSerializer
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
        