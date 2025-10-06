import React from "react";

const HostGame: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Host a Game</h1>
      <p className="text-lg text-gray-700 mb-8">Create and host your own game session for others to join.</p>
      {/* Add your host game form or logic here */}
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="gameName">Game Name</label>
          <input className="w-full px-3 py-2 border rounded" id="gameName" name="gameName" type="text" placeholder="Enter game name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="hostName">Your Name</label>
          <input className="w-full px-3 py-2 border rounded" id="hostName" name="hostName" type="text" placeholder="Enter your name" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Host Game</button>
      </form>
    </div>
  );
};

export default HostGame;
