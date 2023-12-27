from django.urls import path
from .views import SaleCreateListAPI, SaleRetrieveUpdateDeleteAPI, SalesRateAPI, TotalSalesMonthAPI, TotalSalesYearAPI, TotalAmountMonthAPI, TotalAmountYearAPI, SalesVisualizationAPI, TopProductsMonthAPI, TopProductsYearAPI, MostSoldProductMonthAPI, MostSoldProductYearAPI

urlpatterns = [
    path("sale/", SaleCreateListAPI.as_view(), name = "sale"),
    path("sale/<int:sale_id>", SaleRetrieveUpdateDeleteAPI.as_view(), name = "sale_detail"),
    path("sale/sales-rate/", SalesRateAPI.as_view(), name = "sale_rate"),
    path("sale/total-sale-month/", TotalSalesMonthAPI.as_view(), name = "total_sale_month"),
    path("sale/total-sale-year/", TotalSalesYearAPI.as_view(), name = "total_sale_year"),
    path("sale/total-amount-month/", TotalAmountMonthAPI.as_view(), name = "total-sale-month"),
    path("sale/total-amount-year/", TotalAmountYearAPI.as_view(), name = "total-sale-year"),
    path("sale/sale-visualization/", SalesVisualizationAPI.as_view(), name = "sales-visualization"),
    path("sale/top-products-month/", TopProductsMonthAPI.as_view(), name = "top-products-month"),
    path("sale/top-products-year/", TopProductsYearAPI.as_view(), name = "top-products-year"),
    path("sale/most-sold-product-month/", MostSoldProductMonthAPI.as_view(), name = "most-sold-product-month"),
    path("sale/most-sold-product-year/", MostSoldProductYearAPI.as_view(), name = "most-sold-product-year"),
]