import { z } from "zod";

export const ResumeSchema = z.object({
  name: z.string(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),

  skills: z.array(z.string()),

  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string().nullable(),
      startYear: z.string().nullable(),
      endYear: z.string().nullable(),
    })
  ),

  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string().nullable(),
      endDate: z.string().nullable(),
      description: z.string().nullable(),
    })
  ),

  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string().nullable(),
      technologies: z.array(z.string()),
    })
  ),
});


export type Resume = z.infer<typeof ResumeSchema>;