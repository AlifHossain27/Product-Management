from rest_framework import views, response, permissions, status
from user import authentication
from .serializers import CustomerSerializer
from . import services

class CustomerCreateListAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # Create a new customer
    def post(self, request):
        serializer = CustomerSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        data = serializer.validated_data
        serializer.instance = services.create_customer(user = request.user, customer = data)

        return response.Response(data = serializer.data)
    

    # Retrieve a list of customers
    def get(self, request):
        customer_collection = services.get_user_customer(user = request.user)
        serializer = CustomerSerializer(customer_collection, many = True)

        return response.Response(data = serializer.data)
    

class CustomerRetrieveUpdateDeleteAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # Retrieves a specific customer
    def get(self, request, customer_id):
        customer = services.get_user_customer_detail(customer_id = customer_id)
        serializer = CustomerSerializer(customer)

        return response.Response(data = serializer.data)
    
    # Deletes a specific customer
    def delete(self, request, customer_id):
        services.delete_user_customer(user = request.user, customer_id = customer_id)

        return response.Response(status=status.HTTP_204_NO_CONTENT)
    
    # Updates a specific customer
    def put(self, request, customer_id):
        serializer = CustomerSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        customer = serializer.validated_data
        serializer.instance = services.update_user_customer(user = request.user, customer_id = customer_id, customer_data = customer)

        return response.Response(data = serializer.data)