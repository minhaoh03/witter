# Generated by Django 4.1.3 on 2022-12-20 20:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_user_date_joined'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 20, 20, 39, 44, 491555, tzinfo=datetime.timezone.utc)),
        ),
    ]
