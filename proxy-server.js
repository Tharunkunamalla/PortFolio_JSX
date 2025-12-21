// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // load GITHUB_TOKEN

const app = express();
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

// -------- LeetCode Proxy --------
app.post("/api/leetcode/graphql", async (req, res) => {
  try {
    const {query, variables, operationName} = req.body;
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        origin: "https://leetcode.com",
        referer: "https://leetcode.com",
      },
      body: JSON.stringify({query, variables, operationName}),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("LeetCode proxy error:", err);
    res.status(500).json({error: "Failed to fetch LeetCode data"});
  }
});

// -------- GitHub Proxy --------
app.post("/api/github/graphql", async (req, res) => {
  try {
    const {query, variables, operationName} = req.body;
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      return res.status(401).json({error: "Missing GitHub token in .env"});
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${githubToken}`,
      },
      body: JSON.stringify({query, variables, operationName}),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("GitHub proxy error:", err);
    res.status(500).json({error: "Failed to fetch GitHub data"});
  }
});

// -------- Monkeytype Proxy (FIXED) --------
app.get("/api/monkeytype/:username", async (req, res) => {
  try {
    const {username} = req.params;

    const response = await fetch(
      `https://api.monkeytype.com/users/${username}/stats`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.error("Monkeytype raw response:", text);
      return res.status(response.status).json({
        error: "Failed to fetch Monkeytype stats",
      });
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    console.error("Monkeytype proxy error:", err);
    res.status(500).json({error: "Monkeytype proxy failed"});
  }
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () =>
  console.log(`✅ Proxy server running at http://localhost:${PORT}`)
);
