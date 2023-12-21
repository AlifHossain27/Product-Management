from rest_framework import views, response, permissions, status
from user import authentication
from .serializers import SaleSerializer
from . import services

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