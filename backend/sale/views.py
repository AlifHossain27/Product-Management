from rest_framework import views, response, permissions, status
from user import authentication
from .models import SaleModel
from .serializers import SaleSerializer
from . import services
from django.utils import timezone
from django.db.models import Sum
from calendar import month_name

class SaleCreateListAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # Create a new Sale
    def post(self, request):
        serializer = SaleSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        data = serializer.validated_data
        serializer.instance = services.create_sale(user = request.user, sale = data)

        return response.Response(data = serializer.data)
    
    # Retrieve a list of Sales
    def get(self, request):
        sale_collection = services.get_user_sale(user = request.user)
        serializer = SaleSerializer(sale_collection, many = True)

        return response.Response(data = serializer.data)
    
class SaleRetrieveUpdateDeleteAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # Retrieves a specific Sale
    def get(self, request, sale_id):
        sale = services.get_user_sale_detail(sale_id = sale_id)
        serializer = SaleSerializer(sale)

        return response.Response(data = serializer.data)
    
    # Deletes a specific Sale
    def delete(self, request, sale_id):
        services.delete_user_sale(user = request.user, sale_id = sale_id)

        return response.Response(status = status.HTTP_204_NO_CONTENT)
    
    # Updates a specific Sale
    def put(self, request, sale_id):
        serializer = SaleSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        sale = serializer.validated_data
        serializer.instance = services. update_user_sale(user = request.user, sale_id = sale_id, sale_data = sale)

        return response.Response(data = serializer.data)


class SalesRateAPI(views.APIView):
    def get(self, request):
        # Get total product sales for the current month
        current_month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        current_month_sales = SaleModel.objects \
            .filter(created_at__gte=current_month_start) \
            .aggregate(total_sales=Sum('total'))['total_sales'] or 0

        # Get total product sales for the previous month
        previous_month_start = (current_month_start - timezone.timedelta(days=1)).replace(day=1)
        previous_month_end = current_month_start - timezone.timedelta(days=1)
        previous_month_sales = SaleModel.objects \
            .filter(created_at__range=[previous_month_start, previous_month_end]) \
            .aggregate(total_sales=Sum('total'))['total_sales'] or 0

        # Calculate the percentage increase
        if previous_month_sales == 0:
            increase_percentage = 100  # Consider infinite increase if previous month had no sales
        else:
            increase_percentage = ((current_month_sales - previous_month_sales) / previous_month_sales) * 100

        response_data = {
            "current_month_sales": current_month_sales,
            "previous_month_sales": previous_month_sales,
            "increase_percentage": increase_percentage
        }

        return response.Response(response_data, status=status.HTTP_200_OK)


class TotalSalesMonthAPI(views.APIView):
    def get(self, request):
        # Get the current month's first and last date
        current_month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        current_month_end = (current_month_start + timezone.timedelta(days=32)).replace(day=1, microsecond=0)

        # Calculate the total number of sales for the current month
        total_sales = SaleModel.objects.filter(
            created_at__gte=current_month_start,
            created_at__lt=current_month_end
        ).count()

        # Get the month name and year
        month_name_str = month_name[current_month_start.month]
        year_str = str(current_month_start.year)

        response_data = {
            "month": month_name_str,
            "year": year_str,
            "total_sales_this_month": total_sales
        }

        return response.Response(response_data, status=status.HTTP_200_OK)


class TotalSalesYearAPI(views.APIView):
    def get(self, request):
        # Get the current year's first and last date
        current_year_start = timezone.now().replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
        current_year_end = (current_year_start + timezone.timedelta(days=366)).replace(month=1, day=1, microsecond=0)

        # Calculate the total number of sales for the current year
        total_sales = SaleModel.objects.filter(
            created_at__gte=current_year_start,
            created_at__lt=current_year_end
        ).count()

        # Get the current year
        year_str = str(current_year_start.year)

        response_data = {
            "year": year_str,
            "total_sales_this_year": total_sales
        }

        return response.Response(response_data, status=status.HTTP_200_OK)


class TotalAmountMonthAPI(views.APIView):
    def get(self, request):
        # Get the current year's first and last date
        current_month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        current_month_end = (current_month_start + timezone.timedelta(days=32)).replace(day=1, microsecond=0)

        # Calculate the total amount of sales for the current month
        total_sale = SaleModel.objects.filter(
            created_at__gte=current_month_start,
            created_at__lt=current_month_end
        ).aggregate(Sum('total'))['total__sum']

        if total_sale is None:
            total_sale = 0

        # Get the month name and year
        month_name_str = month_name[current_month_start.month]
        year_str = str(current_month_start.year)

        response_data = {
            "month": month_name_str,
            "year": year_str,
            "total_sale_this_month": total_sale
        }

        return response.Response(response_data, status=status.HTTP_200_OK)
    
