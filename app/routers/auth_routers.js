import { doLogin } from "../controllers/auth_controllers";

import express from "express";

const router = express.Router();

router.post("/login", doLogin);

export default router;
