import { Link } from 'react-router-dom';
import { getUserProfileById } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Trophy, Users } from 'lucide-react';

interface ProfileCardProps {
  userId: string;
  className?: string;
}

export const ProfileCard = ({ userId, className }: ProfileCardProps) => {
  const profile = getUserProfileById(userId);

  if (!profile) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium truncate">{profile.name}</h3>
              <div className="flex items-center gap-1">
                {renderStars(profile.averageRating)}
                <span className="text-xs font-medium ml-1">{profile.averageRating}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {profile.age} • {profile.city}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                <span>{profile.gamesHosted} hosted</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{profile.gamesPlayed} played</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <Button variant="outline" size="sm" asChild>
            <Link to={`/profile/${profile.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};