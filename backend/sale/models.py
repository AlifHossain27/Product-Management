from django.db import models
from django.conf import settings

# Sale Model
class SaleModel(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        verbose_name = "user"
    )
    customer_name = models.CharField(max_length = 100, verbose_name = "Customer Name")
    total = models.IntegerField(verbose_name = "Total Amount")
    status = models.CharField(max_length = 20, verbose_name = "Status")
    pending = models.IntegerField(verbose_name = "Pending Amount")
    created_at = models.DateTimeField(auto_now_add = True, verbose_name = "Created At")
