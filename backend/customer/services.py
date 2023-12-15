import dataclasses
from typing import TYPE_CHECKING
from user import services as user_service
from .models import Customer
from django.shortcuts import get_object_or_404
from rest_framework import exceptions

if TYPE_CHECKING:
    from models import Customer
    from user.models import User

# Customer DataClass
@dataclasses.dataclass
class CustomerDataClass:
    customer_name: str
    email: str
    phone: int
    address: str
    user: user_service.UserDataClass = None
    id: int = None

    @classmethod
    def from_instance(cls, customer_model: "Customer"):
        return cls(
            customer_name = customer_model.customer_name,
            email = customer_model.email,
            phone = customer_model.phone,
            address = customer_model.address,
            id = customer_model.id,
            user = customer_model.user
        )


def create_customer(user, customer: "CustomerDataClass") -> "CustomerDataClass":
    customer_create = Customer.objects.create(
        customer_name = customer.customer_name,
        email = customer.email,
        phone = customer.phone,
        address = customer.address,
        user = user
    )
    return CustomerDataClass.from_instance(customer_model= customer_create)


def get_user_customer(user: "User") -> list["CustomerDataClass"]:
    user_customer = Customer.objects.filter(user=user)

    return [CustomerDataClass.from_instance(customer) for customer in user_customer]


def get_user_customer_detail(customer_id: int) -> "CustomerDataClass":
    customer = get_object_or_404(Customer,pk=customer_id)

    return CustomerDataClass.from_instance(customer_model= customer)


def update_user_customer(user: "User", customer_id: int, customer_data: "CustomerDataClass"):
    customer = get_object_or_404(Customer, pk=customer_id)
    if customer.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the Owner")
    customer.customer_name = customer_data.customer_name
    customer.email = customer_data.email
    customer.phone = customer_data.phone
    customer.address = customer_data.address
    customer.save()
    return CustomerDataClass.from_instance(customer_model= customer)


def delete_user_customer(user: "User", customer_id: int) -> "CustomerDataClass":
    customer = get_object_or_404(Customer, pk=customer_id)

    if customer.user.id != user.id:
        raise exceptions.PermissionDenied("You're not the Owner")
    customer.delete()