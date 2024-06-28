import exp from "constants";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //validation
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "all field are required");
    return next(error);
  }
  //database call
  const user = await userModel.findOne({email})
  if(user){
    const error = createHttpError("400","User already exist with this email");
    return next(error)
  }
  //response
  res.json({
    message: "user created",
  });
};

export { createUser };
