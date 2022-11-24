from rest_framework import serializers

from .models import Weet, Digs, Comment

class WeetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weet
        fields = '__all__'

class DigsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Digs
        fields = '__all__'
        
class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'