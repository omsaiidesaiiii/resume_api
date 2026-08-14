import express from "express";
import resumeRouter from "./routes/resume.js";
import { errorHandler } from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapiSpec.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/resumes", resumeRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "this is root",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
