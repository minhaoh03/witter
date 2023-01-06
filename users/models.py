# django utils
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.utils import timezone

PUB = 'public'
FOL = 'followers'
PRI = 'private'

PRIVACY_CHOICES = (
    (PUB, 'public'),
    (FOL, 'followers'),
    (PRI, 'private')
)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, username, **extra_fields):
        if not email:
            return "You must have an email"
        if not password:
            return "You must have a password"
        if not username:
            return "You must have a username"
        email = self.normalize_email(email)
        user = User(email = email, password = password, username = username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
        
    def create_superuser(self, email, password, username, **extra_fields):        
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, username, **extra_fields)
        
class User(AbstractBaseUser, PermissionsMixin):
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
        blank = False, null = False,
        max_length = 100
    )
    last_name = models.CharField(
        blank = False, null = False,
        max_length = 100
    )
    bio = models.TextField(
        max_length = 300,
        blank = True, null = True
    )
    birth_date = models.DateField(
        blank = True, null = True,
    )
    date_joined = models.DateTimeField(
        default = timezone.now
    )
    last_login = models.DateTimeField(
        default = timezone.now
    )
    profile_picture = models.ImageField(
        null = True, blank = True,
        upload_to = (''),
        default = ('defaultpic.jpg')
    )
    privacy = models.CharField(
        max_length = 9,
        choices = PRIVACY_CHOICES,
        default = PUB
    )
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']
    
    # get_full_name?
    
    def __str__(self):
        return self.username
    
    # @property
    # def last_login(self, username):
    #     return User.objects.get(username = username).last_login