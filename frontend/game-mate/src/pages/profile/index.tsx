import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { User, MapPin, Calendar, Star, Users, Trophy, TrendingUp, MessageCircle, Clock, CheckCircle, XCircle, Info } from "lucide-react";
import { fetchUserById, fetchUserGameStats, fetchUserJoinRequests } from "@/lib/api";
import { getSportInfo } from "@/lib/mockData";

const STATIC_AGE = 23;
const STATIC_CITY = "Lahore";
const STATIC_APPROVAL_RATE = 85;
const STATIC_BIO = "Passionate sports enthusiast. Always looking for a good game and new friends!";
const STATIC_PREFERRED_SPORTS = ["football", "basketball"];
const STATIC_AVATAR_URL = "";
const STATIC_RATING = 4.2;
const STATIC_TOTAL_REVIEWS = 10;
const STATIC_RATINGS_BREAKDOWN = { 5: 6, 4: 3, 3: 1, 2: 0, 1: 0 };
const STATIC_RECENT_REVIEWS = [
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

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'requested':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
        case 'accepted':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
        case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Declined</Badge>;
        default:
        return null;
    }
};

export default function LoggedInProfilePage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = React.useState(searchParams.get("tab") || "profile");
  const [user, setUser] = React.useState<any>(null);
  const [gameStats, setGameStats] = React.useState<{ games_hosted: number; games_joined: number } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [userRequests, setUserRequests] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      let userId = "1";
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // JWT format: header.payload.signature
          const payload = token.split('.')[1];
          // Add padding if needed
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
          const decoded = JSON.parse(atob(padded));
          if (decoded.user_id) userId = decoded.user_id;
          console.log('ProfilePage userId:', userId);
        } catch (e) {}
      }
      const userData = await fetchUserById(userId);
      setUser(userData);
      const stats = await fetchUserGameStats(userId);
      setGameStats(stats);
      const requests = await fetchUserJoinRequests();
      setUserRequests(requests);
      setLoading(false);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (!user) return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-warning text-warning" : "text-muted-foreground"}`} />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-24 w-24 mx-auto sm:mx-0">
                  <AvatarImage src={STATIC_AVATAR_URL} alt={user.username} />
                  <AvatarFallback className="text-2xl">
                    {user.username.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{STATIC_AGE} years old</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{STATIC_CITY}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
                    {renderStars(STATIC_RATING)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {STATIC_RATING.toFixed(1)} ({STATIC_TOTAL_REVIEWS} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{gameStats ? gameStats.games_hosted : 0}</p>
                    <p className="text-sm text-muted-foreground">Games Hosted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{gameStats ? (gameStats.games_hosted + gameStats.games_joined) : 0}</p>
                    <p className="text-sm text-muted-foreground">Games Played</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold">{STATIC_APPROVAL_RATE}%</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of join requests you've been accepted for</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">Approval Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{STATIC_BIO}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Preferred Sports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {STATIC_PREFERRED_SPORTS.map(sport => {
                    const sportInfo = getSportInfo(sport);
                    return <Badge key={sport} variant="outline" className="gap-1">
                      <span>{sportInfo?.emoji}</span>
                      {sportInfo?.label}
                    </Badge>;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Ratings Breakdown</CardTitle>
              <CardDescription>Based on {STATIC_TOTAL_REVIEWS} reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(rating => <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star className="h-3 w-3 fill-warning text-warning" />
                  </div>
                  <Progress value={STATIC_RATINGS_BREAKDOWN[rating as keyof typeof STATIC_RATINGS_BREAKDOWN] / STATIC_TOTAL_REVIEWS * 100} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-8">
                    {STATIC_RATINGS_BREAKDOWN[rating as keyof typeof STATIC_RATINGS_BREAKDOWN]}
                  </span>
                </div>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {STATIC_RECENT_REVIEWS.map((review, index) => <div key={review.id}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{review.reviewerInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(review.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                  {index < STATIC_RECENT_REVIEWS.length - 1 && <Separator className="mt-4" />}
                </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Join Requests</CardTitle>
              <CardDescription>
                Track the status of your game join requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userRequests.length === 0 ? <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No join requests yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Link to="/browse" className="text-primary hover:underline">
                      Browse games
                    </Link>
                    {' '}to find matches to join
                  </p>
                </div> : <div className="space-y-4">
                  {userRequests.map(request => {
                const game = request.game;
                if (!game) return null;
                const sportInfo = getSportInfo(game.sport);
                return <Card key={request.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{sportInfo?.emoji}</span>
                                <Link to={`/games/${game.id}`} className="font-semibold hover:text-primary transition-colors">
                                  {game.title}
                                </Link>
                              </div>
                              
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{game.date_time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{game.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>Host: <a href={`/users/${game.host.id}`} className="text-primary hover:underline">{game.host.username}</a></span>
                                </div>
                              </div>
                              
                              {request.message && <div className="mt-3 p-3 bg-muted rounded-md">
                                  <p className="text-sm">{request.message}</p>
                                </div>}
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              {getStatusBadge(request.status)}
                              <span className="text-xs text-muted-foreground">
                                {request.createdAt}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>;
              })}
                </div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
