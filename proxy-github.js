// proxy-github.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors()); // In production, restrict origin
app.use(express.json());

const GITHUB_API = "https://api.github.com/graphql";
// Put your GitHub token in environment variable
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.post("/api/github/graphql", async (req, res) => {
  try {
    const {query, variables, operationName} = req.body;
    const response = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({query, variables, operationName}),
    });
    const text = await response.text();
    res.status(response.status).type("application/json").send(text);
  } catch (err) {
    console.error("GitHub Proxy error:", err);
    res.status(500).json({error: "Failed to fetch GitHub data"});
  }
});

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(8081, () =>
    console.log("GitHub proxy listening on http://localhost:8081")
  );
}
