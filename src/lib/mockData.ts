export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserProfile extends User {
  age: number;
  city: string;
  bio: string;
  gamesHosted: number;
  gamesPlayed: number;
  approvalRate: number; // percentage
  averageRating: number; // out of 5
  totalReviews: number;
  ratingsBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  preferredSports: Sport[];
  recentReviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewerInitials: string;
  createdAt: string;
}

export interface Game {
  id: string;
  sport: Sport;
  title: string;
  description?: string;
  locationText: string;
  latitude?: number;
  longitude?: number;
  dateTime: string;
  currentPlayerCount: number;
  neededPlayerCount: number;
  skillLevel?: SkillLevel;
  visibility: 'public' | 'private';
  hostId: string;
  status: GameStatus;
  createdAt: string;
  updatedAt: string;
}

export interface JoinRequest {
  id: string;
  gameId: string;
  requesterId: string;
  message?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export type Sport = 'football' | 'basketball' | 'cricket' | 'futsal' | 'tennis' | 'volleyball';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type GameStatus = 'open' | 'filled' | 'cancelled';
export type RequestStatus = 'pending' | 'approved' | 'declined';

export const SPORTS: { value: Sport; label: string; emoji: string }[] = [
  { value: 'football', label: 'Football', emoji: '⚽' },
  { value: 'basketball', label: 'Basketball', emoji: '🏀' },
  { value: 'cricket', label: 'Cricket', emoji: '🏏' },
  { value: 'futsal', label: 'Futsal', emoji: '⚽' },
  { value: 'tennis', label: 'Tennis', emoji: '🎾' },
  { value: 'volleyball', label: 'Volleyball', emoji: '🏐' },
];

export const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b976?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
];

