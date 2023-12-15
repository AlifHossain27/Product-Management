from django.db import models
from django.conf import settings

# Customer Model
class Customer(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        verbose_name = "user"
        )
    customer_name = models.CharField(max_length = 100, verbose_name = "Customer Name")
    email = models.EmailField(max_length = 225, verbose_name = "Email")
    phone = models.IntegerField(verbose_name = "Phone Number")
    address = models.CharField(max_length = 225, verbose_name = "Address")