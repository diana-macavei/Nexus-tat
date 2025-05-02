const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/forms", async (req, res) => {
  const { title, form_url, type, deadline, created_by, group_id } = req.body;

  try {
    await pool.query(
      `INSERT INTO forms (title, form_url, type, deadline, created_by, group_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, form_url, type, deadline, created_by, group_id]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error inserting form:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
