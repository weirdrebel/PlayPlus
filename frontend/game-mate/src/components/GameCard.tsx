import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchUserById } from "@/lib/api";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  UserPlus,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Game, getSportInfo, getRemainingSlots } from "@/lib/mockData";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: Game;
  showJoinButton?: boolean;
  onJoinClick?: (gameId: string) => void;
}

export const GameCard = ({ game, showJoinButton = true, onJoinClick }: GameCardProps) => {
  const sportInfo = getSportInfo(game.sport);
  const remainingSlots = getRemainingSlots(game);
  const [host, setHost] = useState<any>(null);

  useEffect(() => {
    const loadHost = async () => {
      try {
        const user = await fetchUserById(game.host);
        setHost(user);
      } catch (error) {
        console.error("Failed to fetch host:", error);
      }
    };
    loadHost();
  }, [game.host]);

  const getStatusBadge = () => {
    switch (game.status) {
      case "open":
        return <Badge className="status-open">Open</Badge>;
      case "filled":
        return <Badge className="status-filled">Full</Badge>;
      case "cancelled":
        return <Badge className="status-cancelled">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getSkillIcon = () => {
    switch (game.skill_level) {
      case "beginner":
        return <Star className="h-3 w-3 fill-current" />;
      case "intermediate":
        return (
          <>
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
          </>
        );
      case "advanced":
        return (
          <>
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="game-card group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="sport-badge">
            <span className="mr-1">{sportInfo?.emoji}</span>
            {sportInfo?.label}
          </div>
          {getStatusBadge()}
        </div>

        {game.skill_level && (
          <div className="flex items-center space-x-1 text-warning">
            {getSkillIcon()}
          </div>
        )}
      </div>

      {/* Title and Description */}
      <Link to={`/games/${game.id}`} className="block">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {game.title}
        </h3>
        {game.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {game.description}
          </p>
        )}
      </Link>

      {/* Game Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{format(new Date(game.date_time), "EEE, MMM d 'at' h:mm a")}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{game.location}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>
            {game.neededPlayerCount}/{game.currentPlayerCount + game.neededPlayerCount} players
            {remainingSlots > 0 && (
              <span className="text-primary font-medium"> · {remainingSlots} spots left</span>
            )}
          </span>
        </div>

        {/* Host Info */}
        {host && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Avatar className="h-5 w-5 mr-2">
              <AvatarImage src={host.avatarUrl} alt={host.name} />
              <AvatarFallback className="text-xs">
                {host.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span>Hosted by {host.name}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      {showJoinButton && game.status === "open" && remainingSlots > 0 && (
        <Button
          onClick={() => onJoinClick?.(game.id)}
          className="w-full"
          variant="outline"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Request to Join
        </Button>
      )}

      {game.status === "filled" && (
        <Button variant="secondary" className="w-full" disabled>
          <CheckCircle className="h-4 w-4 mr-2" />
          Game Full
        </Button>
      )}

      {game.status === "cancelled" && (
        <Button variant="destructive" className="w-full" disabled>
          <XCircle className="h-4 w-4 mr-2" />
          Cancelled
        </Button>
      )}
    </div>
  );
};
