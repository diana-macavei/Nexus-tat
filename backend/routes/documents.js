const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/documents", async (req, res) => {
  const { title, file_url, uploaded_by, upload_date } = req.body;

  try {
    await pool.query(
      `INSERT INTO documents (title, file_url, uploaded_by, upload_date)
       VALUES ($1, $2, $3, $4)`,
      [title, file_url, uploaded_by, upload_date]
    );
    res.status(200).json({ message: "Document inserted" });
  } catch (err) {
    console.error("Error inserting document:", err.message);
    res.status(500).json({ error: "Failed to insert document" });
  }
});

module.exports = router;
