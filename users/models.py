# django utils
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
)

PUB = 'public'
FOL = 'followers'
PRI = 'private'

privacy_choices = (
    (PUB, 'public'),
    (FOL, 'followers'),
    (PRI, 'private')
)

# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(
        unique = True,
        max_length=255,
        blank = False, null = False,
    )
    username = models.TextField(
        unique = True,
        blank = False, null = False,
        max_length = 30
    )
    first_name = models.CharField(
        max_length = 100
    )
    last_name = models.CharField(
        max_length = 100
    )
    bio = models.TextField(
        max_length = 300,
        blank = True, null = True
    )
    birth_date = models.DateTimeField(
        auto_now_add = True,
        blank = False, null = False,
    )
    date_created = models.DateTimeField(
        auto_now_add = True,
        blank = False, null = False,
    )
    profile_picture = models.ImageField(
        null = True, blank = True,
        upload_to=('profpics/')
    )
    privacy = models.CharField(
        max_length = 9,
        choices = privacy_choices,
        default = PUB
    )
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'birth_date']
    
    # get_full_name?
    
    @property
    def last_login(self, username):
        return User.objects.get(username = username).last_login