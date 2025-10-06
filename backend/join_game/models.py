from django.db import models

from games.models import Game
from users.models import User

# Create your models here.
class JoinRequest(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='join_requests')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='join_requests')
    status = models.CharField(
        max_length=20,
        choices=[
            ('accepted', 'Accepted'),
            ('rejected', 'Rejected'),
            ('requested', 'Requested'),
            ('not_requested', 'Not requested'),
        ],
        default='requested'
    )
