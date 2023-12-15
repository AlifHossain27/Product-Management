from rest_framework import serializers
from user import serializers as user_serializer
from . import services

# Customer Serializer
class CustomerSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    customer_name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    address = serializers.CharField()
    user_id = user_serializer.UserSerializer(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.CustomerDataClass(**data)