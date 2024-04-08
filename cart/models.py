from django.db import models
from shop.models import Product


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField()
    quantity = models.PositiveIntegerField(default=1)
    session_id = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.product.name} - {self.size} - {self.quantity}"


class Delivery(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()

    def __str__(self):
        return self.name


class Promocode(models.Model):
    name = models.CharField(max_length=50, unique=True)
    value = models.PositiveIntegerField(default=0)
    limit = models.PositiveIntegerField(default=1)
    expiration_date = models.DateField()
