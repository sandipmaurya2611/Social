import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/leaderboard").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>
      <ol>
        {users.map((u, idx) => (
          <li key={u._id}>
            {idx + 1}. {u.username} – {u.points} pts
          </li>
        ))}
      </ol>
    </div>
  );
}
