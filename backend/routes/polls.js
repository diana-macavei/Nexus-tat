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

// 🔻 GET: fetch polls by type (hub or group)
router.get("/polls", async (req, res) => {
  const { type } = req.query;

  try {
    const normalizedType = (type || "").toLowerCase();

    const pollQuery = `
      SELECT * FROM polls
      WHERE LOWER(type) = $1
      ORDER BY deadline DESC
    `;

    const pollsRes = await pool.query(pollQuery, [normalizedType]);
    const polls = pollsRes.rows;

    // Fetch and attach options to each poll
    const pollsWithOptions = await Promise.all(
      polls.map(async (poll) => {
        const optionsRes = await pool.query(
          "SELECT option_text FROM poll_options WHERE poll_id = $1",
          [poll.id]
        );
        return {
          ...poll,
          options: optionsRes.rows,
        };
      })
    );

    res.json(pollsWithOptions);
  } catch (err) {
    console.error("❌ Error fetching polls:", err);
    res.status(500).json({ error: "Failed to fetch polls" });
  }
});


module.exports = router;
