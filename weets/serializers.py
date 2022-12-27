from rest_framework import serializers
from django.core.serializers import serialize
from datetime import datetime, timezone

from .models import Weet, Dig, Comment
from users.models import User

class WeetSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user_field')
    time_ago = serializers.SerializerMethodField('get_time_ago_field')
    
    def get_user_field(self, obj):
        return User.objects.filter(id=obj.user.id).values('first_name', 'last_name', 'username', 'profile_picture')
    
    def get_time_ago_field(self, obj):
        time_created = obj.timestamp
        seconds_ago = (datetime.now(timezone.utc) - time_created).total_seconds()
        
        years_ago = divmod(seconds_ago, 31536000)[0]
        days_ago = divmod(seconds_ago, 86400)[0]
        hours_ago = divmod(seconds_ago, 3600)[0]
        minutes_ago = divmod(seconds_ago, 60)[0]
        seconds_ago = divmod(seconds_ago, 1)[0]
        
        if 1 <= years_ago:
            return years_ago, "y"
        elif 1 <= days_ago < 364:
            return days_ago, "d"
        elif 1 <= hours_ago < 24:
            return hours_ago, "h"
        elif 1 <= minutes_ago < 60:
            return minutes_ago, "m"
        else:
            return seconds_ago, "s"
    
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