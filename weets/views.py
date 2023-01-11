# django utils
from django.http import JsonResponse

# DRF
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view

# py
from .models import Weet, Dig
from .serializers import WeetSerializer, DigSerializer

class WeetViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    queryset = Weet.objects.all()
    serializer_class = WeetSerializer
    
    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = WeetSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response({'Something went wrong'}, 404)
    
@api_view(["POST"])
def comments(request):
    data = request.data
    weet = data['weet']
    allComments = Weet.objects.all().filter(parent=weet)
    serializer = WeetSerializer(allComments, many=True)
    print(serializer.data)
    return JsonResponse({"comments" : serializer.data})
    
class DigViewSet(viewsets.ModelViewSet):
    queryset = Dig.objects.all()
    serializer_class = DigSerializer

@api_view(["DELETE", "POST"])
def diggedWeet(request):
    data = request.data
    user = data['user']
    weet = data['weet']
    curDig = Dig.objects.all().filter(weet = weet, user = user)
    if request.method == "DELETE":
        if curDig:
            Dig.objects.all().filter(weet = weet, user = user).delete()
            return JsonResponse({'deleted': True})
        return JsonResponse({'deleted': False})
    elif request.method == "POST":
        if curDig:
            return JsonResponse({'liked': True})
        return JsonResponse({'liked': False})