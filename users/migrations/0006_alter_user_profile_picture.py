# Generated by Django 4.1.3 on 2023-01-06 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default='media/defaultpic.jpg', null=True, upload_to='media/'),
        ),
    ]