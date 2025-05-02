const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/groups", async (req, res) => {
  const { name, groupLeaderEmail } = req.body;

  try {
    let groupLeaderId = null;
    let groupLeaderName = null;

    if (groupLeaderEmail) {
      const leader = await pool.query(
        "SELECT id, first_name, last_name FROM users WHERE email = $1",
        [groupLeaderEmail]
      );

      if (leader.rows.length > 0) {
        groupLeaderId = leader.rows[0].id;
        groupLeaderName = `${leader.rows[0].first_name} ${leader.rows[0].last_name}`;

        await pool.query(
          "UPDATE users SET role = 'groupleader' WHERE id = $1",
          [groupLeaderId]
        );
      }
    }

    // 👇 INSERT also group_leader_name
    await pool.query(
      `INSERT INTO groups (name, group_leader_id, group_leader_name) VALUES ($1, $2, $3)`,
      [name, groupLeaderId, groupLeaderName]
    );

    res.status(200).json({ message: "Group created successfully." });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error creating group." });
  }

  try {
    const result = await pool.query("SELECT id, name FROM groups");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching groups:", err.message);
    res.status(500).json({ message: "Error fetching groups." });
  }

});

module.exports = router;
