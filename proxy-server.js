// proxy-server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Allow CORS only for local dev; Vercel handles CORS automatically
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

// Proxy endpoint
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

    const text = await response.text();
    res.status(response.status).type("application/json").send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({error: "Failed to fetch LeetCode data"});
  }
});

// Export for Vercel serverless runtime
export default app;

// Run locally (optional)
if (process.env.NODE_ENV !== "production") {
  app.listen(8080, () =>
    console.log("✅ Local proxy running at http://localhost:8080")
  );
}
