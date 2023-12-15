from django.urls import path
from .views import CustomerCreateListAPI, CustomerRetrieveUpdateDeleteAPI

urlpatterns = [
    path("customer/", CustomerCreateListAPI.as_view(), name = "customer"),
    path("customer/<int:customer_id>", CustomerRetrieveUpdateDeleteAPI.as_view(), name = "customer_detail")
]