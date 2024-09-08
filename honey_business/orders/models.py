from django.db import models

class Order(models.Model):
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField()

    class Meta:
        db_table = 'orders_order'

class OrderItem(models.Model):
    quantity = models.IntegerField()
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)

    class Meta:
        db_table = 'orders_orderitem'
