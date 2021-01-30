import jwt from "jsonwebtoken";
import { checkUser } from "../models/user_models";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    if (!token) {
      return res
        .status(400)
        .send({ code: 400, message: "Token is not provided!" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    const checkId = await checkUser(decodedToken.userId);

    if (!checkId) {
      return res
        .status(400)
        .send({ code: 400, message: "The token you provided is invalid" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: "An error occured!" });
  }
};

export { verifyToken };
