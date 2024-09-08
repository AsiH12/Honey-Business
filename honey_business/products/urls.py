from django.urls import path
from .views import CreateProductView, ProductListView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/create/', CreateProductView.as_view(), name='product-create'),
]
