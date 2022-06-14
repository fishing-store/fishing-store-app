from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('hello/', views.HelloView.as_view(), name='hello'),
]