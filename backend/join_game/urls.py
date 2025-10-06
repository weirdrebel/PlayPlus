from django.urls import path
from .views import CheckRequestStatusView, MakeJoinRequestView, GameJoinRequestsView, UpdateJoinRequestStatusView, UserJoinRequestsView

urlpatterns = [
	path('status/<int:game_id>/', CheckRequestStatusView.as_view(), name='check-request-status'),
	path('join/<int:game_id>/', MakeJoinRequestView.as_view(), name='make-join-request'),
	path('all/<int:game_id>/', GameJoinRequestsView.as_view(), name='game-join-requests'),
    path('update/<int:join_request_id>/', UpdateJoinRequestStatusView.as_view(), name='update-join-request-status'),
    path('current-user-requests/', UserJoinRequestsView.as_view(), name='current-user-join-requests'),
]
