"use strict";

const express = require("express");

const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const saleRoutes = require("./routes/sales");
const userGroupRoutes = require("./routes/userGroups");

// Constants
const PORT = 5000;
const HOST = "0.0.0.0";

async function start() {
  // Seed the database

  // App
  const app = express();

  // Health check
  app.get("/health", (req, res) => {
    res.send("Hello World");
  });
  app.get("/callback", (req, res) => {
    const code = req.query.code; // Correct way to get query parameter
    if (code) {
      res.send(`✅ Authorization Code: ${code}`);
    } else {
      res.send("❌ Error: No authorization code received.");
    }
  });

  // Write your endpoints here

  // Register routes
  app.use("/api/users", userRoutes); // User routes
  app.use("/api/groups", groupRoutes); // Group routes
  app.use("/api/sales", saleRoutes); // Sales routes
  app.use("/api/userGroups", userGroupRoutes); // User-Group routes

  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
