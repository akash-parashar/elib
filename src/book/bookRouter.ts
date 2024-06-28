
import express from "express"
import { createBook } from "./bookController";
// import { createUser, loginUser } from "./userController";


const bookRouter = express.Router();
//api/books
bookRouter.post("/register",createBook
)



export default bookRouter;