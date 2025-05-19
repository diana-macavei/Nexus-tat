const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /polls + notify
router.post("/polls", async (req, res) => {
  const {
    question,
    options,
    deadline,
    is_anonymous,
    allow_multiple,
    created_by,
    type
  } = req.body;

  try {
    let effectiveGroupId = null;

    if ((type || '').toLowerCase() === "group") {
      const userRes = await pool.query("SELECT group_id FROM users WHERE id = $1", [created_by]);
      if (userRes.rows.length === 0) return res.status(400).json({ error: "User not found" });
      effectiveGroupId = userRes.rows[0].group_id;
      if (!effectiveGroupId) return res.status(400).json({ error: "User has no group_id" });
    }

    // Insert poll
    const result = await pool.query(
      `INSERT INTO polls (question, deadline, created_by, is_anonymous, allow_multiple, type, group_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [question, deadline, created_by, is_anonymous, allow_multiple, type, effectiveGroupId]
    );

    const pollId = result.rows[0].id;

    // Insert poll options
    for (const text of options) {
      await pool.query(
        "INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2)",
        [pollId, text]
      );
    }

    // Insert notification
    const message = (type || '').toLowerCase() === "hub"
      ? "SysAdmin added a new poll!"
      : "GroupLeader added a new poll!";

    await pool.query(
      `INSERT INTO notifications (message, type, created_at, created_by, group_id)
       VALUES ($1, $2, NOW(), $3, $4)`,
      [message, "poll", created_by, effectiveGroupId]
    );

    // Insert into deadlines
    if (deadline) {
      await pool.query(
        `INSERT INTO deadlines (title, due_date, type, group_id)
         VALUES ($1, $2, $3, $4)`,
        [question, deadline, type, effectiveGroupId]
      );
    }


    console.log("✅ Poll + notification inserted with group_id:", effectiveGroupId);
    res.status(201).json({ message: "Poll created successfully", pollId });
  } catch (err) {
    console.error("❌ Poll creation error:", err);
    res.status(500).json({ message: "Error creating poll" });
  }
});

module.exports = router;
