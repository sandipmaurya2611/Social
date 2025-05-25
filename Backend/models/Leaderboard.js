router.get("/leaderboard", async (req, res) => {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
  });
  