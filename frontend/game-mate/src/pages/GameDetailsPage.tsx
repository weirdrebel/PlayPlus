
import { fetchGameById, fetchUserById, fetchJoinStatus, makeJoinRequest } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const API_BASE = "http://localhost:8000/api";


const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState(null);
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState<string | null>(null);
  const [joinStatusLoading, setJoinStatusLoading] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const gameData = await fetchGameById(id);
        setGame(gameData);
        if (gameData.hostId) {
          const hostData = await fetchUserById(gameData.hostId);
          setHost(hostData);
        }
      } catch (error) {
        setGame(null);
        setHost(null);
      }
      setLoading(false);
    };

    const getJoinStatus = async () => {
      if (!id) return;
      setJoinStatusLoading(true);
      try {
        const status = await fetchJoinStatus(id);
        setJoinStatus(status.toLowerCase());
      } catch {
        setJoinStatus(null);
      }
      setJoinStatusLoading(false);
    };

    if (id) {
      fetchGameDetails();
      getJoinStatus();
    };

  }, [id]);

  if (loading) {
    return <div className="max-w-2xl mx-auto py-12 px-4">Loading...</div>;
  }

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
        <strong>Host:</strong> <a href={`/profile/${host.id}`} className="text-blue-600 hover:underline">{host.name}</a> ({host.email})
      </div>
      <div className="mb-4">
        {joinStatusLoading ? (
          <span className="text-gray-500">Checking join status...</span>
        ) : joinStatus === "Not requested".toLowerCase() ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={async () => {
              if (!id) return;
              setJoinStatusLoading(true);
              try {
                const res = await makeJoinRequest(id);
                setJoinStatus(res.status.toLowerCase());
              } catch (err: any) {
                // Optionally show error
              }
              setJoinStatusLoading(false);
            }}
          >
            Request to Join
          </button>
        ) : joinStatus === "Requested".toLowerCase() ? (
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">Request Pending</span>
        ) : joinStatus === "Accepted".toLowerCase() ? (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Request Accepted</span>
        ) : joinStatus === "Rejected".toLowerCase() ? (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">Request Rejected</span>
        ) : null}
      </div>
      <Link to="/browse" className="ml-4 text-blue-600 hover:underline">Back to Browse Games</Link>
    </div>
  );
};

export default GameDetailsPage;
