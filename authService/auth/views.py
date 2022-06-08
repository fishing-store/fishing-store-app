from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from django.http import HttpResponse, HttpRequest
import json
from rest_framework import generics

# User login view
class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Endpoint created for veryfing user authorization
# Attach access token to get request
class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = json.dumps(
            {'message': 'Hello, World!', 'username': request.user.username, 'is_superuser': request.user.is_superuser,
             'email': request.user.email})
        return HttpResponse(content)