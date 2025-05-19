const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/deadlines/:groupId
router.get("/:groupId", async (req, res) => {
  const groupId = parseInt(req.params.groupId);

  try {
    const result = await pool.query(
      `SELECT id, title, due_date, type
       FROM deadlines
       WHERE group_id = $1 OR group_id IS NULL
       ORDER BY due_date ASC
       LIMIT 10`,
      [groupId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching deadlines:", err.message);
    res.status(500).json({ error: "Failed to fetch deadlines" });
  }
});

module.exports = router;
