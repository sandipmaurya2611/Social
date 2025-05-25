export default function Badges({ user }) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">🏅 Your Badges</h2>
        <ul className="flex gap-2 mt-2">
          {user.badges.map((badge, i) => (
            <span key={i} className="bg-yellow-200 text-sm px-2 py-1 rounded">{badge}</span>
          ))}
        </ul>
      </div>
    );
  }
  