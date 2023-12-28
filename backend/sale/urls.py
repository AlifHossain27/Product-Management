from django.urls import path
from .views import SaleCreateListAPI, SaleRetrieveUpdateDeleteAPI, MonthlySalesRevenueRateAPI, MonthlySalesRateAPI, YearlySalesRevenueRateAPI,YearlySalesRateAPI,TotalSalesMonthAPI, TotalSalesYearAPI, TotalAmountMonthAPI, TotalAmountYearAPI, MonthlySalesVisualizationAPI, YearlySalesVisualizationAPI, TopProductsMonthAPI, TopProductsYearAPI, MostSoldProductMonthAPI, MostSoldProductYearAPI

urlpatterns = [
    path("sale/", SaleCreateListAPI.as_view(), name = "sale"),
    path("sale/<int:sale_id>", SaleRetrieveUpdateDeleteAPI.as_view(), name = "sale_detail"),
    path("sale/monthly-sales-rate/", MonthlySalesRateAPI.as_view(), name = "monthly_sale_rate"),
    path("sale/monthly-sales-revenue-rate/", MonthlySalesRevenueRateAPI.as_view(), name = "monthly_sales_revenue_rate"),
    path("sale/yearly-sales-revenue-rate/", YearlySalesRevenueRateAPI.as_view(), name = "yearly_sales_revenue"),
    path("sale/yearly-sales-rate/", YearlySalesRateAPI.as_view(), name = "yearly_sale_rate"),
    path("sale/total-sale-month/", TotalSalesMonthAPI.as_view(), name = "total_sale_month"),
    path("sale/total-sale-year/", TotalSalesYearAPI.as_view(), name = "total_sale_year"),
    path("sale/total-amount-month/", TotalAmountMonthAPI.as_view(), name = "total-sale-month"),
    path("sale/total-amount-year/", TotalAmountYearAPI.as_view(), name = "total-sale-year"),
    path("sale/sale-visualization-month/", MonthlySalesVisualizationAPI.as_view(), name = "sales-visualization"),
    path("sale/sale-visualization-year/", YearlySalesVisualizationAPI.as_view(), name = "sales-visualization-week"),
    path("sale/top-products-month/", TopProductsMonthAPI.as_view(), name = "top-products-month"),
    path("sale/top-products-year/", TopProductsYearAPI.as_view(), name = "top-products-year"),
    path("sale/most-sold-product-month/", MostSoldProductMonthAPI.as_view(), name = "most-sold-product-month"),
    path("sale/most-sold-product-year/", MostSoldProductYearAPI.as_view(), name = "most-sold-product-year"),
]