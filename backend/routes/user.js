const authenticateToken = require("../middleware/authMiddleware");

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      "SELECT first_name, last_name FROM users WHERE id = $1",
      [userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ message: "Error retrieving user info." });
  }
});
