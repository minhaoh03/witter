from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User
from .forms import UserForm

class CustomUserAdmin(UserAdmin):
    form = UserForm
    fieldsets = (
        (None, {'fields': ('email', 'password', 'username',)}),
        (('Personal info'), {'fields': ('first_name', 'last_name',)}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                        'groups', 'user_permissions',)}),
        (('Important dates'), {'fields': ('last_login', 'date_joined', 'birth_date',)}),
        (('User Information'), {'fields': ('bio', 'profile_picture', 'privacy',)}),
    )

    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff',]
    search_fields = ('email', 'first_name', 'last_name',)
    ordering = ('email', )
    
    

# Register your models here.
admin.site.register(User, CustomUserAdmin)