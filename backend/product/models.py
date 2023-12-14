from django.db import models
from django.conf import settings


# Product Model
class Product(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        verbose_name = "user"
    )
    product_name = models.CharField(max_length = 100, verbose_name = "Product Name")
    price = models.IntegerField(verbose_name = "Price")
    status = models.CharField(max_length=20, verbose_name = "In Stock")
    amount= models.IntegerField(verbose_name = "Amount")
