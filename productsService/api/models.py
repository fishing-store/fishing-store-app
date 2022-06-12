import uuid
from django.db import models
from jsonfield import JSONField
import time


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


class Category(models.Model):
    name = models.CharField(max_length=200)
