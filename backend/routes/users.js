const express = require("express");
const router = express.Router();
const db = require("../db"); // or your DB client

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Get the user
    const userRes = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userRes.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = userRes.rows[0];
    const groupId = user.group_id;

    // Get the group leader
    const glRes = await db.query(
      "SELECT first_name, last_name FROM users WHERE group_id = $1 AND role = 'groupleader'",
      [groupId]
    );
    const groupLeader = glRes.rows[0];

    // Get the sysadmin (assuming one global admin)
    const saRes = await db.query(
      "SELECT first_name, last_name FROM users WHERE role = 'sysadmin' LIMIT 1"
    );
    const sysAdmin = saRes.rows[0];

    res.json({
      name: `${user.first_name} ${user.last_name}`,
      group_name: groupId,
      group_leader_name: groupLeader ? `${groupLeader.first_name} ${groupLeader.last_name}` : "N/A",
      sysadmin_name: sysAdmin ? `${sysAdmin.first_name} ${sysAdmin.last_name}` : "N/A",
      group_id: groupId
    });
  } catch (err) {
    console.error("❌ Error in /users/:id:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
