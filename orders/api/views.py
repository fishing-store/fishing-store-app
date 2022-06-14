import json
import logging
from uuid import UUID

import requests
from django.http import HttpResponse, HttpRequest

from .models import Order
from .serializers import OrderSerializer


def new_order(request: HttpRequest):
    logging.warning(request.body)
    if request.method == "POST":
        data = json.loads(request.body)
        products = data["products"]
        data["products"] = json.dumps(products)
        data["inpostDetails"] = json.dumps(data["inpostDetails"])
        order = OrderSerializer(data=data)
        response = requests.post("http://127.0.0.1:8000/api/fetch-products/", json={"products": json.dumps(products)},)
        if order.is_valid() and response.status_code == 200:
            order.save()
            return HttpResponse(json.dumps(order.data, indent=4), content_type="application/json", status=201)
        else:
            logging.critical(order.errors)
            return HttpResponse(order.errors, status=400)


def get_all_orders(request: HttpRequest):
    if request.method == "GET":
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return HttpResponse(json.dumps(serializer.data, indent=4), content_type="application/json")
    else:
        return HttpResponse(status=405)


def get_user_orders(request: HttpRequest, email):
    if request.method == "GET":
        orders = Order.objects.filter(email=email)
        serializer = OrderSerializer(orders, many=True)
        return HttpResponse(json.dumps(serializer.data, indent=4), content_type="application/json")
    else:
        return HttpResponse(status=405)


def get_order(request: HttpRequest, id: UUID):
    if request.method == "GET":
        order = Order.objects.filter(id=id).first()
        serializer = OrderSerializer(order)
        return HttpResponse(json.dumps(serializer.data, indent=4), content_type="application/json")
    else:
        return HttpResponse(status=405)
