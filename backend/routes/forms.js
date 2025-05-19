const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /forms + notify
router.post("/forms", async (req, res) => {
  const { title, form_url, type, deadline, created_by } = req.body;

  try {
    let effectiveGroupId = null;

    if ((type || '').toLowerCase() === "group") {
      // Get the user's group_id from DB
      const userRes = await pool.query("SELECT group_id FROM users WHERE id = $1", [created_by]);
      if (userRes.rows.length === 0) {
        return res.status(400).json({ error: "User not found" });
      }
      effectiveGroupId = userRes.rows[0].group_id;
      if (!effectiveGroupId) {
        return res.status(400).json({ error: "User has no group_id" });
      }
    }

    // Insert the form
    await pool.query(
      `INSERT INTO forms (title, form_url, type, deadline, created_by, group_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, form_url, type, deadline, created_by, effectiveGroupId]
    );

    // Notification message
    const message = type.toLowerCase() === "hub"
      ? "SysAdmin added a new form!"
      : "GroupLeader added a new form!";

    // Insert notification
    await pool.query(
      `INSERT INTO notifications (message, type, created_at, created_by, group_id)
       VALUES ($1, $2, NOW(), $3, $4)`,
      [message, "form", created_by, effectiveGroupId]
    );

    // 👇 Insert into deadlines table
    if (deadline) {
      await pool.query(
        `INSERT INTO deadlines (title, due_date, type, group_id)
         VALUES ($1, $2, $3, $4)`,
        [title, deadline, type, effectiveGroupId]
      );
    }

    console.log("✅ Form + Notification saved with group_id:", effectiveGroupId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error inserting form or notification:", err);
    res.status(500).json({ error: "Database error while inserting form" });
  }
});

module.exports = router;
