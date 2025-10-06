import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHostedGames } from "../lib/api";


const HostGamesPage: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHostedGames()
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch hosted games");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Hosted Games</h1>
        <Link to="/host/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Host New Game</Link>
      </div>
      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : games.length === 0 ? (
          <div className="text-gray-500">You haven't hosted any games yet.</div>
        ) : (
          games.map((game) => (
            <div key={game.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg">{game.title}</div>
                <div className="text-gray-600">{game.sport} &bull; {game.location || game.locationText}</div>
                <div className="text-gray-500 text-sm">{new Date(game.date_time || game.dateTime).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span className={`px-2 py-1 rounded text-xs font-medium ${game.status === "filled" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{game.status}</span>
                <span className="text-sm text-gray-700">{game.currentPlayerCount || game.current_player_count || 0}/{game.neededPlayerCount || game.needed_player_count || 0} players</span>
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
