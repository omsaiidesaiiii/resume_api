export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Resume Parser API",
    version: "1.0.0",
    description: "Upload a resume PDF, get back structured JSON.",
  },
  paths: {
    "/api/resumes/upload": {
      post: {
        summary: "Upload a resume and extract structured data",
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
                  },
                },
                required: ["resume"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully parsed resume",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string", nullable: true },
                    phone: { type: "string", nullable: true },
                    skills: { type: "array", items: { type: "string" } },
                    education: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          institution: { type: "string" },
                          degree: { type: "string" },
                          fieldOfStudy: { type: "string", nullable: true },
                          startYear: { type: "string", nullable: true },
                          endYear: { type: "string", nullable: true },
                        },
                      },
                    },
                    experience: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          company: { type: "string" },
                          role: { type: "string" },
                          startDate: { type: "string", nullable: true },
                          endDate: { type: "string", nullable: true },
                          description: { type: "string", nullable: true },
                        },
                      },
                    },
                    projects: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          description: { type: "string", nullable: true },
                          technologies: {
                            type: "array",
                            items: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { description: "Bad request — invalid or missing file" },
          "500": { description: "Server error" },
        },
      },
    },
  },
};
