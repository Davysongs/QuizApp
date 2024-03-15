# Generated by Django 5.0.2 on 2024-03-15 16:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('RawApp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Result',
            fields=[
                ('score', models.FloatField()),
                ('result_id', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('question_ans', models.CharField(max_length=1000)),
                ('answer_status', models.CharField(max_length=1000)),
                ('status', models.CharField(max_length=6)),
                ('quiz', models.ForeignKey(default='', on_delete=django.db.models.deletion.SET_DEFAULT, to='RawApp.quiz')),
                ('user', models.ForeignKey(default='', on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
