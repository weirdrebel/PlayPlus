export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export interface Game {
  id: string;
  sport: Sport;
  title: string;
  description?: string;
  location: string;
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

// Helper functions
export const getSportInfo = (sport: string) => SPORTS.find(s => s.value === sport);
export const getRemainingSlots = (game: Game) => Math.max(0, game.neededPlayerCount - game.currentPlayerCount);
export const getUserById = (id: string) => mockUsers.find(user => user.id === id);
export const getGameById = (id: string) => mockGames.find(game => game.id === id);
