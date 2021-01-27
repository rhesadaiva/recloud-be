import { postNewUsers, deleteUser } from "../controllers/user_controllers";

import express from "express";

import { verifyToken } from "./app/middlewares/auth_middlewares";

const router = express.Router();

router.post("/user/create", postNewUsers);
router.delete("/user/:id", verifyToken, deleteUser);

export default router;
