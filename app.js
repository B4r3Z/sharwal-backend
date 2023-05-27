import express from "express";
import { ErrorHandler } from "./utils/ErrorHandler.js";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: "./config/.env" });

app.use("/api/v2/user", userRoutes);
app.use(ErrorHandler);

//ErrorHandling
