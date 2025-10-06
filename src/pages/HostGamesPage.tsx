import React from "react";
import { Link } from "react-router-dom";



// Separate mock data for hosted games (not shared with browse)
const mockHostedGames = [
  {
    id: "1",
    sport: "Football",
    title: "Sunday Football Match",
    locationText: "Central Park",
    dateTime: "2025-09-01T15:00:00Z",
    neededPlayerCount: 10,
    currentPlayerCount: 7,
    status: "open",
    skillLevel: "Beginner",
    visibility: "public",
    host: { name: "Alex Johnson", email: "alex@example.com" },
  },
  {
    id: "2",
    sport: "Cricket",
    title: "Evening Cricket",
    locationText: "Riverside Ground",
    dateTime: "2025-09-03T18:00:00Z",
    neededPlayerCount: 12,
    currentPlayerCount: 12,
    status: "filled",
    skillLevel: "Intermediate",
    visibility: "public",
    host: { name: "Alex Johnson", email: "alex@example.com" },
  },
];

const HostGamesPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Hosted Games</h1>
        <Link to="/host/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Host New Game</Link>
      </div>
      <div className="space-y-4">
        {mockHostedGames.length === 0 ? (
          <div className="text-gray-500">You haven't hosted any games yet.</div>
        ) : (
          mockHostedGames.map((game) => (
            <div key={game.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg">{game.title}</div>
                <div className="text-gray-600">{game.sport} &bull; {game.locationText}</div>
                <div className="text-gray-500 text-sm">{new Date(game.dateTime).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span className={`px-2 py-1 rounded text-xs font-medium ${game.status === "filled" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{game.status}</span>
                <span className="text-sm text-gray-700">{game.currentPlayerCount}/{game.neededPlayerCount} players</span>
                <Link to={`/host/games/${game.id}`} className="text-blue-600 hover:underline">View</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HostGamesPage;
