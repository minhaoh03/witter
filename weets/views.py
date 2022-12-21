# django utils
from django.shortcuts import render
from django.http import QueryDict

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
    
    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = WeetSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user.id)
            return Response(serializer.data, status=201)
        return Response({'Something went wrong'}, 404)
    
class DigViewSet(viewsets.ModelViewSet):
    queryset = Dig.objects.all()
    serializer_class = DigSerializer
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
        