# Generated by Django 5.1 on 2024-09-08 13:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20240908_1619'),
        ('products', '0006_alter_product_description_alter_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='items',
        ),
        migrations.AlterField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(),
        ),
        migrations.AlterModelTable(
            name='order',
            table='orders_order',
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
            options={
                'db_table': 'orders_orderitem',
            },
        ),
    ]