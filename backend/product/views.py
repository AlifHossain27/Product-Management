from rest_framework import views, response, permissions, status
from user import authentication
from .serializers import ProductSerializer
from . import services

class ProductCreateListAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # Create a new product
    def post(self, request):
        serializer = ProductSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        data = serializer.validated_data
        serializer.instance = services.create_product(user = request.user, product = data)
        
        return response.Response(data = serializer.data)

    # Retrieves a list of products
    def get(self, request):
        product_collection = services.get_user_products(user = request.user)
        serializer = ProductSerializer(product_collection, many = True)
        
        return response.Response(data = serializer.data)
    
class ProductRetrieveUpdateDeleteAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # Retrieves a specific product
    def get(self, request, product_id):
        product = services.get_user_product_detail(product_id = product_id)
        serializer = ProductSerializer(product)
        
        return response.Response(data=serializer.data)
    
    # Deletes a specific product
    def delete(self, request, product_id):
        services.delete_user_product(user = request.user, product_id = product_id)
        
        return response.Response(status = status.HTTP_204_NO_CONTENT)

    # Updates a specific product
    def put(self, request, product_id):
        serializer = ProductSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        product = serializer.validated_data
        serializer.instance = services.update_user_product(user = request.user, product_id = product_id, product_data = product)

        return response.Response(data = serializer.data)