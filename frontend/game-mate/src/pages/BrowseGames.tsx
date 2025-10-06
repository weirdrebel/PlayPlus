import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { fetchGames } from "@/lib/api";
import {
  mockGames,
  SPORTS,
  SKILL_LEVELS,
  type Sport,
  type SkillLevel
} from "@/lib/mockData";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BrowseGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "spots">("date");

  const [host, setHost] = useState<any>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const user = await fetchGames();
        console.log(user);
        setGames(user);
      } catch (error) {
        console.error("Failed to fetch host:", error);
      }
    };
    loadGames();
  }, []);

  const filteredGames = useMemo(() => {
    let filtered = games.filter(game => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSport =
        selectedSports.length === 0 || selectedSports.includes(game.sport);

      const matchesSkill =
        selectedSkillLevel === "all" || game.skill_level === selectedSkillLevel;

      return matchesSearch && matchesSport && matchesSkill;
    });

    // Sort games
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date_time).getTime() - new Date(b.date_time).getTime();
      } else {
        const aSpotsLeft = a.needed_players_count - a.current_players_count;
        const bSpotsLeft = b.needed_players_count - b.current_players_count;
        return bSpotsLeft - aSpotsLeft;
      }
    });

    return filtered;
  }, [games, searchTerm, selectedSports, selectedSkillLevel, sortBy]);

  const toggleSport = (sport: Sport) => {
    setSelectedSports(prev =>
      prev.includes(sport)
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setSelectedSkillLevel("all");
    setSearchTerm("");
  };

  const handleJoinRequest = (gameId: string) => {
    // Mock join request - in real app this would call an API
    console.log(`Requesting to join game ${gameId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Browse Games</h1>
          <p className="text-muted-foreground">
            Find and join exciting games in your area
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredGames.length} games found
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games, locations, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value: "date" | "spots") => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="spots">Sort by Spots Left</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filter Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Games</SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect game
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Sort Option */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={(value: "date" | "spots") => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Earliest First)</SelectItem>
                    <SelectItem value="spots">Spots Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sport Filters */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sports</label>
                <div className="grid grid-cols-2 gap-2">
                  {SPORTS.map((sport) => (
                    <button
                      key={sport.value}
                      onClick={() => toggleSport(sport.value)}
                      className={`filter-chip ${
                        selectedSports.includes(sport.value)
                          ? "filter-chip-active"
                          : "filter-chip-inactive"
                      }`}
                    >
                      <span className="mr-1">{sport.emoji}</span>
                      {sport.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Level Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Skill Level</label>
                <Select value={selectedSkillLevel} onValueChange={(value: SkillLevel | "all") => setSelectedSkillLevel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground">Sports:</span>
        {SPORTS.map((sport) => (
          <button
            key={sport.value}
            onClick={() => toggleSport(sport.value)}
            className={`filter-chip ${
              selectedSports.includes(sport.value)
                ? "filter-chip-active"
                : "filter-chip-inactive"
            }`}
          >
            <span className="mr-1">{sport.emoji}</span>
            {sport.label}
          </button>
        ))}

        {selectedSports.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-2">
            Clear filters
          </Button>
        )}
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onJoinClick={handleJoinRequest}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No games found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
