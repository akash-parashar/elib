// import { error } from "console";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
//   const error = createHttpError(400, "something went wrong");
//   throw error;
  res.json({ message: "welcome" });
});
app.use("/api/users",userRouter)
app.use(globalErrorHandler);

export default app;
