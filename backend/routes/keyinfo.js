const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/keyinfo", async (req, res) => {
  const { title, content, posted_by, created_at } = req.body;

  try {
    await pool.query(
      `INSERT INTO key_information (title, content, posted_by, created_at)
       VALUES ($1, $2, $3, $4)`,
      [title, content, posted_by, created_at]
    );
    res.status(200).json({ message: "Key info inserted" });
  } catch (err) {
    console.error("Error inserting key info:", err.message);
    res.status(500).json({ error: "Failed to insert key information" });
  }
});

module.exports = router;
