const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /documents + notify
router.post("/documents", async (req, res) => {
  const { title, file_url, uploaded_by, upload_date, type } = req.body;

  try {
    let effectiveGroupId = null;

    if ((type || '').toLowerCase() === "group") {
      const userRes = await pool.query("SELECT group_id FROM users WHERE id = $1", [uploaded_by]);
      if (userRes.rows.length === 0) return res.status(400).json({ error: "User not found" });
      effectiveGroupId = userRes.rows[0].group_id;
      if (!effectiveGroupId) return res.status(400).json({ error: "User has no group_id" });
    }

    await pool.query(
      `INSERT INTO documents (title, file_url, uploaded_by, upload_date, type, group_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, file_url, uploaded_by, upload_date, type, effectiveGroupId]
    );

    const message = (type || '').toLowerCase() === "hub"
      ? "SysAdmin added a new document!"
      : "GroupLeader added a new document!";

    await pool.query(
      `INSERT INTO notifications (message, type, created_at, created_by, group_id)
       VALUES ($1, $2, NOW(), $3, $4)`,
      [message, "document", uploaded_by, effectiveGroupId]
    );

    console.log("✅ Document + Notification saved with group_id:", effectiveGroupId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error inserting document or notification:", err);
    res.status(500).json({ error: "Database error while inserting document" });
  }
});

module.exports = router;
