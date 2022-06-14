from django.urls import path

from . import views

urlpatterns = [
    path('order', views.new_order, name='new_order'),
    path('adminOrders/', views.get_all_orders, name='get_orders'),
    path('userOrders/<email>', views.get_user_orders, name='get_user_orders'),
    path('order-status/<id>', views.get_order, name='get_order'),
]