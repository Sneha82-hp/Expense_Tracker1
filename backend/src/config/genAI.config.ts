import { GoogleGenerativeAI } from "@google/generative-ai";
import { Env } from "./env.config";

const genAI = new GoogleGenerativeAI(Env.GEMINI_API_KEY);

// Use a model that your API key supports. From your `list_gemini_models.js` output,
// 'models/gemini-2.5-flash' or 'models/gemini-2.5-pro' are valid. Choose flash to save quota.
export const geminiModel = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

export { genAI };
