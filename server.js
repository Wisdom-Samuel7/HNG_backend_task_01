// server.js
import express from "express";
import axios from "axios";

const app = express();

// Optional: enable CORS
import cors from "cors";
app.use(cors());

app.get("/me", async (req, res) => {
  try {
    // Fetch random cat fact
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const catFact = response.data?.fact || "Cats are mysterious creatures.";

    // Current UTC timestamp in ISO 8601
    const timestamp = new Date().toISOString();

    // Build response object
    const data = {
      status: "success",
      user: {
        email: "knowurcrafts@example.com", // ✅ replace
        name: "WISDOM SAMUEL",          // ✅ replace
        stack: "MERN",        // ✅ replace
      },
      timestamp,
      fact: catFact,
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact",
      timestamp: new Date().toISOString(),
    });
  }
});

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to my HNG Stage 0 API! Visit /me page");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
