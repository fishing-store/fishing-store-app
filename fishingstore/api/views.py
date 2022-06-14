import json
import logging
from uuid import UUID

from django.contrib.auth.models import User
from django.http import HttpResponse, HttpRequest, JsonResponse
from rest_framework.views import APIView

from .models import Order, UserInfo
from .serializers import OrderSerializer, UserInfoSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Category, Product, Info
from .serializers import ProductSerializer, InfoSerializer, CategorySerializer, MyTokenObtainPairSerializer, \
    RegisterSerializer, LoginSerializer


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
            categories = json.loads(request.data.get("categories"))
            for c in categories:
                categories_db = Category.objects.filter(name=c)
                if (len(categories_db) == 0):
                    Category.objects.create(name=c)

            return HttpResponse(status=201)
        else:
            print(product.errors)
            return HttpResponse(product.errors, status=400)


# deleting product by its id
def delete_product(request: HttpRequest, id: UUID):
    product = Product.objects.get(id=id)
    if product:
        product.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)


# put product by id using ProductSerializer


@api_view(['PUT'])
def put_product(request: HttpRequest, id: UUID):
    if request.method == "PUT":
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=200)
        else:
            print(serializer.errors)
            return HttpResponse(serializer.errors, status=400)


# patch product by id only if field is defined in request body


def patch_product(request: HttpRequest, id: UUID):
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
            print(updated_product.errors)
            return HttpResponse(updated_product.errors, status=400)
    else:
        return HttpResponse(status=404)


def get_add_update_product(request: HttpRequest, id: UUID):
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


def new_order(request: HttpRequest):
    if request.method == "POST":
        data = json.loads(request.body)
        products = data["products"]
        data["products"] = json.dumps(products)
        data["inpostDetails"] = json.dumps(data["inpostDetails"])
        order = OrderSerializer(data=data)
        for product in products:
            order_product = Product.objects.get(id=product['product'])
            if order_product.count - product['count'] >= 0:
                order_product.count -= product['count']
                order_product.save()
            else:
                return HttpResponse({"message": "There are not enough products in stock"}, status=400)
        if order.is_valid():
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

def change_order_state(request: HttpRequest, id: UUID):
    if request.method == "POST":
        order = Order.objects.get(id=id)
        print(order.status)
        status = json.loads(request.body)['status']
        print(status)
        order.status = status
        order.save()
        return HttpResponse(status=200)
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


class InfoAPIView(generics.ListCreateAPIView):
    queryset = Info.objects.all()
    serializer_class = InfoSerializer


def get_info(request: HttpRequest):
    if request.method == 'GET':
        information = Info.objects.all()
        if information:
            information_serializer = InfoSerializer(information, many=True)
            return HttpResponse(json.dumps(information_serializer.data, indent=4), content_type="application/json")
        else:
            return HttpResponse(status=404)


class CategoriesApiView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


def get_categories(request: HttpRequest):
    if request.method == 'GET':
        categories = Category.objects.all()
        if categories:
            category_serializer = CategorySerializer(categories, many=True)
            return HttpResponse(json.dumps(category_serializer.data, indent=4), content_type="application/json")
        else:
            return HttpResponse(status=404)


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LoginView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer


# Endpoint created for veryfing user authorization
# Attach access token to get request
class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = json.dumps(
            {'message': 'Hello, World!', 'username': request.user.username, 'is_superuser': request.user.is_superuser,
             'email': request.user.email})
        return HttpResponse(content)


class UsersView(generics.ListCreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


def get_all_users(request: HttpRequest):
    if request.method == 'GET':
        information = UserInfo.objects.all()
        if information:
            information_serializer = UserInfoSerializer(information, many=True)
            return HttpResponse(json.dumps(information_serializer.data, indent=4), content_type="application/json")
        else:
            return HttpResponse(status=404)
