import React from "react";
import { useParams, Link } from "react-router-dom";
import { ProfileCard } from "@/components/ProfileCard";
import { mockJoinRequests, getUserById } from "@/lib/mockData";



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
		description: "Friendly football match for all skill levels.",
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
		description: "Competitive cricket match for all levels.",
		skillLevel: "Intermediate",
		visibility: "public",
		host: { name: "Alex Johnson", email: "alex@example.com" },
	},
];



const HostedGameDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const game = mockHostedGames.find((g) => g.id === id);
	const host = game ? game.host : null;
	
	// Get join requests for this game from mock data
	const gameJoinRequests = mockJoinRequests.filter(request => request.gameId === id);

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
				<h2 className="text-xl font-semibold mb-4">Join Requests</h2>
				<div className="space-y-4">
					{gameJoinRequests.length === 0 ? (
						<div className="text-muted-foreground">No join requests yet.</div>
					) : (
						gameJoinRequests.map((request) => {
							const requester = getUserById(request.requesterId);
							if (!requester) return null;
							
							return (
								<div key={request.id} className="space-y-3">
									<ProfileCard userId={request.requesterId} />
									{request.message && (
										<div className="ml-4 p-3 bg-muted/50 rounded-lg">
											<p className="text-sm text-muted-foreground mb-1">Message:</p>
											<p className="text-sm">{request.message}</p>
										</div>
									)}
									<div className="ml-4 flex items-center gap-2">
										<span className={`px-3 py-1 rounded-full text-xs font-medium ${
											request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
											request.status === 'approved' ? 'bg-green-100 text-green-800' :
											'bg-red-100 text-red-800'
										}`}>
											{request.status.charAt(0).toUpperCase() + request.status.slice(1)}
										</span>
										{request.status === 'pending' && (
											<div className="flex gap-2">
												<button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors">
													Accept
												</button>
												<button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm hover:bg-destructive/90 transition-colors">
													Reject
												</button>
											</div>
										)}
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
			<Link to="/host" className="text-blue-600 hover:underline">Back to My Hosted Games</Link>
		</div>
	);
};

export default HostedGameDetailsPage;
