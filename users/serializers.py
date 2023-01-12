# django utils
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.http import QueryDict

# jwt

# rest framework
from rest_framework import serializers

import json

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, **validated_data):
        data = validated_data['data']
        if not isinstance(data, dict):
            final_data = QueryDict.dict(QueryDict.copy(data))
        else:
            final_data = data
        final_data['password'] = make_password(final_data['password'])
        
        # CSRF in default HTML form
        if('csrfmiddlewaretoken' in final_data):
            final_data.pop('csrfmiddlewaretoken')
        
        final_data['username'] = final_data['username'].lower()
        
        return super(UserSerializer, self).create(final_data)