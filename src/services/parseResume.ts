import { groq, MODEL } from "../lib/groq.js";
import { buildResumeExtractionPrompt } from "../prompts/resumeExtraction.js";
import { ResumeSchema, type Resume } from "../schemas/resume.js";

export async function parseResumeText(resumeText: string): Promise<Resume> {
  const prompt = buildResumeExtractionPrompt(resumeText);

  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const raw = response.choices[0]?.message.content;
  if (!raw) {
    throw new Error("Groq returned an empty response");
  }

  const parsedJson = JSON.parse(raw);

  // this is the validation step — never trust raw LLM output directly
  const result = ResumeSchema.safeParse(parsedJson);
  if (!result.success) {
    throw new Error("LLM response did not match expected schema: " + result.error.message);
  }

  return result.data;
}