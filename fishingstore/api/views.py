from asyncio.windows_events import NULL
import json
from django.http import HttpResponse, HttpRequest
from rest_framework.views import APIView

from .models import Category, Product, Info
from .serializers import ProductSerializer, InfoSerializer, CategorySerializer, MyTokenObtainPairSerializer, RegisterSerializer, LoginSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from django.contrib.auth.models import User


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
def delete_product(request: HttpRequest, id: int):
    product = Product.objects.get(id=id)
    if product:
        product.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=404)

# put product by id using ProductSerializer
@api_view(['PUT'])
def put_product(request: HttpRequest, id: int):
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
            print(updated_product.errors)
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

# User login view
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