class TotalAmountYearAPI(views.APIView):
    def get(self, request):
        # Get the current year's first and last date
        current_year_start = timezone.now().replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
        current_year_end = (current_year_start + timezone.timedelta(days=366)).replace(month=1, day=1, microsecond=0)

        # Calculate the total amount for the current year
        total_sale = SaleModel.objects.filter(
            created_at__gte=current_year_start,
            created_at__lt=current_year_end
        ).aggregate(Sum('total'))['total__sum']

        if total_sale is None:
            total_sale = 0

        # Get the current year
        year_str = str(current_year_start.year)

        response_data = {
            "year": year_str,
            "total_sale_this_year": total_sale
        }

        return response.Response(response_data, status=status.HTTP_200_OK)
    
class SalesVisualizationAPI(views.APIView):
    def get(self, request):
        # Get the monthly sales data
        monthly_sales_data = SaleModel.objects \
            .filter(created_at__year=timezone.now().year) \
            .extra(select={'month': 'EXTRACT(month FROM created_at)'}) \
            .values('month') \
            .annotate(total_sales=Sum('total'))

        # Convert numeric month values to month names
        month_labels = [month_name[int(entry['month'])] for entry in monthly_sales_data]


        chart_data = {
            "labels": month_labels,
            "data": [entry['total_sales'] for entry in monthly_sales_data]
        }

        return response.Response(chart_data, status=status.HTTP_200_OK)
    
class TopProductsMonthAPI(views.APIView):
    def get(self, request):
        # Get the top products sold in the current month
        top_products_data = SaleModel.objects \
            .filter(created_at__year=timezone.now().year, created_at__month=timezone.now().month) \
            .values('products__data__product_name') \
            .annotate(total_quantity=Sum('products__data__quantity')) \
            .order_by('-total_quantity')[:10]  # Limit to the top 10 products


        table_data = {
            "header": ["Product Name", "Total Quantity Sold"],
            "rows": [
                {"product_name": entry['products__data__product_name'], "total_quantity": entry['total_quantity']}
                for entry in top_products_data
            ]
        }

        return response.Response(table_data, status=status.HTTP_200_OK)
    

class TopProductsYearAPI(views.APIView):
    def get(self, request):
        # Get the top products sold in the current year
        top_products_data = SaleModel.objects \
            .filter(created_at__year=timezone.now().year) \
            .values('products__data__product_name') \
            .annotate(total_quantity=Sum('products__data__quantity')) \
            .order_by('-total_quantity')[:10]  # Limit to the top 10 products

        table_data = {
            "header": ["Product Name", "Total Quantity Sold"],
            "rows": [
                {"product_name": entry['products__data__product_name'], "total_quantity": entry['total_quantity']}
                for entry in top_products_data
            ]
        }

        return response.Response(table_data, status=status.HTTP_200_OK)
    

class MostSoldProductMonthAPI(views.APIView):
    def get(self, request):
        # Get the most sold product in the current month
        most_sold_product_data = SaleModel.objects \
            .filter(created_at__year=timezone.now().year, created_at__month=timezone.now().month) \
            .values('products__data__product_name') \
            .annotate(total_quantity=Sum('products__data__quantity')) \
            .order_by('-total_quantity').first()

        if most_sold_product_data:
            most_sold_product_name = most_sold_product_data['products__data__product_name']
            total_quantity_sold = most_sold_product_data['total_quantity']
        else:
            most_sold_product_name = "No data available"
            total_quantity_sold = 0


        response_data = {
            "most_sold_product": most_sold_product_name,
            "total_quantity_sold": total_quantity_sold,
            "title": "Most Sold Product This Month"
        }

        return response.Response(response_data, status=status.HTTP_200_OK)
    
class MostSoldProductYearAPI(views.APIView):
    def get(self, request):
        # Get the most sold product in the current year
        most_sold_product_data = SaleModel.objects \
            .filter(created_at__year=timezone.now().year) \
            .values('products__data__product_name') \
            .annotate(total_quantity=Sum('products__data__quantity')) \
            .order_by('-total_quantity').first()

        if most_sold_product_data:
            most_sold_product_name = most_sold_product_data['products__data__product_name']
            total_quantity_sold = most_sold_product_data['total_quantity']
        else:
            most_sold_product_name = "No data available"
            total_quantity_sold = 0


        response_data = {
            "most_sold_product": most_sold_product_name,
            "total_quantity_sold": total_quantity_sold,
            "title": "Most Sold Product This Year"
        }

        return response.Response(response_data, status=status.HTTP_200_OK)