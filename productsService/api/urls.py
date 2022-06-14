from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductAPIView.as_view(), name='index'),
    path('products/', views.get_all_products, name='get_products'),
    path('products/add', views.add_product, name='add_product'),
    path('saveProduct/<id>', views.put_product, name='put_product'),
    path('products/<id>', views.get_add_update_product, name='get_add_update_product'),
    path('categories', views.get_categories, name='get_categories'),
    path('fetch-products', views.fetch_products, name='fetch_products')
]