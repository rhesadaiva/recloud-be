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

var allowlist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(cookieParser());

// WEB ROUTE
const baseUrlWeb = "/api/datask";

// IMPORT ROUTE
import auth from "./app/routers/auth_routers";
import users from "./app/routers/users_routers";
import presensi from "./app/routers/absen_routers";
import task from "./app/routers/task_routers";

app.use(baseUrlWeb, auth);
app.use(baseUrlWeb, users);
app.use(baseUrlWeb, presensi);
app.use(baseUrlWeb, task);
