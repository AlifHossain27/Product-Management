from django.db import models
from django.contrib.auth import models as auth_models

# Custom User Manager
class UserManager(auth_models.BaseUserManager):
    def create_user(self, username: str, first_name: str, last_name: str, email: str, password: str = None, is_staff: bool = False, is_superuser: bool = False) -> "User":
        if not username:
            raise ValueError("User must have a username")
        if not first_name:
            raise ValueError("User must have a first name")
        if not last_name:
            raise ValueError("User must have a last name")

        user = self.model(username = self.normalize_username(username))
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()
        return user

    def create_superuser(self, username: str, first_name: str, last_name: str, email: str, password: str) -> "User":
        user = self.create_user(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            password = password,
            is_staff = True,
            is_superuser = True
        )
        user.save()
        return user
        
# Custom User Model
class User(auth_models.AbstractUser):
    username = models.CharField(max_length=50, unique=True, verbose_name="Username")
    first_name = models.CharField(max_length=255, verbose_name= "First Name")
    last_name = models.CharField(max_length=255, verbose_name= "Last Name")
    email = models.EmailField(max_length=255, unique=True, verbose_name= "Email")
    password = models.CharField(max_length=255, verbose_name= "Password")

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name"]
