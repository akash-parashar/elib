// import { error } from "console";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import cors from "cors";
import { config } from "./config/config";

const app = express();


app.use(cors({
  origin:config.frontendDomain
}))
app.use(express.json());

app.get("/", (req, res) => {
//   const error = createHttpError(400, "something went wrong");
//   throw error;
  res.json({ message: "welcome" });
});
app.use("/api/users",userRouter)
app.use("/api/books",bookRouter)
app.use(globalErrorHandler);

export default app;
