import { stat } from "fs";
import createHttpError, { HttpError } from "http-errors";
import { getSystemErrorMap } from "util";
import { config } from "../config/config";

import express, { NextFunction, Request, Response } from "express";

const globalErrorHandler=(error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
  
    return res.status(statusCode).json({
      message: error.message,
      errorStack: config.env === "development" ? error.stack : "",
    });
  }

export default globalErrorHandler;