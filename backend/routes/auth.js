const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db"); // from db/index.js
const authenticateToken = require("../middleware/authMiddleware");

require("dotenv").config();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, phone, password, groupId } = req.body;

  try {
    // Check if user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //check if there is a user with the same phone number
    const existingPhone = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
    if (existingPhone.rows.length > 0) {
      return res.status(400).json({ message: "Phone number already in use." });
}

    // Insert into DB
    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone, password, role, group_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email`,
      [firstName, lastName, email, phone, hashedPassword, "user", groupId]
    );


    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

router.put("/role", authenticateToken, async (req, res) => {
  const { role } = req.body;
  const userId = req.user.userId;

  try {
    console.log("➡️ Incoming role update:");
    console.log("   - Role:", role);
    console.log("   - User ID:", userId);

    const updateResult = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role",
      [role, userId]
    );

    if (updateResult.rows.length === 0) {
      console.warn("⚠️ No user found with ID", userId);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("✅ Role updated in DB:", updateResult.rows[0]);

    res.json({ message: "Role updated successfully." });

  } catch (err) {
    console.error("❌ Role update error:", err.message);
    res.status(500).json({ message: "Error updating role." });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id,
      role: user.rows[0].role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// GET all groups
router.get("/groups", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM groups");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching groups:", err.message);
    res.status(500).json({ message: "Error fetching groups." });
  }
});


module.exports = router;

router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error("DB Test Error:", err);
    res.status(500).json({ message: "Database connection failed." });
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});


