from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductAPIView.as_view(), name='index'),
    path('mockup/', views.add_mockup_products, name='mockup'),
    path('products/', views.get_all_products, name='get_products'),
    path('products/add', views.add_product, name='add_product'),
    path('saveProduct/<id>', views.put_product, name='put_product'),
    path('products/<id>', views.get_add_update_product, name='get_add_update_product'),
    path('info/', views.InfoAPIView.as_view()),
    path('info/get', views.get_info, name='get_info'),
    path('categories', views.get_categories, name='get_categories'),
    path('login/', views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('adminOrders/', views.get_all_orders, name='get_orders'),
    path('userOrders/<email>', views.get_user_orders, name='get_user_orders'),
    path("users/", views.UsersView.as_view()),
    path("users/get", views.get_all_users, name='get_all_users'),
]