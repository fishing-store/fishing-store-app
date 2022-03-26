import json
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from fishingstoreapp.models import Product


def index(request: HttpRequest):
    # list of all endpoints
    endpoints = [
        {
            "name": "add_product",
            "method": "POST",
            "url": "/api/v1/products",
            "description": "Add product to database"
        },
        {
            "name": "get_products",
            "method": "GET",
            "url": "/api/v1/products",
            "description": "Get all products from database"
        },
        {
            "name": "get_product_by_id",
            "method": "GET",
            "url": "/api/v1/products/{id}",
            "description": "Get product by id"
        },
        {
            "name": "add_mockup_products",
            "method": "POST",
            "url": "/api/v1/products/mockup",
            "description": "Add mockup products to database"
        }
    ]

    # returning endpoints as JSON with indentation
    return HttpResponse(json.dumps(endpoints, indent=4), content_type="application/json")


# endpoint receiving product as POST in JSON format and writing it to Django database
def add_product(request: HttpRequest):
    if request.method == "POST":
        data = json.loads(request.body)
        product = Product(
            name=data["name"],
            price=data["price"],
            description=data["description"],
            image=data["image"]
        )
        product.save()
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)


# endpoint returing products in JSON format
def get_products(request: HttpRequest):
    if request.method == "GET":
        products = Product.objects.all()
        products_json = [product.serialize() for product in products]
        return HttpResponse(json.dumps(products_json, indent=4), content_type="application/json")
    else:
        return HttpResponse(status=405)


# endpoint returing product by its id
def get_product_by_id(request: HttpRequest, id):
    if request.method == "GET":
        product = Product.objects.get(id=id)
        return HttpResponse(json.dumps(product.serialize(), indent=4), content_type="application/json")
    else:
        return HttpResponse(status=405)


# endpoint writing 5 fishingrods as products to Django database
def add_mockup_products(request: HttpRequest):
    products = [
        {
            "name": "Fishingrod 1",
            "price": "100",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527"
        },
        {
            "name": "Fishingrod 2",
            "price": "200",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527"
        },
        {
            "name": "Fishingrod 3",
            "price": "300",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527"
        },
        {
            "name": "Fishingrod 4",
            "price": "400",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527"
        },
        {
            "name": "Fishingrod 5",
            "price": "500",
            "description": "Fishingrod description",
            "image": "https://www.rei.com/media/product/148527"
        }
    ]

    for product in products:
        product_object = Product(
            name=product["name"],
            price=product["price"],
            description=product["description"],
            image=product["image"]
        )
        product_object.save()

    return HttpResponse(status=201)
