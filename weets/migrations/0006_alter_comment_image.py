# Generated by Django 4.1.3 on 2022-11-25 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weets', '0005_weet_digs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='commentimgs/'),
        ),
    ]
