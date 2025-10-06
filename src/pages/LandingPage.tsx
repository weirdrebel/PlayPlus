import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  Play,
  Shield,
  Trophy
} from "lucide-react";

export const LandingPage = () => {
  const features = [
    {
      icon: Users,
      title: "Find Your Team",
      description: "Connect with players in your area looking for the same sports and skill levels."
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Host or join games with simple date and time coordination."
    },
    {
      icon: MapPin,
      title: "Local Games",
      description: "Discover games happening near you with location-based search."
    },
    {
      icon: Shield,
      title: "Safe Community",
      description: "Join a trusted community of verified players and hosts."
    }
  ];

  const sports = [
    { name: "Football", emoji: "⚽", count: "124 games" },
    { name: "Basketball", emoji: "🏀", count: "89 games" },
    { name: "Cricket", emoji: "🏏", count: "67 games" },
    { name: "Tennis", emoji: "🎾", count: "45 games" },
    { name: "Volleyball", emoji: "🏐", count: "38 games" },
    { name: "Futsal", emoji: "⚽", count: "56 games" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Find Your
              <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Perfect Game
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Connect with local players, join exciting games, and build your sports community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/browse">
                <Button size="lg" className="btn-hero text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5" />
                  Browse Games
                </Button>
              </Link>
              <Link to="/host/new">
                <Button
                  size="lg"
                  variant="default"
                  className="text-white bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 border border-blue-600"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Host a Game
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-muted-foreground">Games This Week</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-muted-foreground">Sports Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Player Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Sports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Sports</h2>
            <p className="text-muted-foreground text-lg">Join thousands of players across different sports</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sports.map((sport, index) => (
              <Card key={sport.name} className="hover-scale cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sport.emoji}</div>
                  <h3 className="font-semibold mb-1">{sport.name}</h3>
                  <p className="text-sm text-muted-foreground">{sport.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Play Plus?</h2>
            <p className="text-muted-foreground text-lg">Everything you need to find and organize amazing games</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center hover-scale">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Trophy className="mx-auto h-16 w-16 mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join our community of passionate players and discover your next favorite game today.
          </p>
          <Link to="/browse">
            <Button size="lg" className="bg-white text-primary hover:bg-blue-50 text-lg px-8 py-4">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
