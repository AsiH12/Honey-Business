# products/admin.py
from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'image')  # Include price in the list view
    search_fields = ('name', 'description')  # Optional: Add search fields

admin.site.register(Product, ProductAdmin)
