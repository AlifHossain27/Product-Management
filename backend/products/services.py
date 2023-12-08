import dataclasses
import datetime
from typing import TYPE_CHECKING
from user import services as user_service
from .models import Products
from django.shortcuts import get_object_or_404
from rest_framework import exceptions

if TYPE_CHECKING:
    from models import Products
    from user.models import User

@dataclasses.dataclass
class ProductDataClass:
    product_name: str
    price: int
    in_stock: str
    amount_in_stock: int
    created_at: datetime.datetime = None
    user: user_service.UserDataClass = None
    id: int = None

    @classmethod
    def from_instance(cls, product_model: "Products"):
        return cls(
            product_name = product_model.product_name,
            price = product_model.price,
            in_stock = product_model.in_stock,
            amount_in_stock = product_model.amount_in_stock,
            created_at = product_model.created_at,
            id = product_model.id,
            user = product_model.user
        )

def create_product(user, product: "ProductDataClass") -> "ProductDataClass":
    product_create = Products.objects.create(
        product_name = product.product_name,
        price = product.price,
        in_stock = product.in_stock,
        amount_in_stock = product.amount_in_stock,
        user = user
    )
    return ProductDataClass.from_instance(product_model= product_create)

def get_user_products(user: "User") -> list["ProductDataClass"]:
    user_products = Products.objects.filter(user=user)

    return [ProductDataClass.from_instance(product) for product in user_products]

def get_user_product_detail(product_id: int) -> "ProductDataClass":
    product = get_object_or_404(Products, pk=product_id)

    return ProductDataClass.from_instance(product_model= product)

def update_user_product(user: "User", product_id: int, product_data: "ProductDataClass"):
    product = get_object_or_404(Products, pk=product_id)
    if product.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the Owner of this product")
    product.product_name = product_data.product_name
    product.price = product_data.price
    product.in_stock = product_data.in_stock
    product.amount_in_stock = product_data.amount_in_stock
    product.save()
    return ProductDataClass.from_instance(product_model = product)

def delete_user_product(user: "User", product_id: int) -> "ProductDataClass":
    product = get_object_or_404(Products, pk=product_id)

    if product.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the Owner of this product")
    product.delete()