from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductAPIView.as_view(), name='index'),
    path('mockup/', views.add_mockup_products, name='mockup'),
    path('products/', views.get_all_products, name='get_products'),
    path('products/add', views.add_product, name='add_product'),
    path('products/<id>', views.get_add_update_product, name='get_add_update_product'),
    path('info/', views.InfoAPIView.as_view()),
    path('info/get', views.get_info, name='get_info'),
    path('login/', views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('users/', views.get_all_users, name='get_users'),
]