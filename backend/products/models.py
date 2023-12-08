from django.db import models
from django.conf import settings


# Products Model
class Products(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        verbose_name = "user"
    )
    product_name = models.CharField(max_length = 100, verbose_name = "Product Name")
    price = models.IntegerField(verbose_name = "Price")
    in_stock = models.CharField(max_length=20, verbose_name = "In Stock")
    amount_in_stock = models.IntegerField(verbose_name = "Amount")
    created_at = models.DateTimeField(auto_now_add = True, verbose_name = "Created At")
