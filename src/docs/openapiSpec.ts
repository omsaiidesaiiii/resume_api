export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Resume Parser API",
    version: "1.0.0",
    description:
      "Upload a resume as a PDF and receive structured JSON back — name, contact info, skills, education, experience, and projects. Extraction is grounded strictly in the resume's own text: fields that aren't present come back as `null` or an empty array, never guessed. Results are cached by file content, so re-uploading the same resume returns instantly.",
    contact: {
      name: "Omsai K Desai",
      url: "https://github.com/omsaiidesaiiii",
    },
  },
  servers: [
    {
      url: "https://resume-api-ott9.onrender.com",
      description: "Production",
    },
    {
      url: "http://localhost:4000",
      description: "Local development",
    },
  ],
  tags: [
    {
      name: "Resumes",
      description: "Upload and parse resume files",
    },
  ],
  paths: {
    "/api/resumes/upload": {
      post: {
        tags: ["Resumes"],
        summary: "Parse a resume PDF into structured JSON",
        description:
          "Accepts a single PDF file under the multipart field name `resume`. The file is never written to disk — it's processed in memory and discarded after parsing. If an identical file (by content hash) was parsed recently, the cached result is returned immediately instead of reprocessing.",
        operationId: "uploadResume",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  resume: {
                    type: "string",
                    format: "binary",
                    description: "A resume file in PDF format.",
                  },
                },
                required: ["resume"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Resume parsed successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Resume" },
                example: {
                  name: "Omsai K Desai",
                  email: "omsaidesai9@gmail.com",
                  phone: "+91-7338351277",
                  skills: ["JavaScript", "React.js", "Node.js", "Express.js", "PostgreSQL"],
                  education: [
                    {
                      institution: "Rani Channamma University",
                      degree: "Bachelor of Computer Applications",
                      fieldOfStudy: null,
                      startYear: "2023",
                      endYear: "2026",
                    },
                  ],
                  experience: [
                    {
                      company: "City of Moreton Bay",
                      role: "Junior WordPress Developer",
                      startDate: null,
                      endDate: null,
                      description: "Built a responsive HTML/CSS landing page for a nonprofit website.",
                    },
                  ],
                  projects: [
                    {
                      title: "Resume Parser API",
                      description: "An API that extracts structured data from resume PDFs.",
                      technologies: ["Node.js", "Express", "Prisma", "Groq"],
                    },
                  ],
                },
              },
            },
          },
          "400": {
            description:
              "Bad request — no file was uploaded, the file isn't a PDF, or the PDF couldn't be read (corrupt or password-protected).",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { message: "Only PDF files are supported" },
              },
            },
          },
          "500": {
            description:
              "Something failed on the server side — for example the parsing service was unreachable. Not the client's fault.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { message: "Something went wrong" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "A human-readable explanation of what went wrong.",
          },
        },
        required: ["message"],
      },
      EducationEntry: {
        type: "object",
        properties: {
          institution: { type: "string" },
          degree: { type: "string" },
          fieldOfStudy: { type: "string", nullable: true },
          startYear: { type: "string", nullable: true },
          endYear: { type: "string", nullable: true },
        },
        required: ["institution", "degree", "fieldOfStudy", "startYear", "endYear"],
      },
      ExperienceEntry: {
        type: "object",
        properties: {
          company: { type: "string" },
          role: { type: "string" },
          startDate: { type: "string", nullable: true },
          endDate: { type: "string", nullable: true },
          description: { type: "string", nullable: true },
        },
        required: ["company", "role", "startDate", "endDate", "description"],
      },
      ProjectEntry: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string", nullable: true },
          technologies: { type: "array", items: { type: "string" } },
        },
        required: ["title", "description", "technologies"],
      },
      Resume: {
        type: "object",
        description: "Structured data extracted from a single resume.",
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email", nullable: true },
          phone: { type: "string", nullable: true },
          skills: { type: "array", items: { type: "string" } },
          education: {
            type: "array",
            items: { $ref: "#/components/schemas/EducationEntry" },
          },
          experience: {
            type: "array",
            items: { $ref: "#/components/schemas/ExperienceEntry" },
          },
          projects: {
            type: "array",
            items: { $ref: "#/components/schemas/ProjectEntry" },
          },
        },
        required: ["name", "email", "phone", "skills", "education", "experience", "projects"],
      },
    },
  },
};