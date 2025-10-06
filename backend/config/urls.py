"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from games import views as game_views
from users import views as user_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'games', game_views.GameViewSet)
router.register(r'users', user_views.UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/users/auth/', include("users.urls")),
    path('api/hosted/', game_views.MyHostedGamesView.as_view(), name='my-hosted-games'),
    path('api/join-requests/', include("join_game.urls")),
    path("api/user/<int:user_id>/game-stats/", user_views.GameStatsView.as_view(), name="user_game_stats"),
    path("api/user/me/", user_views.LoggedInUserView.as_view(), name="logged_in_user"),
    # path('api/games/', game_views.GameCreateView.as_view(), name='create-game'),
]
