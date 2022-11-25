# django utils
from django.shortcuts import render

# drf
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

# py
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request):
        print(request.data)
        serializer = UserSerializer(data = request.data)

        if serializer.is_valid():
            serializer.create(data = request.data)
            return Response({'message': "User is successfully created"})
        else:
            return Response(serializer.errors,
            status = status.HTTP_400_BAD_REQUEST)
    