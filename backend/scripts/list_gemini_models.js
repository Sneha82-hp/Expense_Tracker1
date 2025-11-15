// scripts/list_gemini_models.js
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("No GEMINI_API_KEY / GOOGLE_API_KEY found in .env");
  process.exit(1);
}

(async () => {
  try {
    // Use v1 endpoint to list models
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    const res = await axios.get(url);
    console.log("=== MODELS LIST ===");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("ERROR listing models:", err.response ? err.response.data : err.message);
    process.exit(1);
  }
})();
