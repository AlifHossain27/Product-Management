from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=225, unique=True)
    email = models.EmailField(max_length=225, unique=True)
    password = models.CharField(max_length=225)
    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
