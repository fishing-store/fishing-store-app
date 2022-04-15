from django.db import models


# product model
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=200)
    count = models.IntegerField(default=20)
    
    def __str__(self):
        return self.name
