# Generated by Django 3.2.4 on 2021-07-02 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0014_userpattern'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpattern',
            name='movie_index',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userpattern',
            name='names_index',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
    ]
