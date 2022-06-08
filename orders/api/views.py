import json
import logging
from django.http import HttpResponse, HttpRequest

from .models import Order
from .serializers import OrderSerializer


def new_order(request: HttpRequest):
    logging.warning(request.body)
    if request.method == "POST":
        data = json.loads(request.body)
        data["products"] = json.dumps(data["products"])
        data["inpostDetails"] = json.dumps(data["inpostDetails"])
        order = OrderSerializer(data=data)
        if order.is_valid():
            order.save()
            return HttpResponse(status=201)
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
