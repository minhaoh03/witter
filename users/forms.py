from django.forms import ModelForm
from .models import User
from django.contrib import admin


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = '__all__'

class AdminUserForm(admin.ModelAdmin):
    form = UserForm