from rest_framework import serializers
from user import serializers as user_serializer
from . import services

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    product_name = serializers.CharField()
    price = serializers.IntegerField()
    in_stock = serializers.CharField()
    amount_in_stock = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)
    user_id = user_serializer.UserSerializer(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.ProductDataClass(**data)