// import { error } from "console";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";


const app = express();

app.get("/", (req, res) => {
//   const error = createHttpError(400, "something went wrong");
//   throw error;
  res.json({ message: "welcome" });
});

app.use(globalErrorHandler);

export default app;
