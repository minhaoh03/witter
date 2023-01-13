#django utils
from django.db import models
from django.contrib.auth import get_user_model

#py imports

#other models

User = get_user_model()

PUB = 'public'
FOL = 'followers'
PRI = 'private'

PRIVACY_CHOICES = (
    (PUB, 'public'),
    (FOL, 'followers'),
    (PRI, 'private')
)

# Create your models here.
class Weet(models.Model):
    id = models.AutoField(
        primary_key = True
    )
    text = models.TextField(
        blank = True, null = True,
        max_length = 300
    )
    digs = models.ManyToManyField(
        User, 
        related_name = 'weet_user', 
        through = 'Dig'
    )
    image = models.ImageField(
        blank = True, null = True,
        upload_to = (''),
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
        on_delete = models.SET_NULL,
        related_name='childrenWeets'
    )
    child = models.ForeignKey(
        'self', 
        blank = True, null = True,
        on_delete = models.SET_NULL,
        related_name='parentWeet'
    )
    privacy = models.CharField(
        choices = PRIVACY_CHOICES,
        default = PUB,
        max_length = 9
    )
    
    def save(self, *args, **kwargs):
        self.privacy = self.user.privacy
        super().save(*args, **kwargs)
        
    @property
    def get_likes(self):
        return self.digs.count()
    
    @property
    def get_reweets(self):
        return Weet.objects.filter(child=self).count()
    
    @property
    def get_comments(self):
        return Weet.objects.filter(parent=self).count()
    
    class Meta:
        ordering = ['-id']
    
class Dig(models.Model):
    id = models.AutoField(
        primary_key = True
    )
    user = models.ForeignKey(
        User, 
        on_delete = models.CASCADE
    )
    weet = models.ForeignKey(
        'Weet',
        blank = True, null = True,
        on_delete = models.CASCADE
    )
    timestamp = models.DateTimeField(
        auto_now_add = True
    )
