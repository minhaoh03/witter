from django.contrib.auth import User

from rest_framework import serializers

class WeetSerializer(serializers.ModelSerializer):
    class Meta:
        model = 'Weet'
        content = '__all__'

class DigsSerializer(serializers.ModelSerializer):
    class Meta:
        model = 'Digs'
        content = '__all__'
        
class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = 'Comment'
        content = '__all__'