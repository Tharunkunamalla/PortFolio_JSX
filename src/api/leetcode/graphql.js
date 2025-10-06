// api/leetcode/graphql.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({error: "Method Not Allowed"});
  }

  try {
    const {query, variables, operationName} = req.body || {};

    const upstream = await fetch("https://leetcode.com/graphql", {
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

    const text = await upstream.text();
    // Mirror status and body so client sees GraphQL errors as JSON
    res
      .status(upstream.status)
      .setHeader("Content-Type", "application/json")
      .send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({error: "Failed to fetch LeetCode data"});
  }
}
