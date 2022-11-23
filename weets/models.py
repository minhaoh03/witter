#django utils
from django.db import models
from django.contrib.auth import get_user_model

#py imports

#other models

User = get_user_model()

# Create your models here.
class Weet(models.Model):
    id = models.AutoField(
        primary_key = True
    )
    text = models.TextField(
        blank = True, null = True, 
        max_length = 300
    )
    image = models.ImageField(
        upload_to = 'images/', 
        blank = True, null = True
    )
    timestamp = models.DateTimeField(
        auto_now_add = True
    )
    user = models.ForeignKey(
        User, 
        on_delete = models.CASCADE
    )
    parent = models.ForeignKey(
        'self', 
        blank = True, null = True,
        on_delete = models.SET_NULL
    )
    privacy = models.CharField(  
    )
    
    def save(self, *args, **kwargs):
        if self.user.privacy == User.PUB:
            self.privacy = User.PUB
        elif self.user.privacy == User.FOL:
            self.privacy = User.FOL
        else:
            self.privacy = User.PRI
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-id']
    
class Digs(models.Model):
    id = models.AutoField(
        primary_key = True
    )
    user = models.ForeignKey(
        User, 
        on_delete = models.CASCADE
    )
    weet = models.ForeignKey(
        'Weet',
        on_delete = models.CASCADE
    )
    comment = models.ForeignKey(
        'Comment',
        on_delete = models.CASCADE
    )
    timestamp = models.DateTimeField(
        auto_now_add = True
    )

class Comment(models.Model):
    id = models.AutoField(
        primary_key = True
    ) 
    root_weet = models.ForeignKey(
        'Weet', 
        on_delete = models.CASCADE,
    )
    text = models.TextField(
        max_length = 300,
        blank = False, null = False
    )
    image = models.ImageField(
        upload_to = 'commentimgs/',
    )
    timestamp = models.DateTimeField(
        auto_now_add = True,
    )
    user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        blank = False, null = False
    )
    