// server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const formsRoute = require("./routes/forms");
const documentRoutes = require("./routes/documents");
const keyInfoRoutes = require("./routes/keyinfo");
const groupRoutes = require("./routes/groups");
const pollRoutes = require("./routes/polls");


const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", formsRoute);
app.use("/api", documentRoutes);
app.use("/api", keyInfoRoutes);
app.use("/api", groupRoutes);
app.use("/api", pollRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
