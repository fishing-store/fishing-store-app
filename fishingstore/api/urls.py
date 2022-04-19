from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductAPIView.as_view(), name='index'),
    path('mockup/', views.add_mockup_products, name='mockup'),
    path('products/', views.get_all_products, name='get_products'),
    path('products/add', views.add_product, name='add_product'),
    path('products/<id>', views.get_add_update_product, name='get_add_update_product'),
    path('login/', views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
]