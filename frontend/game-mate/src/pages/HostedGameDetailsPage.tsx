
import { fetchGameById, fetchUserById, fetchGameJoinRequests, updateJoinRequestStatus } from "../lib/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const HostedGameDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [game, setGame] = useState<any>(null);
	const [host, setHost] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [joinRequests, setJoinRequests] = useState<any[]>([]);
	const [joinRequestsLoading, setJoinRequestsLoading] = useState(false);

	useEffect(() => {
		const fetchDetails = async () => {
			setLoading(true);
			try {
				const gameData = await fetchGameById(id);
				setGame(gameData);
				if (gameData.hostId) {
					const hostData = await fetchUserById(gameData.hostId);
					setHost(hostData);
				}
			} catch {
				setGame(null);
				setHost(null);
			}
			setLoading(false);
		};

		const fetchRequests = async () => {
			setJoinRequestsLoading(true);
			try {
				const requests = await fetchGameJoinRequests(id!);
				setJoinRequests(requests);
			} catch {
				setJoinRequests([]);
			}
			setJoinRequestsLoading(false);
		};

		if (id) {
			fetchDetails();
			fetchRequests();
		}
	}, [id]);


	const handleJoinRequestUpdate = async (joinRequestId: string, status: "accepted" | "rejected") => {
		try {
			const result = await updateJoinRequestStatus(joinRequestId, status);
			console.log(result);
			
			// Refresh join requests after update
			const requests = await fetchGameJoinRequests(id!);
			setJoinRequests(requests);

		} catch (error) {
			console.error("Failed to update join request status:", error);
		}
	};

	if (loading) {
		return (
			<div className="max-w-2xl mx-auto py-12 px-4">Loading...</div>
		);
	}

	if (!game || !host) {
		return (
			<div className="max-w-2xl mx-auto py-12 px-4">
				<h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
				<Link to="/host" className="text-blue-600 hover:underline">Back to My Hosted Games</Link>
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
				<strong>Host:</strong> {host.name} ({host.email})
			</div>
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Join Requests</h2>
				<div className="space-y-2">
					{joinRequestsLoading ? (
						<div className="text-gray-500">Loading join requests...</div>
					) : joinRequests.length === 0 ? (
						<div className="text-gray-500">No join requests yet.</div>
					) : (
						joinRequests.map((req) => (
							<div key={req.id} className="flex items-center justify-between bg-gray-50 rounded p-3">
								<div>
									<span className="font-medium">
										<a href={`/profile/${req.user}`} className="text-blue-600 hover:underline">{req.user_name}</a>
									</span> <span className="text-gray-500 text-sm">({req.user_email})</span>
								</div>
								<div>
									{req.status === "requested" ? (
										<>
											<button 
												className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition"
												onClick={() => handleJoinRequestUpdate(req.id, "accepted")}
											>
												Accept
											</button>
											<button 
												className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
												onClick={() => handleJoinRequestUpdate(req.id, "rejected")}
											>
												Reject
											</button>
										</>
									) : (
										req.status === "accepted" ? (
											<span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
										) : (
											<span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
										)
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
			<Link to="/host" className="text-blue-600 hover:underline">Back to My Hosted Games</Link>
		</div>
	);
};
export default HostedGameDetailsPage;
