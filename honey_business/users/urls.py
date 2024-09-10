# users/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('profile/', views.profile, name='profile'),
    path('add_address/', views.add_address, name='add_address'),
    path('view_addresses/', views.view_addresses, name='view_addresses'),
]


]
