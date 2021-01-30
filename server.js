import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// CONFIG ENVIRONMENT
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 9001;

app.listen(port).on("listening", () => {
  console.log(`API server started on port : ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  exposedHeaders: ["Authorization", "App-Control"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

// WEB ROUTE
const baseUrlWeb = "/api/datask";

// IMPORT ROUTE
import auth from "./app/routers/auth_routers";
import users from "./app/routers/users_routers";
import presensi from "./app/routers/absen_routers";

app.use(baseUrlWeb, auth);
app.use(baseUrlWeb, users);
app.use(baseUrlWeb, presensi);
