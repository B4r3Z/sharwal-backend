import express from "express";
import { ErrorHandler } from "./utils/ErrorHandler.js";
export const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

dotenv.config({ path: "./config/.env" });

app.use(ErrorHandler);

//ErrorHandling
