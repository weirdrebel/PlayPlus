from rest_framework import serializers
from .models import JoinRequest

class JoinRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = JoinRequest
        fields = ['id', 'user', 'user_name', 'user_email', 'status']
