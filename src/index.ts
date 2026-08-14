import express from "express";
import resumeRouter from "./routes/resume.js";
import { errorHandler } from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapiSpec.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api/resumes", resumeRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

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
