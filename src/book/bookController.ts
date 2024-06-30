import { Request, Response, NextFunction } from "express";
import path from "path";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs"
import { AuthRequest } from "../middlewares/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files:", req.files);
  const {title,genre} = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };


  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

 
  const bookFileName = files.file[0].filename;
  const bookFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    bookFileName
  );


try {
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    filename_override: fileName,
    folder: "book-covers",
    format: coverImageMimeType,
  });

  const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
    resource_type:"raw",
    filename_override: bookFileName,
    folder: "books-pdf",
    format:"pdf"
  })
// console.log("uploadResult:", uploadResult);

// console.log("bookfile upload:",bookFileUploadResult)

const _req = req as AuthRequest;

const newBook = await bookModel.create({
  title,
  genre,
  author:_req.userId,
  coverImage: uploadResult.secure_url,
  file: bookFileUploadResult.secure_url
  })
//delete temp files

await fs.promises.unlink(filePath)
await fs.promises.unlink(bookFilePath)


res.status(201).json({id:newBook._id});
console.log(newBook._id)
} catch (error) {
  console.log("error:", error);
  return next(createHttpError(500,"error while uploading the files"))
}

    







  

};
export { createBook };
