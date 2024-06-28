
import express from "express"
import { createBook } from "./bookController";
import multer from "multer";
import path from "path";
// import { createUser, loginUser } from "./userController";


const bookRouter = express.Router();

const upload = multer({
    dest:path.resolve(__dirname,"../../public/data/upload"),
    limits:{fileSize:3e7}
})


//api/books
bookRouter.post("/",upload.fields([
    {name:"coverImage",maxCount:1},
    {name:"file",maxCount:1}

]),createBook)



export default bookRouter;