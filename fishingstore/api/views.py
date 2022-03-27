import json
from django.http import HttpResponse, HttpRequest
from .models import Product


def index(request: HttpRequest):
    # list of all endpoints
    endpoints = [
        {
            "endpoint": "/api/products",
            "method": "GET",
            "description": "Returns all products in JSON format"
        },
        {
            "endpoint": "/api/products/",
            "method": "POST",
            "description": "Receives product in JSON format and writes it to database"
        },
        {
            "endpoint": "/api/products/<id>",
            "method": "GET",
            "description": "Returns product by id in JSON format"
        },
        {
            "endpoint": "/api/products/<id>",
            "method": "DELETE",
            "description": "Deletes product by id"
        },
        {
            "endpoint": "/api/mockup",
            "method": "GET",
            "description": "Writes 5 mockup products to database and returns all products in JSON format"
        }
    ]

    # returning endpoints as JSON with indentation
    return HttpResponse(json.dumps(endpoints, indent=4), content_type="application/json")


# receiving product as POST in JSON format and writing it to Django database
def add_product(request: HttpRequest, id: int):
    try:
        product_json = json.loads(request.body)
        product_object = Product(
            name=product_json["name"],
            price=product_json["price"],
            description=product_json["description"],
            image=product_json["image"]
        )
        product_object.save()
        return HttpResponse(status=201)
    except Exception as error:
        return HttpResponse(error, status=400)


# deleting product by its id
def delete_product(request: HttpRequest, id: int):
    product = Product.objects.get(id=id)
    product.delete()
    return HttpResponse(status=204)


# updating product by its id
def update_product(request: HttpRequest, id: int):
    product = Product.objects.get(id=id)
    product_json = json.loads(request.body)
    product.name = product_json["name"]
    product.price = product_json["price"]
    product.description = product_json["description"]
    product.image = product_json["image"]
    product.save()
    return HttpResponse(status=200)


def get_add_update_product(request: HttpRequest, id: int):
    if request.method == "GET":
        return add_product(request, id)
    elif request.method == "POST":
        return delete_product(request, id)
    elif request.method == "UPDATE":
        return update_product(request, id)
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

    return HttpResponse(json.dumps(products, indent=4), content_type="application/json")
