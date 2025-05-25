import { useEffect, useState } from "react";
import axios from "axios";

export default function Achievements({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data by ID
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchData();
  }, [userId]);

  if (!user) return <div className="text-center mt-8">Loading achievements...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">🏅 Your Achievements</h1>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-lg font-semibold text-gray-700">Total Points:</p>
          <p className="text-4xl text-green-600 font-bold">{user.points}</p>
        </div>
        <button
          onClick={() => window.location.href = "/leaderboard"}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow"
        >
          View Leaderboard
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Earned Badges</h2>
        {user.badges.length === 0 ? (
          <p className="text-gray-500">No badges yet. Keep engaging!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {user.badges.map((badge, i) => (
              <div
                key={i}
                className="bg-yellow-100 text-center p-4 rounded-xl shadow text-sm font-semibold text-yellow-800"
              >
                🏆 {badge}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Keep contributing, helping others, and completing content to earn more!
      </div>
    </div>
  );
}
