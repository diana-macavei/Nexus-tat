const express = require("express");
const router = express.Router();
const pool = require("../db");

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
    const result = await pool.query(
      `INSERT INTO polls (question, deadline, created_by, is_anonymous, allow_multiple, type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [question, deadline, created_by, is_anonymous, allow_multiple, type]
    );

    const pollId = result.rows[0].id;

    for (const text of options) {
      await pool.query(
        "INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2)",
        [pollId, text]
      );
    }

    res.status(201).json({ message: "Poll created successfully", pollId });
  } catch (err) {
    console.error("Poll creation error:", err.message);
    res.status(500).json({ message: "Error creating poll" });
  }
});

module.exports = router;
