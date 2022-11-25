from rest_framework import serializers

from .models import Weet, Dig, Comment

class WeetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weet
        fields = '__all__'

class DigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dig
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'