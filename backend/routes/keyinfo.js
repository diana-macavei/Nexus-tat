const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/keyinfo", async (req, res) => {
  const { title, content, posted_by, created_at, type } = req.body;

  try {
    let effectiveGroupId = null;

    if ((type || "").toLowerCase() === "group") {
      // 🔍 Look up the user to get the real numeric group_id
      const userRes = await pool.query("SELECT group_id FROM users WHERE id = $1", [posted_by]);
      if (userRes.rows.length === 0) {
        return res.status(400).json({ error: "User not found" });
      }

      effectiveGroupId = userRes.rows[0].group_id;

      if (!effectiveGroupId) {
        return res.status(400).json({ error: "User has no group_id" });
      }
    }

    // ✅ Insert into key_information
    await pool.query(
      `INSERT INTO key_information (title, content, posted_by, created_at, group_id, type)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, content, posted_by, created_at, effectiveGroupId, type]
    );

    const message =
      type.toLowerCase() === "hub"
        ? "SysAdmin added a new key information!"
        : "GroupLeader added a new key information!";

    // ✅ Insert into notifications
    await pool.query(
      `INSERT INTO notifications (message, type, created_at, created_by, group_id)
       VALUES ($1, $2, NOW(), $3, $4)`,
      [message, "keyinfo", posted_by, effectiveGroupId]
    );

    console.log("✅ keyinfo saved with group_id:", effectiveGroupId);
    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ Error inserting keyinfo or notification:", err);
    res.status(500).json({ error: "Database error while inserting keyinfo" });
  }
});

module.exports = router;
