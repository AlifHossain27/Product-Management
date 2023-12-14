from rest_framework import serializers
from user import serializers as user_serializer
from . import services

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    product_name = serializers.CharField()
    price = serializers.IntegerField()
    status = serializers.CharField()
    amount = serializers.IntegerField()
    user_id = user_serializer.UserSerializer(read_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.ProductDataClass(**data)