# Generated by Django 3.2.4 on 2021-07-01 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0012_alter_user_movie_link_clicked'),
    ]

    operations = [
        migrations.AddField(
            model_name='dynamic',
            name='movies_select_count',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='dynamic',
            name='survey_time',
            field=models.IntegerField(null=True),
        ),
    ]
