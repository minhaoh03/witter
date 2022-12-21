# Generated by Django 4.1.3 on 2022-12-20 20:42

import datetime
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_user_date_joined'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 20, 20, 42, 6, 266890, tzinfo=datetime.timezone.utc)),
        ),
    ]
