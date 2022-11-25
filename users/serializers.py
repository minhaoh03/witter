# django utils
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.http import QueryDict

# rest framework
from rest_framework import serializers




User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, **validated_data):
        print('\n')
        final_data = QueryDict.dict(QueryDict.copy(validated_data['data']))
        final_data['password'] = make_password(validated_data['data']['password'])
        final_data.pop('csrfmiddlewaretoken')
        print(final_data)
        return super(UserSerializer, self).create(final_data)