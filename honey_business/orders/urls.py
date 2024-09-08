from django.urls import path
from .views import CreateOrderView, OrderListView

urlpatterns = [
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/create/', CreateOrderView.as_view(), name='order-create'),
]
