from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from decimal import Decimal
from orders.models import Order
from products.models import Product

class OrderTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create a test product
        self.product = Product.objects.create(
            name="Test Product",
            description="Test Description",
            price=Decimal('50.00'),
            image='products/test_image.jpg'
        )
        
        # Create order data
        self.order_data = {
            'total_price': '200.00',
            'created_at': '2024-09-08T00:00:00Z'
        }
    
    def test_order_creation(self):
        response = self.client.post('/api/orders/orders/create/', self.order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Fetch the created order
        order = Order.objects.get()
        self.assertEqual(order.total_price, Decimal('200.00'))
        self.assertTrue(order.created_at)
        
    def test_order_list(self):
        # Create an order
        Order.objects.create(
            total_price=Decimal('300.00'),
            created_at='2024-09-08T00:00:00Z'
        )
        
        response = self.client.get('/api/orders/orders/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['total_price'], '300.00')
