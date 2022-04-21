from rest_framework import serializers
from .models import Product, Info

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description', 'image', 'count')

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = ('email', 'phoneNumber', 'address', 'openHours')