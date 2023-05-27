
import path from "path";
import User from "../model/userModel.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import fs from "fs";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";

export const createUser =  async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://eshop-tutorial-cefl.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Account Activation Link",
        message: `Hello ${user.name},\n\nPlease activate your account by clicking the link below:\n\n${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Success! Activation sent to ${user.email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};


const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

export const activateEmail = catchAsyncErrors(async(req, res, next) => {
try {
  const { activation_token } = req.body;
  const newUser = jwt.verify( 
    activation_token,
    process.env.ACTIVATION_TOKEN_SECRET);

    if(!newUser) {
      return next(new ErrorHandler('Invalid Token', 400));
    }
    const { name, email, password, avatar } = newUser;

      User.create({ 
        name,
        email,
        password,
        avatar
      });

      sendToken(newUser, 201, res);

 
} catch (error) {
  return next(new ErrorHandler(error.message, 500));
}
});

