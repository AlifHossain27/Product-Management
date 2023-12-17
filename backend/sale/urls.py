from django.urls import path
from .views import SaleCreateListAPI, SaleRetrieveUpdateDeleteAPI

urlpatterns = [
    path("sale/", SaleCreateListAPI.as_view(), name = "sale"),
    path("sale/<int:sale_id>", SaleRetrieveUpdateDeleteAPI.as_view(), name = "sale_detail")
]