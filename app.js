import express from "express";
import { ErrorHandler } from "./utils/ErrorHandler.js";
export const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userController from "./controller/userController.js";
import dotenv from "dotenv";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: "./config/.env" });

app.use("/api/v2/user", userController);
app.use(ErrorHandler);

//ErrorHandling
