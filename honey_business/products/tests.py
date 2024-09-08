from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from products.models import Product

class ProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product_data = {
            'name': 'Test Product',
            'description': 'Test Description',
            'price': '50.00',
            'image': 'products/test_image.jpg'
        }
    
    def test_product_creation(self):
        response = self.client.post('/api/products/products/create/', self.product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Fetch the created product
        product = Product.objects.get()
        self.assertEqual(product.name, 'Test Product')
        self.assertEqual(product.price, Decimal('50.00'))
        
    def test_product_list(self):
        # Create a product
        Product.objects.create(
            name='Another Product',
            description='Another Description',
            price=Decimal('75.00'),
            image='products/another_image.jpg'
        )
        
        response = self.client.get('/api/products/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Another Product')
