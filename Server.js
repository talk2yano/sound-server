const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastEvent = null; // Stores the last event

// When a user clicks, store the event
app.post("/notify", (req, res) => {
  lastEvent = { action: "playSound", timestamp: Date.now() };
  res.json({ status: "ok" });
});

// Users check if they should play the sound
app.get("/check", (req, res) => {
  if (lastEvent && Date.now() - lastEvent.timestamp < 5000) { // Event expires after 5 seconds
    res.json(lastEvent);
  } else {
    res.json({ action: "none" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
