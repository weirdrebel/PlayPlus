import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sports = ["Football", "Cricket", "Basketball", "Futsal"];

const HostNewGamePage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sport: "",
    title: "",
    locationText: "",
    dateTime: "",
    neededPlayerCount: 1,
    currentPlayerCount: 1,
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sport || !form.title || !form.locationText || !form.dateTime || form.neededPlayerCount < 1 || form.currentPlayerCount < 1) {
      setError("Please fill all required fields and both player counts must be at least 1.");
      return;
    }
    // Mock: pretend to create game, then redirect
    navigate("/host");
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Host a New Game</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Sport *</label>
          <select name="sport" value={form.sport} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Select sport</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Game title" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location *</label>
          <input name="locationText" value={form.locationText} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Location" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date & Time *</label>
          <input name="dateTime" type="datetime-local" value={form.dateTime} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Players (Current) *</label>
          <input name="currentPlayerCount" type="number" min={1} value={form.currentPlayerCount} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Needed Players *</label>
          <input name="neededPlayerCount" type="number" min={1} value={form.neededPlayerCount} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Optional description" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Host Game</button>
      </form>
    </div>
  );
};

export default HostNewGamePage;
