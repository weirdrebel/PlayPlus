import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Star, Trophy, Users, Target, Info } from 'lucide-react';
import { fetchUserById, fetchUserGameStats } from '@/lib/api';
import { getSportInfo } from '@/lib/mockData';


const STATIC_RATING = 4;
const STATIC_AGE = 23;
const STATIC_CITY = "Lahore";
const STATIC_REVIEWS = 10;
const STATIC_APPROVAL_RATE = 85;

export default () => {
  const { userId } = useParams();
  const [profile, setProfile] = React.useState<any>(null);
  const [gameStats, setGameStats] = React.useState<{ games_hosted: number; games_joined: number } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      setLoading(true);
      const user = await fetchUserById(userId);
      setProfile(user);
      const stats = await fetchUserGameStats(userId);
      setGameStats(stats);
      setLoading(false);
    }
    fetchData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!profile) {
    return <Navigate to="/browse" replace />;
  }

    // Mock missing fields
    const bio = profile.bio || "Passionate sports enthusiast. Always looking for a good game and new friends!";
    const ratingsBreakdown = profile.ratingsBreakdown || { 5: 6, 4: 3, 3: 1, 2: 0, 1: 0 };
    const totalReviews = profile.totalReviews || STATIC_REVIEWS;
    const recentReviews = profile.recentReviews || [
      {
        id: 1,
        rating: 5,
        reviewerInitials: "AB",
        createdAt: new Date().toISOString(),
        comment: "Great host, very friendly and organized!"
      },
      {
        id: 2,
        rating: 4,
        reviewerInitials: "CD",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        comment: "Fun game, would join again."
      }
    ];
    const preferredSports = profile.preferredSports || ["football", "basketball"];

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
              <AvatarImage src="" alt={profile.username} />
              <AvatarFallback className="text-xl">
                {profile.username.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{profile.username}</CardTitle>
            <p className="text-muted-foreground">
              {STATIC_AGE} • {STATIC_CITY}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {renderStars(STATIC_RATING)}
              <span className="ml-2 text-sm font-medium">{STATIC_RATING}</span>
              <span className="text-sm text-muted-foreground">
                ({STATIC_REVIEWS} reviews)
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
                    <span className="font-semibold">{gameStats ? gameStats.games_hosted : 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Games Hosted</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{gameStats ? (gameStats.games_hosted + gameStats.games_joined) : 0}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Games Played</p>
                </div>
              </div>

              {/* Approval Rate */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{STATIC_APPROVAL_RATE}%</span>
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
                  {preferredSports.map((sport) => {
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
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
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
                    ratingsBreakdown[stars as keyof typeof ratingsBreakdown], 
                    totalReviews
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
                {recentReviews.map((review) => (
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
                {recentReviews.length === 0 && (
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