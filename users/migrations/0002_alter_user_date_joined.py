# Generated by Django 4.1.3 on 2022-12-21 19:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 21, 19, 39, 24, 448654, tzinfo=datetime.timezone.utc)),
        ),
    ]
