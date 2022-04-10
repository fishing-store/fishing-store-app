import uuid
from django.db import models


# product model
class Product(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
