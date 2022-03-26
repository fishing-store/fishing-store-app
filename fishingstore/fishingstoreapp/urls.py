from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add_product/', views.add_product, name='add_product'),
    path('get_products/', views.get_products, name='get_products'),
    path('add_mockup_products/', views.add_mockup_products, name='add_mockup_products'),
    path('create_table/', views.create_table, name='create_table'),
]