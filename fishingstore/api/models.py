import uuid
from django.db import models
from jsonfield import JSONField
import time
from django.contrib.auth.models import User


def upload_path(instance, filename):
    return '/'.join(['images', str(instance.name), str(time.time()) + filename])


# product model
class Product(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.CharField(max_length=500)
    image = models.ImageField(upload_to=upload_path)
    count = models.IntegerField(default=20)
    categories = JSONField(null=True)

    def __str__(self):
        return self.name


class Info(models.Model):
    email = models.CharField(max_length=200)
    phoneNumber = models.CharField(max_length=11)
    address = models.CharField(max_length=500)
    openHours = models.CharField(max_length=20)


class Category(models.Model):
    name = models.CharField(max_length=200)


class Order(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    deliveryType = models.CharField(max_length=200)
    products = JSONField(null=True)
    inpostDetails = JSONField(null=True)
    totalCost = models.FloatField(default=0)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    telephone = models.CharField(max_length=11)
    address = models.CharField(max_length=500)