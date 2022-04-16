import json
from django.http import HttpResponse, HttpRequest
from .models import Product
from .serializers import ProductSerializer
from rest_framework import generics
from rest_framework.decorators import api_view

class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# receiving product as POST in JSON format and writing it to Django database
@api_view(['POST'])
def add_product(request: HttpRequest):
    if request.method == "POST":
        product = ProductSerializer(data=request.data)
        if product.is_valid():
            product.save()
            return HttpResponse(status=201)
        else:
            print(product.errors)
            return HttpResponse(product.errors, status=400)


# deleting product by its id
def delete_product(request: HttpRequest, id: int):
    product = Product.objects.get(id=id)
    if product:
        product.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)


# put product by id using ProductSerializer
def put_product(request: HttpRequest, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, data=request.body)
    if serializer.is_valid():
        serializer.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(serializer.errors, status=400)


# patch product by id only if field is defined in request body
def patch_product(request: HttpRequest, id: int):
    product = Product.objects.get(id=id)
    if product:
        updated_product = ProductSerializer(data=request.body)
        if updated_product.is_valid():
            if "name" in updated_product.validated_data:
                product.name = updated_product.validated_data["name"]
            if "price" in updated_product.validated_data:
                product.price = updated_product.validated_data["price"]
            if "description" in updated_product.validated_data:
                product.description = updated_product.validated_data["description"]
            if "image" in updated_product.validated_data:
                product.image = updated_product.validated_data["image"]
            if "count" in updated_product.validated_data:
                product.image = updated_product.validated_data["count"]
            product.save()
            return HttpResponse(status=200)
        else:
            return HttpResponse(updated_product.errors, status=400)
    else:
        return HttpResponse(status=404)


def get_add_update_product(request: HttpRequest, id: int):
    if request.method == "GET":
        return get_product(request, id)
    elif request.method == "DELETE":
        return delete_product(request, id)
    elif request.method == "PUT":
        return put_product(request, id)
    elif request.method == "PATCH":
        return patch_product(request, id)
    else:
        return HttpResponse(status=405)


# endpoint returing products in JSON format using ProductSerializer
def get_all_products(request: HttpRequest):
    if request.method == "GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return HttpResponse(json.dumps(serializer.data, indent=4), content_type="application/json")
    else:
        return HttpResponse(status=405)


# endpoint returing product by its id
def get_product(request: HttpRequest, id):
    product = Product.objects.get(id=id)
    if product:
        serializer = ProductSerializer(product)
        return HttpResponse(json.dumps(serializer.data, indent=4), content_type="application/json")
    else:
        return HttpResponse(status=404)


# endpoint writing 5 fishingrods as products to Django database
def add_mockup_products(request: HttpRequest):
    products = [
        {
            "name": "Fishingrod 1",
            "price": "100",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527",
            "count": "20"
        },
        {
            "name": "Fishingrod 2",
            "price": "200",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527",
            "count": "20"
        },
        {
            "name": "Fishingrod 3",
            "price": "300",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527",
            "count": "20"
        },
        {
            "name": "Fishingrod 4",
            "price": "400",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527",
            "count": "20"
        },
        {
            "name": "Fishingrod 5",
            "price": "500",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527",
            "count": "20"
        }
    ]

    for product in products:
        product_object = ProductSerializer(data=product)
        if product_object.is_valid():
            product_object.save()

    return HttpResponse(json.dumps(products, indent=4), content_type="application/json")
