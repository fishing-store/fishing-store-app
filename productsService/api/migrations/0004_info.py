# Generated by Django 4.0.3 on 2022-04-19 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_product_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Info',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=200)),
                ('phoneNumber', models.CharField(max_length=11)),
                ('address', models.CharField(max_length=500)),
                ('openHours', models.CharField(max_length=20)),
            ],
        ),
    ]