"use strict";

const express = require("express");

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
  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
