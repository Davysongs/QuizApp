# Generated by Django 5.0.1 on 2024-01-27 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Results', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='result_id',
            field=models.CharField(max_length=13, primary_key=True, serialize=False),
        ),
    ]
