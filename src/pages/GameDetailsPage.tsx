
import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockGames, getUserById } from "@/lib/mockData";

const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = mockGames.find((g) => g.id === id);
  const host = game ? getUserById(game.hostId) : null;


  if (!game || !host) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <Link to="/browse" className="text-blue-600 hover:underline">Back to Browse Games</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
      <div className="mb-4 text-gray-600">{game.sport} &bull; {game.locationText}</div>
      <div className="mb-2 text-gray-500 text-sm">{new Date(game.dateTime).toLocaleString()}</div>
      <div className="mb-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${game.status === "filled" ? "bg-green-100 text-green-700" : game.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{game.status}</span>
        <span className="ml-4 text-sm text-gray-700">{game.currentPlayerCount}/{game.neededPlayerCount} players</span>
      </div>
      <div className="mb-4">
        <strong>Skill Level:</strong> {game.skillLevel || "Any"}
      </div>
      <div className="mb-4">
        <strong>Visibility:</strong> {game.visibility}
      </div>
      <div className="mb-4">
        <strong>Description:</strong>
        <div className="text-gray-700 mt-1">{game.description || "No description provided."}</div>
      </div>
      <div className="mb-4">
        <strong>Host:</strong> 
        <Link 
          to={`/profile/${host.id}`} 
          className="text-blue-600 hover:underline font-medium ml-1"
        >
          {host.name}
        </Link>
        <span className="text-gray-600"> ({host.email})</span>
      </div>
      {/* Mock join request button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Request to Join</button>
      <Link to="/browse" className="ml-4 text-blue-600 hover:underline">Back to Browse Games</Link>
    </div>
  );
};

export default GameDetailsPage;
