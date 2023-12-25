from rest_framework import serializers
from user import serializers as user_serializer
from . import services

class SaleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    customer_name = serializers.CharField()
    products = serializers.JSONField()
    total = serializers.IntegerField()
    status = serializers.CharField()
    pending = serializers.IntegerField() 
    user_id = user_serializer.UserSerializer(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.SaleDataClass(**data)