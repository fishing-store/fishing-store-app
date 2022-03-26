from django.db import models


# product model
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=200)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image": self.image
        }

    def __str__(self):
        return self.name
