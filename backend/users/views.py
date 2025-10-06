from rest_framework import generics, serializers, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from games.models import Game
from join_game.models import JoinRequest


# Signup endpoint
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserViewSet(viewsets.ModelViewSet):  # Only list/retrieve
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoggedInUserView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)


# Move GameStatsView to the end
class GameStatsView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        hosted_count = Game.objects.filter(host=user).count()
        joined_count = JoinRequest.objects.filter(user=user, status="accepted").count()

        return Response({
            "games_hosted": hosted_count,
            "games_joined": joined_count,
        })
