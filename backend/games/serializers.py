from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"
        read_only_fields = ["id", "host", "created_at", "updated_at"]

    def create(self, validated_data):
        validated_data["host"] = self.context["request"].user
        return super().create(validated_data)
