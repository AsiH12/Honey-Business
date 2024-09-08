from django.urls import path
from .views import CreateOrderView, OrderListView

urlpatterns = [
    path('', OrderListView.as_view(), name='order-list'),  # GET endpoint for listing orders
    path('create/', CreateOrderView.as_view(), name='create-order'),  # POST endpoint for creating orders
]
