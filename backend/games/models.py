from django.db import models
from django.contrib.auth.models import User


class Game(models.Model):
    SPORT_CHOICES = [
        ("football", "Football"),
        ("basketball", "Basketball"),
        ("cricket", "Cricket"),
        ("futsal", "Futsal"),
    ]

    SKILL_LEVELS = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]

    VISIBILITIES = [
        ("public", "Public"),
        ("private", "Private"),
    ]

    sport = models.CharField(max_length=20, choices=SPORT_CHOICES)
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=255)
    date_time = models.DateTimeField()
    current_players_count = models.PositiveIntegerField(default=1)  # current players
    needed_players_count = models.PositiveIntegerField()
    skill_level = models.CharField(max_length=20, choices=SKILL_LEVELS)
    visibility = models.CharField(max_length=20, choices=VISIBILITIES)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games")
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.sport})"
