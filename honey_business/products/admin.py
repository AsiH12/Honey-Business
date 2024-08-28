# products/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'image_thumbnail')
    search_fields = ('name', 'description')
    ordering = ('name',)

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100"/>', obj.image.url)
        return '-'
    image_thumbnail.short_description = 'Image'

admin.site.register(Product, ProductAdmin)
