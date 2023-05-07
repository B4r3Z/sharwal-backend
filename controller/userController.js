import express from "express";
import path from "path";
import User from "../models/userModel.js";
import { upload } from "../multer.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export default router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const fileName = req.file.filename;
  const fileUrl = path.join(fileName);

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  });
  console.log(user);
});
