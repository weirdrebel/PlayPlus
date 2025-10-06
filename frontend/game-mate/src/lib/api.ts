import { Game, User, JoinRequest } from "./mockData";

const API_BASE = "http://localhost:8000/api"; // adjust as needed

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ---- USERS ----
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.map((u: any) => ({
    id: String(u.id),
    name: u.username || `${u.first_name} ${u.last_name}`,
    email: u.email,
  }));
}

// Fetch game stats for a user
export async function fetchUserGameStats(userId: string | number): Promise<{ games_hosted: number; games_joined: number }> {
  const res = await fetch(`${API_BASE}/user/${userId}/game-stats/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch user game stats');
  return await res.json();
}

export async function fetchUserById(id: string): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}/`, {
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  const u = await res.json();
  return {
    id: String(u.id),
    username: u.username || `${u.first_name} ${u.last_name}`,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    name: u.username,
  };
}

// ---- GAMES ----
export async function fetchGames(): Promise<Game[]> {
  const res = await fetch(`${API_BASE}/games/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch games");
  const data = await res.json();
  return data.map((g: any) => ({
    id: String(g.id),
    sport: g.sport,
    title: g.title,
    description: g.description,
    location: g.location,
    date_time: g.date_time,
    hostId: g.host,
    currentPlayerCount: g.current_players_count,
    neededPlayerCount: g.needed_players_count,
    visibility: g.visibility,
  }));
}

// ---- HOSTED GAMES FOR THE CURRENTLY LOGGED IN USER ----
export async function fetchHostedGames(): Promise<Game[]> {
  const res = await fetch(`${API_BASE}/hosted/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch hosted games");
  const data = await res.json();
  return data.map((g) => ({
    id: String(g.id),
    sport: g.sport,
    title: g.title,
    description: g.description,
    location: g.location,
    date_time: g.date_time,
    hostId: g.host,
    currentPlayerCount: g.current_players_count,
    neededPlayerCount: g.needed_players_count,
    visibility: g.visibility,
  }));
}

export async function fetchGameById(id: string): Promise<Game> {
  const res = await fetch(`${API_BASE}/games/${id}/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch game");
  const g = await res.json();
  return {
    id: String(g.id),
    sport: g.sport,
    title: g.title,
    description: g.description,
    location: g.location,
    dateTime: g.date_time,
    hostId: g.host,
    currentPlayerCount: g.current_players_count,
    neededPlayerCount: g.needed_players_count,
    visibility: g.visibility,
  };
}

// ---- JOIN REQUESTS ----
export async function fetchJoinRequests(): Promise<JoinRequest[]> {
  const res = await fetch(`${API_BASE}/join-requests/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch join requests");
  const data = await res.json();
  return data.map((j: any) => ({
    id: String(j.id),
    gameId: String(j.game),
    userId: String(j.user),
    status: j.status,
  }));
}

// ---- JOIN STATUS ----
export async function fetchJoinStatus(gameId: string): Promise<string | null> {
  const res = await fetch(`${API_BASE}/join-requests/status/${gameId}/`, {
    headers: getAuthHeaders(),
  });
  if (res.ok) {
    const data = await res.json();
    return data.status;
  }
  return null;
}


// ---- GAME JOIN REQUESTS ----
export async function fetchGameJoinRequests(gameId: string): Promise<Array<{id: string, user: string, user_name: string, user_email: string, status: string}>> {
  const res = await fetch(`${API_BASE}/join-requests/all/${gameId}/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch join requests for game");
  const data = await res.json();
  return data.map((j) => ({
    id: String(j.id),
    user: String(j.user),
    user_name: j.user_name,
    user_email: j.user_email,
    status: j.status,
  }));
}


// ---- MAKE JOIN REQUEST ----
export async function makeJoinRequest(gameId: string): Promise<{ detail: string; status: string }> {
  const res = await fetch(`${API_BASE}/join-requests/join/${gameId}/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to make join request");
  return data;
}


// ---- UPDATE JOIN REQUEST STATUS ----
export async function updateJoinRequestStatus(joinRequestId: string, status: "accepted" | "rejected"): Promise<{ detail: string }> {
  const res = await fetch(`${API_BASE}/join-requests/update/${joinRequestId}/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to update join request status");
  return data;
}


// ---- GET JOIN REQUESTS FOR LOEGED IN USER ----
export async function fetchUserJoinRequests(): Promise<any> {
  const res = await fetch(`${API_BASE}/join-requests/current-user-requests/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch user's join requests");
  const data = await res.json();
  return data;
}


// ---- LOGGED IN USER DATA ----
export async function fetchLoggedInUser(): Promise<User | null> {
  const res = await fetch(`${API_BASE}/user/me/`, {
    headers: getAuthHeaders(),
  });
  if (res.ok) {
    const u = await res.json();
    return {
      id: String(u.id),
      username: u.username || `${u.first_name} ${u.last_name}`,
      email: u.email,
      firstName: u.first_name,
      lastName: u.last_name,
      name: u.username,
    };
  }
  return null;
}