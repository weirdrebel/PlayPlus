import { useParams, Navigate } from 'react-router-dom';
import { getUserProfileById, getSportInfo } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Star, Trophy, Users, Target, Info } from 'lucide-react';

export const ProfilePage = () => {
  const { userId } = useParams();
  const profile = getUserProfileById(userId || '');

  if (!profile) {
    return <Navigate to="/browse" replace />;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const renderRatingBar = (stars: number, count: number, total: number) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="w-8">{stars}★</span>
        <div className="flex-1 bg-muted rounded-full h-2">
          <div
            className="bg-amber-400 h-2 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="w-8 text-right text-muted-foreground">{count}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{profile.name}</CardTitle>
            <p className="text-muted-foreground">
              {profile.age} • {profile.city}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {renderStars(profile.averageRating)}
              <span className="ml-2 text-sm font-medium">{profile.averageRating}</span>
              <span className="text-sm text-muted-foreground">
                ({profile.totalReviews} reviews)
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{profile.gamesHosted}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Games Hosted</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{profile.gamesPlayed}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Games Played</p>
                </div>
              </div>

              {/* Approval Rate */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{profile.approvalRate}%</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage of join requests this user approves when hosting games</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground">Approval Rate</p>
              </div>

              {/* Preferred Sports */}
              <div>
                <h4 className="text-sm font-medium mb-2">Preferred Sports</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.preferredSports.map((sport) => {
                    const sportInfo = getSportInfo(sport);
                    return (
                      <Badge key={sport} variant="secondary" className="text-xs">
                        {sportInfo?.emoji} {sportInfo?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            </CardContent>
          </Card>

          {/* Ratings Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Ratings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => 
                  renderRatingBar(
                    stars, 
                    profile.ratingsBreakdown[stars as keyof typeof profile.ratingsBreakdown], 
                    profile.totalReviews
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.recentReviews.map((review) => (
                  <div key={review.id} className="border-l-2 border-muted pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        by {review.reviewerInitials}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
                {profile.recentReviews.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No reviews yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};