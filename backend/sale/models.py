from django.db import models
from django.conf import settings

# Sale Model
class SaleModel(models.Model):
    created_at = models.DateTimeField(auto_now_add = True, verbose_name = "Created At")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        verbose_name = "user"
    )
    customer_name = models.CharField(max_length = 100, verbose_name = "Customer Name")
    products = models.JSONField(null=True, default=None, verbose_name = "Products")
    total = models.IntegerField(verbose_name = "Total Amount")
    status = models.CharField(max_length = 20, verbose_name = "Status")
    pending = models.IntegerField(verbose_name = "Pending Amount")
