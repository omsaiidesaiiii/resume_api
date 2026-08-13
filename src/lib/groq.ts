import Groq from "groq-sdk";
import "dotenv/config";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY not found in environment");
}

export const groq = new Groq({ apiKey });
export const MODEL = "llama-3.3-70b-versatile";