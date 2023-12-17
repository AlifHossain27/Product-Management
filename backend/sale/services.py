import dataclasses
import datetime
from typing import TYPE_CHECKING
from user import services as user_service
from .models import SaleModel as Sale
from django.shortcuts import get_object_or_404
from rest_framework import exceptions

if TYPE_CHECKING:
    from models import SaleModel as Sale
    from user.models import User

@dataclasses.dataclass
class SaleDataClass:
    customer_name: str
    total: int
    status: str
    pending: int
    created_at: datetime.datetime = None
    id: int = None

    @classmethod
    def from_instance(cls, sale_model: "Sale"):
        return cls(
            customer_name = sale_model.customer_name,
            total = sale_model.total,
            status = sale_model.status,
            pending = sale_model.pending,
            created_at = sale_model.created_at,
            id = sale_model.id,
            user = sale_model.user
        )


def create_sale(user, sale: "SaleDataClass") -> "SaleDataClass":
    sale_create = Sale.objects.create(
        customer_name = sale.customer_name,
        total = sale.total,
        status = sale.status,
        pending = sale.pending,
        user = user
    )

    return SaleDataClass.from_instance(sale_model= sale_create)

def get_user_sale(user: "User") -> list["SaleDataClass"]:
    user_sales = Sale.objects.filter(user = user)

    return [SaleDataClass.from_instance(sale) for sale in user_sales]

def get_user_sale_detail(sale_id: int) -> "SaleDataClass":
    sale = get_object_or_404(Sale, pk=sale_id)

    return SaleDataClass.from_instance(sale_model= sale)

def update_user_sale(user: "User", sale_id: int, sale_data: "SaleDataClass"):
    sale = get_object_or_404(Sale, pk=sale_id)
    if sale.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the owner of this sale")
    sale.customer_name = sale_data.customer_name
    sale.total = sale_data.total
    sale.status = sale_data.status
    sale.pending = sale_data.pending
    sale.save()
    return SaleDataClass.from_instance(sale_model= sale)

def delete_user_sale(user: "User", sale_id: int) -> "SaleDataClass":
    sale = get_object_or_404(Sale, pk=sale_id)

    if sale.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the owner of this sale")
    sale.delete()