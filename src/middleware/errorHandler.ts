import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Unhandled error:", err);

  const message = err instanceof Error ? err.message : "Something went wrong";

  // crude but effective: known "bad input" error messages get a 400
  const isClientError =
    message.includes("Invalid PDF") ||
    message.includes("Only PDF files are supported") ||
    message.includes("Password");

  res.status(isClientError ? 400 : 500).json({ message });
}