from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add_product/', views.add_product, name='add_product'),
    path('get_products/', views.get_products, name='get_products'),
    path('get_product_by_id/<int:id>/', views.get_product_by_id, name='get_product_by_id'),
    path('add_mockup_products/', views.add_mockup_products, name='add_mockup_products'),
]