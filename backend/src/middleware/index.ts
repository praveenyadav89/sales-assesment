import { Request, Response, NextFunction } from "express";

//404 Handler
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
};

// Global Error Handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
};
