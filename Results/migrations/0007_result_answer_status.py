# Generated by Django 5.0.1 on 2024-01-31 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Results', '0006_rename_options_selected_result_question_ans_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='answer_status',
            field=models.CharField(default=None, max_length=6),
        ),
    ]
