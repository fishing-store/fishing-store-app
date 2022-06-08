import uuid
from django.db import models
from jsonfield import JSONField


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
    status = models.CharField(default="New", max_length=25)
