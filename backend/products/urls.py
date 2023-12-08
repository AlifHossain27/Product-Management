from django.urls import path
from .views import ProductCreateListAPI, ProductRetrieveUpdateDeleteAPI

urlpatterns = [
    path("product/", ProductCreateListAPI.as_view(), name = "product"),
    path("product/<int:product_id>", ProductRetrieveUpdateDeleteAPI.as_view(), name = "product_detail")
]