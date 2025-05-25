const UserCard = ({ user }) => (
    <div className="p-2 border rounded my-2">
      <h3 className="font-bold">{user.name}</h3>
      <p>{user.passionTags.join(", ")}</p>
    </div>
  );
  export default UserCard;