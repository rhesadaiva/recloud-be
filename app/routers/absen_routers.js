import {
  postAbsenMasuk,
  postAbsenKeluar,
} from "../controllers/absen_controllers";

import express from "express";

import { verifyToken } from "../middlewares/auth_middlewares";

const router = express.Router();

router.post("/presensi/in", verifyToken, postAbsenMasuk);
router.post("/presensi/out", verifyToken, postAbsenKeluar);

export default router;
