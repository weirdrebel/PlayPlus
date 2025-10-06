import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sports = [
  { value: "football", label: "Football" },
  { value: "cricket", label: "Cricket" },
  { value: "basketball", label: "Basketball" },
  { value: "futsal", label: "Futsal" },
];

const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const visibilities = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const HostNewGamePage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sport: "",
    title: "",
    location: "",
    date_time: "",
    needed_players_count: 1,
    current_players_count: 1,
    skill_level: "",
    visibility: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ added

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.sport || !form.title || !form.location || !form.date_time || form.needed_players_count < 1 || form.current_players_count < 1 || !form.skill_level || !form.visibility) {
      setError("Please fill all required fields and both player counts must be at least 1.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/games/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        console.log(token);
        throw new Error("Failed to create game");
      }

      const data = await response.json();
      console.log("Game created:", data);

      setSuccess("🎉 Game created successfully!"); // ✅ show success
    } catch (err) {
      setError("Error submitting form. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Host a New Game</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>} {/* ✅ added */}

        <div>
          <label className="block mb-1 font-medium">Sport *</label>
          <select
            name="sport"
            value={form.sport}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select sport</option>
            {sports.map((sport) => (
              <option key={sport.value} value={sport.value}>
                {sport.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Game title" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location *</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Location" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date & Time *</label>
          <input name="date_time" type="datetime-local" value={form.date_time} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total Players (Current) *</label>
          <input name="current_players_count" type="number" min={1} value={form.current_players_count} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Needed Players *</label>
          <input name="needed_players_count" type="number" min={1} value={form.needed_players_count} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Skill Level *</label>
          <select
            name="skill_level"
            value={form.skill_level}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select level</option>
            {skillLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Visibility *</label>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select visibility</option>
            {visibilities.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
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
