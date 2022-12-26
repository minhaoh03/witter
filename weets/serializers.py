from rest_framework import serializers
from django.core.serializers import serialize

from .models import Weet, Dig, Comment
from users.models import User

class WeetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user_field')
    
    def get_user_field(self, obj):
        return User.objects.filter(id=obj.user.id).values('first_name', 'last_name', 'username', 'profile_picture')
        
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