// Mock Games
export const mockGames: Game[] = [
  {
    id: '1',
    sport: 'football',
    title: 'Sunday Morning Football',
    description: 'Casual 11v11 match at the local park. All skill levels welcome!',
    locationText: 'Central Park Sports Field',
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    currentPlayerCount: 18,
    neededPlayerCount: 22,
    skillLevel: 'intermediate',
    visibility: 'public',
    hostId: '1',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    sport: 'basketball',
    title: 'Pick-up Basketball Game',
    description: 'Looking for players for a quick 5v5 game',
    locationText: 'Downtown Court B',
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    currentPlayerCount: 8,
    neededPlayerCount: 10,
    skillLevel: 'beginner',
    visibility: 'public',
    hostId: '2',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    sport: 'tennis',
    title: 'Tennis Tournament Doubles',
    description: 'Competitive doubles tournament. Advanced players preferred.',
    locationText: 'Riverside Tennis Club',
    dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    currentPlayerCount: 16,
    neededPlayerCount: 16,
    skillLevel: 'advanced',
    visibility: 'public',
    hostId: '3',
    status: 'filled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    sport: 'cricket',
    title: 'Weekend Cricket Match',
    description: 'T20 format game. Need bowlers and batsmen!',
    locationText: 'Greenfield Cricket Ground',
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    currentPlayerCount: 14,
    neededPlayerCount: 22,
    skillLevel: 'intermediate',
    visibility: 'public',
    hostId: '4',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    sport: 'volleyball',
    title: 'Beach Volleyball Session',
    description: 'Fun beach volleyball game by the shore',
    locationText: 'Sunset Beach Court 1',
    dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    currentPlayerCount: 6,
    neededPlayerCount: 8,
    skillLevel: 'beginner',
    visibility: 'public',
    hostId: '1',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    sport: 'futsal',
    title: 'Evening Futsal League',
    description: 'Weekly futsal league match. Fast-paced and competitive!',
    locationText: 'Sports Complex Hall A',
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    currentPlayerCount: 9,
    neededPlayerCount: 10,
    skillLevel: 'advanced',
    visibility: 'public',
    hostId: '2',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Join Requests
export const mockJoinRequests: JoinRequest[] = [
  {
    id: '1',
    gameId: '1',
    requesterId: '3',
    message: 'I play as a midfielder and have 5 years experience',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    gameId: '2',
    requesterId: '4',
    message: 'Would love to join! Available for the whole session.',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    gameId: '4',
    requesterId: '2',
    status: 'declined',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock User Profiles with extended data
export const mockUserProfiles: UserProfile[] = [
  {
    ...mockUsers[0],
    age: 28,
    city: 'New York',
    bio: 'Passionate football player with 8+ years of experience. Love organizing weekend matches and bringing communities together through sports.',
    gamesHosted: 24,
    gamesPlayed: 156,
    approvalRate: 95,
    averageRating: 4.8,
    totalReviews: 47,
    ratingsBreakdown: { 5: 38, 4: 7, 3: 2, 2: 0, 1: 0 },
    preferredSports: ['football', 'futsal', 'basketball'],
    recentReviews: [
      {
        id: '1',
        rating: 5,
        comment: 'Great host! Very organized and welcoming to all skill levels.',
        reviewerInitials: 'MK',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        rating: 5,
        comment: 'Excellent player, always on time and brings great energy.',
        reviewerInitials: 'LP',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        rating: 4,
        comment: 'Solid skills and good communication throughout the game.',
        reviewerInitials: 'RM',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    ...mockUsers[1],
    age: 25,
    city: 'San Francisco',
    bio: 'Basketball enthusiast and weekend warrior. Always looking for competitive games and new challenges.',
    gamesHosted: 12,
    gamesPlayed: 89,
    approvalRate: 88,
    averageRating: 4.3,
    totalReviews: 23,
    ratingsBreakdown: { 5: 14, 4: 6, 3: 2, 2: 1, 1: 0 },
    preferredSports: ['basketball', 'volleyball', 'tennis'],
    recentReviews: [
      {
        id: '4',
        rating: 4,
        comment: 'Good player, helpful with organizing team strategies.',
        reviewerInitials: 'DJ',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        rating: 5,
        comment: 'Amazing energy and very supportive of newer players.',
        reviewerInitials: 'CS',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    ...mockUsers[2],
    age: 32,
    city: 'Chicago',
    bio: 'Multi-sport athlete with a focus on team building and fair play. Believe sports bring out the best in people.',
    gamesHosted: 18,
    gamesPlayed: 203,
    approvalRate: 92,
    averageRating: 4.6,
    totalReviews: 34,
    ratingsBreakdown: { 5: 24, 4: 8, 3: 2, 2: 0, 1: 0 },
    preferredSports: ['cricket', 'football', 'tennis'],
    recentReviews: [
      {
        id: '6',
        rating: 5,
        comment: 'Professional attitude and great leadership skills.',
        reviewerInitials: 'AB',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    ...mockUsers[3],
    age: 23,
    city: 'Austin',
    bio: 'New to the area and excited to meet fellow sports lovers. Still learning but very enthusiastic!',
    gamesHosted: 3,
    gamesPlayed: 27,
    approvalRate: 85,
    averageRating: 4.1,
    totalReviews: 8,
    ratingsBreakdown: { 5: 4, 4: 3, 3: 1, 2: 0, 1: 0 },
    preferredSports: ['volleyball', 'tennis', 'futsal'],
    recentReviews: [
      {
        id: '7',
        rating: 4,
        comment: 'Enthusiastic and eager to learn. Great team spirit!',
        reviewerInitials: 'KL',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

// Helper functions
export const getSportInfo = (sport: Sport) => SPORTS.find(s => s.value === sport);
export const getRemainingSlots = (game: Game) => Math.max(0, game.neededPlayerCount - game.currentPlayerCount);
export const getUserById = (id: string) => mockUsers.find(user => user.id === id);
export const getUserProfileById = (id: string) => mockUserProfiles.find(profile => profile.id === id);
// Mock User Requests (requests made by the current user)
export const mockUserRequests: JoinRequest[] = [
  {
    id: '4',
    gameId: '3',
    requesterId: '1', // Current user
    message: 'Experienced tennis player, would love to participate!',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    gameId: '6',
    requesterId: '1', // Current user
    message: 'Great futsal player, available for the full session.',
    status: 'approved',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    gameId: '4',
    requesterId: '1', // Current user
    status: 'declined',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const getGameById = (id: string) => mockGames.find(game => game.id === id);
export const getUserRequestsById = (userId: string) => 
  mockUserRequests.filter(request => request.requesterId === userId);