
import express from "express"
import { createBook, deleteBook, getSingleBook, listBooks, updateBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";
// import { createUser, loginUser } from "./userController";


const bookRouter = express.Router();
const app = express();
app.use(express.json());
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    // todo: put limit 10mb max.
    limits: { fileSize: 3e7 }, // 30mb 30 * 1024 * 1024
});


//api/books
bookRouter.post(
    "/",
    authenticate,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    createBook
);
bookRouter.patch("/:bookId",authenticate,  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]),updateBook)

bookRouter.get("/",listBooks);
bookRouter.get("/:bookId",getSingleBook)
bookRouter.delete("/:bookId",deleteBook)

export default bookRouter;