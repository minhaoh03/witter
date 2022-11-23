# Generated by Django 4.1.3 on 2022-11-22 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('username', models.TextField(max_length=30, unique=True)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('bio', models.TextField(blank=True, max_length=300, null=True)),
                ('birth_date', models.DateTimeField(auto_now_add=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profpics/')),
                ('privacy', models.CharField(choices=[('public', 'public'), ('followers', 'followers'), ('private', 'private')], default='public', max_length=9)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
