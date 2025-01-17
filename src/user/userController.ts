import exp from "constants";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //validation
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "all field are required");
    return next(error);
  }
  //database call
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(
        "400",
        "User already exist with this email"
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "error while getting error"));
  }

  //password hash
  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser: User;

  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "error while getting error"));
  }

  //token generation
  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    //response
    res.status(201).json({
      accessToken: token,
    });
  } catch (error) {
    return next(createHttpError(500, "error while sighning the jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = createHttpError(400, "all field are required");
    return next(error);
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    const error = createHttpError(400, "User not found");
    return next(error);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = createHttpError(400, "Invalid password");
    return next(error);
  }
  //create accesstoken
const token = sign({sub:user._id},config.jwtSecret as string,{
  expiresIn:"7d",
  algorithm:"HS256"
})


  res.json({ accessToken:token });
};

export { createUser, loginUser };
