import dataclasses
from typing import TYPE_CHECKING
from user import services as user_service
from .models import Product
from django.shortcuts import get_object_or_404
from rest_framework import exceptions

if TYPE_CHECKING:
    from models import Product
    from user.models import User

@dataclasses.dataclass
class ProductDataClass:
    product_name: str
    price: int
    status: str
    amount: int
    user: user_service.UserDataClass = None
    id: int = None

    @classmethod
    def from_instance(cls, product_model: "Product"):
        return cls(
            product_name = product_model.product_name,
            price = product_model.price,
            status = product_model.status,
            amount = product_model.amount,
            id = product_model.id,
            user = product_model.user
        )

def create_product(user, product: "ProductDataClass") -> "ProductDataClass":
    product_create = Product.objects.create(
        product_name = product.product_name,
        price = product.price,
        status = product.status,
        amount = product.amount,
        user = user
    )
    return ProductDataClass.from_instance(product_model = product_create)

def get_user_products(user: "User") -> list["ProductDataClass"]:
    user_products = Product.objects.filter(user = user)

    return [ProductDataClass.from_instance(product) for product in user_products]

def get_user_product_detail(product_id: int) -> "ProductDataClass":
    product = get_object_or_404(Product, pk=product_id)

    return ProductDataClass.from_instance(product_model = product)

def update_user_product(user: "User", product_id: int, product_data: "ProductDataClass"):
    product = get_object_or_404(Product, pk=product_id)
    if product.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the Owner of this product")
    product.product_name = product_data.product_name
    product.price = product_data.price
    product.status = product_data.status
    product.amount = product_data.amount
    product.save()
    return ProductDataClass.from_instance(product_model = product)

def delete_user_product(user: "User", product_id: int) -> "ProductDataClass":
    product = get_object_or_404(Product, pk=product_id)

    if product.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the Owner of this product")
    product.delete()