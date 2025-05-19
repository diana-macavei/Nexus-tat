const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/notifications/:groupId
router.get("/:groupId", async (req, res) => {
  const groupId = parseInt(req.params.groupId);

  try {
    const result = await pool.query(
      `SELECT id, message, type, created_at, group_id, created_by,
              CASE 
                WHEN type = 'form' THEN '📄'
                WHEN type = 'poll' THEN '🗳️'
                WHEN type = 'keyinfo' THEN '📋'
                WHEN type = 'document' THEN '📎'
                ELSE '🔔'
              END AS icon
       FROM notifications
       WHERE created_at >= NOW() - INTERVAL '7 days'
         AND (group_id = $1 OR group_id IS NULL)
       ORDER BY created_at DESC
       LIMIT 5`,
      [groupId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching notifications:", err.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
// DELETE /api/notifications/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM notifications WHERE id = $1", [id]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete notification:", err.message);
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

module.exports = router;
