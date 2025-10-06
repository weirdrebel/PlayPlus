
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import JoinRequest
from .serializers import JoinRequestSerializer
from games.models import Game
from games.serializers import GameSerializer
from users.serializers import UserSerializer


# View to return all join requests for a game if current user is host
class GameJoinRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, game_id):
        user = request.user
        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({"detail": "Game not found."}, status=status.HTTP_404_NOT_FOUND)

        if game.host != user:
            return Response({"detail": "Only the host can view join requests for this game."}, status=status.HTTP_403_FORBIDDEN)

        join_requests = JoinRequest.objects.filter(game=game)
        serializer = JoinRequestSerializer(join_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class CheckRequestStatusView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, game_id):
        user = request.user

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({"detail": "Game not found."}, status=status.HTTP_404_NOT_FOUND)

        join_request = JoinRequest.objects.filter(game=game, user=user).first()
        if not join_request:
            return Response({"status": "Not requested"}, status=status.HTTP_200_OK)

        if join_request.status == "accepted":
            return Response({"status": "Accepted"}, status=status.HTTP_200_OK)
        elif join_request.status == "rejected":
            return Response({"status": "Rejected"}, status=status.HTTP_200_OK)
        elif join_request.status == "requested":
            return Response({"status": "Requested"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": join_request.status}, status=status.HTTP_200_OK)


class MakeJoinRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, game_id):
        user = request.user

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({"detail": "Game not found."}, status=status.HTTP_404_NOT_FOUND)

        existing_request = JoinRequest.objects.filter(game=game, user=user).first()
        if existing_request:
            return Response({"detail": "Join request already exists.", "status": existing_request.status}, status=status.HTTP_400_BAD_REQUEST)

        join_request = JoinRequest.objects.create(game=game, user=user, status="requested")
        return Response({"detail": "Join request created.", "status": join_request.status}, status=status.HTTP_201_CREATED)


class UpdateJoinRequestStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, join_request_id):
        host = request.user

        join_request = JoinRequest.objects.filter(id=join_request_id, game__host=host).first()
        if not join_request:
            return Response({"detail": "Join request not found."}, status=status.HTTP_404_NOT_FOUND)
        
        game = join_request.game
        if game.host != host:
            return Response({"detail": "Only the host can update join requests."}, status=status.HTTP_403_FORBIDDEN)

        status_value = request.data.get("status")
        if status_value not in ["accepted", "rejected"]:
            return Response({"detail": "Invalid status. Must be 'accepted' or 'rejected'."}, status=status.HTTP_400_BAD_REQUEST)

        join_request.status = status_value
        join_request.save()

        if status_value == "accepted":
            game.needed_players_count = max(0, game.needed_players_count - 1)
            game.current_players_count += 1
            
            game.save()

        return Response({"detail": f"Join request {status_value}."}, status=status.HTTP_200_OK)


class UserJoinRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        join_requests = JoinRequest.objects.filter(user=user).order_by('-id')
        result = []
        for jr in join_requests:
            game = jr.game
            game_data = GameSerializer(game).data
            host_data = UserSerializer(game.host).data if hasattr(game, 'host') else None
            game_data['host'] = host_data
            jr_data = {
                'id': jr.id,
                'status': jr.status,
                'created_at': jr.created_at if hasattr(jr, 'created_at') else None,
                'game': game_data
            }
            result.append(jr_data)
        return Response(result, status=status.HTTP_200_OK)