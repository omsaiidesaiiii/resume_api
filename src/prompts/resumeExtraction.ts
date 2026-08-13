import { z } from "zod";
import { ResumeSchema } from "../schemas/resume.js";

export function buildResumeExtractionPrompt(resumeText: string): string {
  const schema = z.toJSONSchema(ResumeSchema);

  return `
You are a resume-parsing assistant. Extract structured information from the
RESUME TEXT below and return it as JSON matching the schema exactly.

RESUME TEXT:
${resumeText}

RULES:
1. Only extract information that is explicitly present in the resume text.
2. Never invent, infer, or guess a skill, company, degree, or project that
   is not clearly stated.
3. If a field is not present in the resume, use null (for single values)
   or an empty array (for lists like skills/education/experience/projects).
4. Dates should be returned as plain strings exactly as written in the
   resume (e.g. "Jan 2022" or "2021") — do not reformat them.

Return ONLY valid JSON matching this schema:
${JSON.stringify(schema)}`;
}

console.log(JSON.stringify(z.toJSONSchema(ResumeSchema), null, 2));