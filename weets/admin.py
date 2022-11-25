from django.contrib import admin

from .models import Weet, Dig, Comment

# Register your models here.
admin.site.register(Weet)
admin.site.register(Comment)
admin.site.register(Dig)
