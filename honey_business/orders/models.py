# orders/models.py
from django.db import models

class Order(models.Model):
    items = models.JSONField()  # Ensure this is correctly handling the JSON data
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.total_price}"
