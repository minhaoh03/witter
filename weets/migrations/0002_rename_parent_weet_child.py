# Generated by Django 4.1.3 on 2023-01-06 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weets', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='weet',
            old_name='parent',
            new_name='child',
        ),
    ]
